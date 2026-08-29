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

const MOOD_FACES: Record<KaomojiMood, string> = {
  default: "(⌐■_■)",
  work: "(◕‿◕)",
  projects: "(⌐■_■)ノ",
  thinking: "( ˘･з･˘)",
  celebrate: "(⌐■_■)ノ♪",
};

const SLEEPING_FACE = "(-_-) zzz";
const BLINK_FACE = "(-_-)";

export interface KaomojiMascotRef {
  celebrate: () => void;
}

interface KaomojiMascotProps {
  mood?: KaomojiMood;
  className?: string;
}

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

export const KaomojiMascot = forwardRef<KaomojiMascotRef, KaomojiMascotProps>(
  ({ mood = "default", className = "" }, ref) => {
    const reducedMotion = usePrefersReducedMotion();
    const [asleep, setAsleep] = useState(false);
    const [blinking, setBlinking] = useState(false);
    const [celebrating, setCelebrating] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [pulseKey, setPulseKey] = useState(0);

    const hostRef = useRef<HTMLSpanElement>(null);
    const lastMoveRef = useRef(Date.now());
    const celebrateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const unblinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      };
    }, [reducedMotion, asleep]);

    // --- Eyes follow cursor: subtle tilt/shift toward pointer ---
    useEffect(() => {
      if (reducedMotion) return;

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

    const face = useMemo(() => {
      if (celebrating) return MOOD_FACES.celebrate;
      if (asleep) return SLEEPING_FACE;
      if (blinking) return BLINK_FACE;
      return MOOD_FACES[mood];
    }, [celebrating, asleep, blinking, mood]);

    // Idle float while asleep; mood-pulse retriggered via key change
    const innerClass = asleep && !celebrating ? "kaomoji-float" : "kaomoji-pulse";

    const rotate = Math.max(-8, Math.min(8, tilt.x * 1.5));

    return (
      <span
        ref={hostRef}
        className={`inline-block font-mono select-none whitespace-nowrap leading-none ${className}`}
        style={{
          transform: `translate(${tilt.x}px, ${tilt.y}px) rotate(${rotate}deg)`,
          transition: "transform 150ms ease-out",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <span key={pulseKey} className={innerClass}>
          {face}
        </span>
      </span>
    );
  },
);

KaomojiMascot.displayName = "KaomojiMascot";