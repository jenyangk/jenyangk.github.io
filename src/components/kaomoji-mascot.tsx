import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

export type KaomojiMood =
  | "default"
  | "work"
  | "projects"
  | "thinking"
  | "celebrate";

/**
 * Click easter-egg escalation ladder, deliberately separate from KaomojiMood:
 * it is a temporary overlay state machine that runs in parallel with the
 * existing mood / blink / sleep / celebrate behaviour.
 */
export type KaomojiClickState =
  | { kind: "idle" }
  | { kind: "brief"; face: string } // clicks 1-5, ~700ms each
  | { kind: "annoyed" } // click 6, 2000ms hold, leans away from cursor
  | { kind: "stare" } // clicks 7 & 10, ~700ms
  | { kind: "angry" } // click 8, shake 450ms + hold 800ms
  | { kind: "flip" } // click 9, table-flip sequence (windup+throw+flight+hold)
  | { kind: "flee" } // click 11 (or 30+ clicks / 20s), 1200ms
  | { kind: "hide" } // clicks 12+, peeking at the edge
  | { kind: "recover"; step: number }; // non-interruptible forgiveness run

const MOOD_FACES: Record<KaomojiMood, string> = {
  default: "(⌐■_■)",
  work: "(◕‿◕)",
  projects: "(⌐■_■)ノ",
  thinking: "( ˘･з･˘)",
  celebrate: "(⌐■_■)ノ♪",
};

const SLEEPING_FACE = "(-_-) zzz";
const BLINK_FACE = "(-_-)";

// Click-ladder faces (glyphs verified against JetBrains Mono v2.304).
const CLICK_REACTIONS = ["Σ(°□°)", "(¬‿¬)", "(@_@)", "(×_×;)", "(°□°)!!"];
const ANNOYED_FACE = "(—_—)";
const STARE_FACE = "(¬_¬)...";
const ANGRY_FACE = "(╬ Ò_Ó)";
const FLIP_MAIN = "(╯°□°)╯";
const FLIP_STATIC = "(╯°□°)╯ ┻━┻";
const FLEE_FACE = "ε=ε=ε=┌(>w<)┘";
const HIDE_FACE = "|д•)";
const RECOVERY_FACES = ["|д•)", "┬─┬ ( º_º )", "╮(╯_╰)╭", "(◔‿◔)"];
const RECOVER_STEP_MS = 600;

const BRIEF_MS = 700;
const ANNOYED_MS = 2000;
const ANGRY_MS = 1250; // 450ms shake + 800ms hold
const FLIP_MS = 2300; // 350 windup + 150 throw + 900 flight + 900 hold
const FLEE_MS = 1200;
const STREAK_RESET_MS = 1500;
const RECOVERY_SILENCE_SHORT_MS = 2500; // episode only reached ANNOYED
const RECOVERY_SILENCE_MS = 3500; // post-FLIP states
const SPAM_CLICKS = 30;
const SPAM_WINDOW_MS = 20000;
const ANNOUNCE_DEBOUNCE_MS = 1500;
const MAX_DODGES = 3;
const FLEE_OFFSET_PX = 140;

// a11y: only milestone transitions are announced, never per-click reactions.
const ANNOUNCEMENTS = {
  annoyed: "Kaomoji mascot is annoyed",
  angry: "Kaomoji mascot is angry",
  flipped: "Kaomoji mascot flipped the table",
  fled: "Kaomoji mascot ran away",
  hiding: "Kaomoji mascot is hiding",
  forgiven: "Kaomoji mascot forgave you",
} as const;
type AnnounceKey = keyof typeof ANNOUNCEMENTS;

const ARIA_LABELS: Record<KaomojiClickState["kind"], string> = {
  idle: "Kaomoji mascot, click to interact",
  brief: "Kaomoji mascot reacting",
  annoyed: "Kaomoji mascot, annoyed",
  stare: "Kaomoji mascot, giving you a look",
  angry: "Kaomoji mascot, angry",
  flip: "Kaomoji mascot, table flipped",
  flee: "Kaomoji mascot, running away",
  hide: "Kaomoji mascot, hiding",
  recover: "Kaomoji mascot, recovering",
};

const FONT_STACK =
  '"JetBrains Mono", "Noto Sans Mono", ui-monospace, Menlo, Consolas, monospace';

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export interface KaomojiMascotRef {
  celebrate: () => void;
}

interface KaomojiMascotProps {
  mood?: KaomojiMood;
  className?: string;
}

export const KaomojiMascot = forwardRef<KaomojiMascotRef, KaomojiMascotProps>(
  ({ mood = "default", className = "" }, ref) => {
    const reducedMotion = usePrefersReducedMotion();
    const [asleep, setAsleep] = useState(false);
    const [blinking, setBlinking] = useState(false);
    const [celebrating, setCelebrating] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [pulseKey, setPulseKey] = useState(0);
    const [phase, setPhase] = useState<KaomojiClickState>({ kind: "idle" });
    const [fadeKey, setFadeKey] = useState(0);
    const [duck, setDuck] = useState(0);
    const [leanAway, setLeanAway] = useState(0);
    const [announcement, setAnnouncement] = useState("");

    const hostRef = useRef<HTMLSpanElement>(null);
    const lastMoveRef = useRef(Date.now());
    const celebrateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const unblinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // --- easter-egg bookkeeping ---
    const phaseRef = useRef<KaomojiClickState>({ kind: "idle" });
    const streakRef = useRef(0);
    const lastClickRef = useRef(0);
    const clickTimesRef = useRef<number[]>([]);
    const episodeMaxRef = useRef(0);
    const dodgesRef = useRef(0);
    const fledRef = useRef(false);
    const lastFaceRef = useRef("");
    const phaseExpiryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const recoveryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const announceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pendingAnnounceRef = useRef("");
    const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

    // --- tracked timers: all cleared on unmount ---
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timersRef.current.delete(id);
        fn();
      }, ms);
      timersRef.current.add(id);
      return id;
    };
    const cancelLater = (id: ReturnType<typeof setTimeout> | null) => {
      if (id !== null) {
        clearTimeout(id);
        timersRef.current.delete(id);
      }
    };

    const goPhase = (p: KaomojiClickState) => {
      phaseRef.current = p;
      setPhase(p);
    };

    // --- celebrate() via ref ---
    useImperativeHandle(ref, () => ({
      celebrate: () => {
        if (celebrateTimerRef.current) clearTimeout(celebrateTimerRef.current);
        setCelebrating(true);
        setPulseKey((k) => k + 1);
        celebrateTimerRef.current = setTimeout(() => setCelebrating(false), 1500);
      },
    }));

    useEffect(
      () => () => {
        if (celebrateTimerRef.current) clearTimeout(celebrateTimerRef.current);
        for (const id of timersRef.current) clearTimeout(id);
      },
      [],
    );

    // --- Mood pulse (scale 1 -> 1.05 -> 1, 300ms) on mood change, not initial mount ---
    const prevMoodRef = useRef(mood);
    useEffect(() => {
      if (reducedMotion) return;
      if (prevMoodRef.current === mood) return;
      prevMoodRef.current = mood;
      setPulseKey((k) => k + 1);
    }, [mood, reducedMotion]);

    // --- Sleeping: 15s idle or hidden tab; wake on movement/visibility ---
    useEffect(() => {
      if (reducedMotion) return;

      const IDLE_MS = 15000;

      const checkIdle = () => {
        if (document.hidden || Date.now() - lastMoveRef.current >= IDLE_MS) {
          setAsleep(true);
        }
        // waking is handled by onMove / onVisibility
      };

      const onMove = () => {
        lastMoveRef.current = Date.now();
        setAsleep(false);
      };

      const onVisibility = () => {
        if (document.hidden) {
          setAsleep(true);
        } else {
          lastMoveRef.current = Date.now();
          setAsleep(false);
        }
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      const interval = setInterval(checkIdle, 1000);

      return () => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("visibilitychange", onVisibility);
        clearInterval(interval);
      };
    }, [reducedMotion]);

    // --- Blinking: eyes close ~150ms every 3-6s (not while asleep) ---
    useEffect(() => {
      if (reducedMotion || asleep) return;

      const scheduleBlink = () => {
        blinkTimerRef.current = setTimeout(() => {
          setBlinking(true);
          unblinkTimerRef.current = setTimeout(() => setBlinking(false), 150);
          scheduleBlink();
        }, 3000 + Math.random() * 3000);
      };

      scheduleBlink();
      return () => {
        if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
        if (unblinkTimerRef.current) clearTimeout(unblinkTimerRef.current);
        // Falling asleep mid-blink must not leave the eyes stuck closed
        setBlinking(false);
      };
    }, [reducedMotion, asleep]);

    // --- Eyes follow cursor: subtle tilt/shift toward pointer ---
    useEffect(() => {
      if (reducedMotion) {
        setTilt((t) => (t.x === 0 && t.y === 0 ? t : { x: 0, y: 0 }));
        return;
      }

      const RADIUS = 600;
      const onMove = (e: MouseEvent) => {
        const el = hostRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > RADIUS) {
          setTilt((t) => (t.x === 0 && t.y === 0 ? t : { x: 0, y: 0 }));
          return;
        }
        const strength = 1 - dist / RADIUS;
        const angle = Math.atan2(dy, dx);
        const tx = Math.round(Math.cos(angle) * 4 * strength * 100) / 100; // ±4px
        const ty = Math.round(Math.sin(angle) * 2 * strength * 100) / 100; // ±2px
        setTilt((t) => (t.x === tx && t.y === ty ? t : { x: tx, y: ty }));
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    }, [reducedMotion]);

    // ------------------------------------------------------------------
    // Click easter egg (clicks 1-12+, escalating; recovery when left alone)
    // ------------------------------------------------------------------

    // Debounced announcements: only milestones, 1500ms after the last one,
    // so spam-clicking floods neither screen readers nor the state text.
    const announce = (key: AnnounceKey) => {
      pendingAnnounceRef.current = ANNOUNCEMENTS[key];
      cancelLater(announceTimerRef.current);
      announceTimerRef.current = later(() => {
        setAnnouncement(pendingAnnounceRef.current);
      }, ANNOUNCE_DEBOUNCE_MS);
    };

    const scheduleRecovery = () => {
      cancelLater(recoveryTimerRef.current);
      const ms =
        episodeMaxRef.current <= 6
          ? RECOVERY_SILENCE_SHORT_MS
          : RECOVERY_SILENCE_MS;
      recoveryTimerRef.current = later(startRecovery, ms);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const startRecovery = () => {
      // Non-interruptible: clicks during recovery are ignored entirely.
      streakRef.current = 0;
      episodeMaxRef.current = 0;
      dodgesRef.current = 0;
      goPhase({ kind: "recover", step: 0 });
      for (let s = 1; s < RECOVERY_FACES.length; s++) {
        later(() => goPhase({ kind: "recover", step: s }), s * RECOVER_STEP_MS);
      }
      later(() => {
        announce("forgiven");
        setDuck(0);
        setLeanAway(0);
        fledRef.current = false;
        goPhase({ kind: "idle" });
      }, RECOVERY_FACES.length * RECOVER_STEP_MS);
    };

    const enterBrief = (n: number) => {
      cancelLater(phaseExpiryRef.current);
      cancelLater(recoveryTimerRef.current);
      goPhase({ kind: "brief", face: CLICK_REACTIONS[n - 1] });
      phaseExpiryRef.current = later(() => goPhase({ kind: "idle" }), BRIEF_MS);
    };

    const enterAnnoyed = () => {
      cancelLater(phaseExpiryRef.current);
      // Lean away from wherever the cursor was: cursor right -> rotate left.
      setLeanAway(tilt.x >= 0 ? -8 : 8);
      goPhase({ kind: "annoyed" });
      announce("annoyed");
      phaseExpiryRef.current = later(() => goPhase({ kind: "idle" }), ANNOYED_MS);
    };

    const enterStare = () => {
      cancelLater(phaseExpiryRef.current);
      goPhase({ kind: "stare" });
      phaseExpiryRef.current = later(() => goPhase({ kind: "idle" }), BRIEF_MS);
    };

    const enterAngry = () => {
      cancelLater(phaseExpiryRef.current);
      goPhase({ kind: "angry" });
      announce("angry");
      phaseExpiryRef.current = later(() => goPhase({ kind: "idle" }), ANGRY_MS);
    };

    const enterFlip = () => {
      cancelLater(phaseExpiryRef.current);
      goPhase({ kind: "flip" });
      announce("flipped");
      phaseExpiryRef.current = later(() => {
        // Mid-flip clicks were counted but not shown; if the streak already
        // reached flee territory, continue straight into fleeing.
        if (streakRef.current >= 11) {
          startFlee();
        } else {
          goPhase({ kind: "idle" });
        }
      }, FLIP_MS);
    };

    const startFlee = () => {
      cancelLater(phaseExpiryRef.current);
      cancelLater(recoveryTimerRef.current);
      fledRef.current = true;
      goPhase({ kind: "flee" });
      announce("fled");
      phaseExpiryRef.current = later(() => {
        dodgesRef.current = 0;
        goPhase({ kind: "hide" });
        announce("hiding");
        scheduleRecovery();
      }, FLEE_MS);
    };

    const enterHide = () => {
      if (phaseRef.current.kind !== "hide") {
        dodgesRef.current = 0;
        goPhase({ kind: "hide" });
        announce("hiding");
        return;
      }
      // Extra clicks while hiding: duck/pop ±10px, capped at 3 extensions.
      if (dodgesRef.current < MAX_DODGES) {
        dodgesRef.current += 1;
        setDuck(dodgesRef.current % 2 === 1 ? 10 : -10);
      }
    };

    const handleClick = () => {
      const current = phaseRef.current;
      if (current.kind === "recover") return; // non-interruptible
      if (asleep) setAsleep(false);

      const now = Date.now();

      // 30+ clicks within 20s: skip the ladder, flee immediately.
      const times = clickTimesRef.current.filter((t) => now - t <= SPAM_WINDOW_MS);
      times.push(now);
      clickTimesRef.current = times;
      if (times.length >= SPAM_CLICKS) {
        clickTimesRef.current = [];
        startFlee();
        return;
      }

      // >=1500ms of silence resets the streak.
      if (lastClickRef.current !== 0 && now - lastClickRef.current >= STREAK_RESET_MS) {
        streakRef.current = 0;
        episodeMaxRef.current = 0;
        dodgesRef.current = 0;
      }
      lastClickRef.current = now;
      streakRef.current += 1;
      if (streakRef.current > episodeMaxRef.current) {
        episodeMaxRef.current = streakRef.current;
      }
      const n = streakRef.current;

      // Mid-sequence clicks keep counting but don't interrupt the animation.
      if (current.kind === "flip" || current.kind === "flee") {
        scheduleRecovery();
        return;
      }

      switch (n) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          enterBrief(n);
          break;
        case 6:
          enterAnnoyed();
          break;
        case 7:
        case 10:
          enterStare();
          break;
        case 8:
          enterAngry();
          break;
        case 9:
          enterFlip();
          break;
        case 11:
          startFlee();
          break;
        default:
          enterHide();
          break;
      }

      if (n >= 6 && n !== 11) scheduleRecovery();
    };

    // ------------------------------------------------------------------

    const face = useMemo(() => {
      switch (phase.kind) {
        case "brief":
          return phase.face;
        case "annoyed":
          return ANNOYED_FACE;
        case "stare":
          return STARE_FACE;
        case "angry":
          return ANGRY_FACE;
        case "flip":
          return reducedMotion ? FLIP_STATIC : FLIP_MAIN;
        case "flee":
          return FLEE_FACE;
        case "hide":
          return HIDE_FACE;
        case "recover":
          return RECOVERY_FACES[phase.step];
        default:
          break;
      }
      if (celebrating) return MOOD_FACES.celebrate;
      if (asleep) return SLEEPING_FACE;
      if (blinking) return BLINK_FACE;
      return MOOD_FACES[mood];
    }, [phase, celebrating, asleep, blinking, mood, reducedMotion]);

    // Reduced motion: swap characters instantly, keep a 150ms opacity
    // cross-fade by remounting the face span on every change.
    useEffect(() => {
      if (face === lastFaceRef.current) return;
      lastFaceRef.current = face;
      if (reducedMotion) setFadeKey((k) => k + 1);
    }, [face, reducedMotion]);

    const showFlyingTable = phase.kind === "flip" && !reducedMotion;

    const innerClass = reducedMotion
      ? "kaomoji-fade"
      : phase.kind === "angry"
        ? "kaomoji-shake"
        : phase.kind === "flee"
          ? "kaomoji-bob"
          : asleep && !celebrating && phase.kind === "idle"
            ? "kaomoji-float"
            : "kaomoji-pulse";

    const innerKey = reducedMotion ? fadeKey : pulseKey;

    const baseRotate = Math.max(-8, Math.min(8, tilt.x * 1.5));
    let transform: string;
    let transition: string;
    if (phase.kind === "flee") {
      transform = `translate(${FLEE_OFFSET_PX}px, 0)`;
      transition = reducedMotion
        ? "none"
        : "transform 1200ms cubic-bezier(0.22, 0.61, 0.36, 1)";
    } else if (phase.kind === "hide") {
      transform = `translate(${fledRef.current ? FLEE_OFFSET_PX : 0}px, ${duck}px)`;
      transition = reducedMotion ? "none" : "transform 150ms ease-out";
    } else if (phase.kind === "recover") {
      // "Putting the table back" = walking back from the edge.
      const back = phase.step >= 2 || !fledRef.current;
      transform = `translate(${back ? 0 : FLEE_OFFSET_PX}px, 0)`;
      transition = reducedMotion ? "none" : "transform 600ms ease-in-out";
    } else if (phase.kind === "annoyed") {
      transform = `translate(${tilt.x}px, ${tilt.y}px) rotate(${leanAway}deg)`;
      transition = reducedMotion ? "none" : "transform 150ms ease-out";
    } else {
      transform = `translate(${tilt.x}px, ${tilt.y}px) rotate(${baseRotate}deg)`;
      transition = reducedMotion ? "none" : "transform 150ms ease-out";
    }

    return (
      <>
        <span role="status" aria-live="polite" className="sr-only">
          {announcement}
        </span>
        <button
          type="button"
          onClick={handleClick}
          aria-label={ARIA_LABELS[phase.kind]}
          className={`relative -m-3 inline-flex min-h-[44px] min-w-[44px] cursor-pointer select-none items-center justify-center whitespace-nowrap p-3 leading-none ${className}`}
          style={{
            fontFamily: FONT_STACK,
            // Disable JetBrains Mono ligatures so "=ε=" and ">w<" render verbatim.
            fontFeatureSettings: '"calt" 0, "liga" 0',
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          <span
            ref={hostRef}
            aria-hidden="true"
            className={`inline-block leading-none ${showFlyingTable ? "kaomoji-lean" : ""}`}
            style={{
              transform,
              transition,
              willChange: "transform",
              whiteSpace: "nowrap",
            }}
          >
            <span key={innerKey} className={innerClass}>
              {face}
              {showFlyingTable && (
                <span aria-hidden="true" className="kaomoji-table">
                  {" ┻━┻"}
                </span>
              )}
            </span>
          </span>
        </button>
      </>
    );
  },
);

KaomojiMascot.displayName = "KaomojiMascot";