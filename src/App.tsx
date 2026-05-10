import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  FileText,
  Hammer,
  Zap,
} from "lucide-react";

import { AsciiCanvas, AsciiCanvasRef } from "@/components/ascii-canvas";
import { TerminalHeader } from "@/components/terminal-header";
import { AgentChat, AgentConfig, CollapsibleAgentLog } from "@/components/agent-chat";
import { TypewriterText } from "@/components/typewriter-text";
import { LocationAttachment } from "@/components/attachments/location-attachment";
import { ExperienceAttachment } from "@/components/attachments/experience-attachment";
import { ProjectAttachment } from "@/components/attachments/project-attachment";
import { ReadingAttachment } from "@/components/attachments/reading-attachment";

import resume from "@/assets/Resume.pdf";
import profile from "@/assets/images/profile.webp";
import waving_hand from "@/assets/images/waving-hand.png";

const AGENTS: AgentConfig[] = [
  {
    id: "navigator",
    name: "Navigator",
    kaomoji: "(⌐■_■)",
    color: "var(--accent-navigator)",
    voice: "cool",
  },
  {
    id: "archivist",
    name: "Archivist",
    kaomoji: "(｀・ω・´)",
    color: "var(--accent-archivist)",
    voice: "methodical",
  },
  {
    id: "builder",
    name: "Builder",
    kaomoji: "(◕‿◕)♡",
    color: "var(--accent-builder)",
    voice: "enthusiastic",
  },
  {
    id: "curator",
    name: "Curator",
    kaomoji: "(´｡• ᵕ •｡`)",
    color: "var(--accent-curator)",
    voice: "gentle",
  },
];

const AGENT_MESSAGES: Record<string, string> = {
  navigator: "Located. Edmonton, AB. UTC-6. Dual: 🇨🇦 / 🇲🇾.",
  archivist: "3 companies on file. 2017–present. Chronology verified. Stand by.",
  builder:
    "Ooh! DouDou has real-time votes! Supabase subscriptions! ✨ Built with friends!",
  curator: "Currently exploring AI engineering… and how systems think.",
};

const PROMPT_TEXT = "who is jen yang koh?";

function SystemNote({ children }: { children: string }) {
  return (
    <p className="font-mono text-xs text-text-muted my-3">
      <span className="opacity-50">{"> "}</span>
      {children}
    </p>
  );
}

export default function App() {
  const [phase, setPhase] = useState<"intro" | "unlocked">("intro");
  const [promptComplete, setPromptComplete] = useState(false);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [agentPhases, setAgentPhases] = useState<Record<string, string>>({});
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showSkip, setShowSkip] = useState(false);

  const canvasRef = useRef<AsciiCanvasRef>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const skipRef = useRef(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const visibleAgents = isMobile
    ? [AGENTS[0], AGENTS[2]]
    : AGENTS;

  const handleSkip = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    timelineRef.current?.kill();
    setPromptComplete(true);
    setActiveAgents(visibleAgents.map((a) => a.id));
    const allExpanded: Record<string, string> = {};
    visibleAgents.forEach((a) => {
      allExpanded[a.id] = "expanded";
    });
    setAgentPhases(allExpanded);
    setPhase("unlocked");
    setShowFullProfile(true);
    document.body.style.overflow = "auto";
    setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [visibleAgents]);

  const runIntro = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
      setPhase("unlocked");
      setShowFullProfile(true);
      setShowSkip(false);
      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }, 600);
      },
    });
    timelineRef.current = tl;

    // Show skip button after 2s
    setTimeout(() => setShowSkip(true), 2000);

    // Phase 1: Prompt typing
    const promptDuration = skipRef.current ? 0 : PROMPT_TEXT.length * 0.12;
    tl.to(
      {},
      {
        duration: promptDuration,
        onComplete: () => {
          setPromptComplete(true);
        },
      }
    );

    tl.add(() => {}, "+=0.4");

    // Phase 2: Agents appear sequentially (one at a time)
    const agentDelay = skipRef.current ? 0 : 0.5;
    const typeDuration = skipRef.current ? 0 : 2.0;
    const expandDelay = skipRef.current ? 0 : 0.3;
    const expandDuration = skipRef.current ? 0 : 0.6;

    for (let i = 0; i < visibleAgents.length; i++) {
      const agent = visibleAgents[i];

      tl.add(() => {
        setActiveAgents((prev) => [...prev, agent.id]);
        setAgentPhases((prev) => ({ ...prev, [agent.id]: "typing" }));
        canvasRef.current?.pulseAt(
          window.innerWidth * (0.3 + Math.random() * 0.4),
          window.innerHeight * (0.3 + Math.random() * 0.4),
          1
        );
        // Auto-scroll to keep new agent in view
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 100);
      });

      tl.to(
        {},
        {
          duration: typeDuration,
          onComplete: () => {
            setAgentPhases((prev) => ({ ...prev, [agent.id]: "attached" }));
          },
        }
      );

      tl.to(
        {},
        {
          duration: expandDuration,
          delay: expandDelay,
          onComplete: () => {
            setAgentPhases((prev) => ({ ...prev, [agent.id]: "expanded" }));
          },
        }
      );

      if (i < visibleAgents.length - 1) {
        tl.to({}, { duration: agentDelay });
      }
    }

    tl.add(() => {
      setPhase("unlocked");
      setShowFullProfile(true);
      document.body.style.overflow = "auto";
      setShowSkip(false);
    });
  }, [visibleAgents]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runIntro();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [runIntro]);

  // Only Enter key skips, no global click
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleSkip();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleSkip]);

  // Scroll spy for active section
  useEffect(() => {
    if (phase !== "unlocked") return;

    const sections = ["about", "experience", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [phase]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <AsciiCanvas ref={canvasRef} />
      <TerminalHeader
        phase={phase === "intro" ? "intro" : "complete"}
        activeSection={activeSection}
        onNavigate={scrollTo}
        agentCount={visibleAgents.length}
      />

      <main className="relative z-10">
        {/* INTRO STAGE */}
        <div
          className="mx-auto max-w-2xl px-4 pt-16 pb-8"
        >
          {/* Prompt */}
          <div className="mb-8">
            <p className="font-mono text-sm text-text-muted mb-1">
              <span className="opacity-50">$</span> user@visitor
            </p>
            <div className="font-mono text-lg text-text">
              {phase === "intro" && !promptComplete ? (
                <TypewriterText
                  text={PROMPT_TEXT}
                  speed={80}
                  showCursor
                  start
                  onComplete={() => setPromptComplete(true)}
                />
              ) : (
                <>{PROMPT_TEXT}</>
              )}
            </div>
          </div>

          {/* System notes */}
          {promptComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SystemNote>dispatching agents...</SystemNote>
            </motion.div>
          )}

          {/* Skip button */}
          <AnimatePresence>
            {showSkip && phase === "intro" && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleSkip}
                className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-subtle font-mono text-[10px] text-text-muted hover:text-text hover:border-text transition-colors cursor-pointer"
              >
                <Zap className="w-3 h-3" />
                Press Enter or click to skip
              </motion.button>
            )}
          </AnimatePresence>

          {/* Agent messages */}
          <CollapsibleAgentLog
            agents={visibleAgents}
            isIntroComplete={phase === "unlocked"}
          >
            {visibleAgents.map((agent) => {
              const isActive = activeAgents.includes(agent.id);
              const aphase = agentPhases[agent.id] || "pending";
              if (!isActive) return null;

              let attachment = null;
              if (agent.id === "navigator") attachment = <LocationAttachment />;
              if (agent.id === "archivist") attachment = <ExperienceAttachment />;
              if (agent.id === "builder") attachment = <ProjectAttachment />;
              if (agent.id === "curator") attachment = <ReadingAttachment />;

              return (
                <AgentChat
                  key={agent.id}
                  agent={agent}
                  message={AGENT_MESSAGES[agent.id]}
                  attachment={attachment}
                  phase={aphase as any}
                  timestamp={new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              );
            })}
          </CollapsibleAgentLog>

          {/* System complete note */}
          {phase === "unlocked" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <SystemNote>profile assembled. scroll to explore.</SystemNote>
            </motion.div>
          )}
        </div>

        {/* FULL PORTFOLIO */}
        <AnimatePresence>
          {showFullProfile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-2xl px-4 pb-20"
            >
              {/* About */}
              <section id="about" className="mb-16 pt-8">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={profile}
                    alt="Jen Yang Koh"
                    className="w-28 h-28 md:w-36 md:h-36 rounded border border-border-subtle object-cover"
                    loading="eager"
                  />
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-text">
                      Jen Yang Koh
                    </h2>
                    <p className="font-mono text-xs text-text-muted mt-1">
                      Also goes by Andy
                      <img
                        src={waving_hand}
                        alt=""
                        className="w-4 h-4 inline-block ml-1"
                      />
                    </p>
                  </div>
                </div>

                <div className="border-l-2 border-border-subtle pl-4">
                  <p className="text-xl font-serif font-semibold text-text leading-snug mb-4">
                    I build software that works.
                  </p>
                  <p className="text-sm text-text-muted leading-relaxed">
                    I don't stress too much about labels like "frontend" or
                    "backend." If a button needs to be clicked, I'll design it.
                    If that button needs to save data, I'll write the API. I just
                    want to build the whole thing right.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                  <a
                    href="https://github.com/jenyangk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jenyangkoh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                  <a
                    href={resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Résumé
                  </a>
                  <a
                    href="mailto:jenyang.koh@gmail.com"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </a>
                </div>
              </section>

              {/* Currently Building */}
              <section className="mb-16">
                <div className="flex items-center gap-2 mb-4">
                  <Hammer className="w-4 h-4 text-builder" />
                  <h3 className="font-serif text-lg font-semibold">
                    Currently Building
                  </h3>
                </div>
                <div className="space-y-4 border-l border-border-subtle pl-4">
                  {[
                    {
                      name: "IoT Platform",
                      org: "Latium Technologies",
                      status: "In Progress",
                      desc: "Monitoring systems, mobile apps, and web portals for construction site operations.",
                      tech: ["C#", ".NET", "Azure", "React"],
                    },
                    {
                      name: "Eagles Website",
                      org: "Eagles Communications Ltd.",
                      status: "Client Work",
                      desc: "Redesigning a Singaporean organization's website with Next.js, Prismic CMS, and Cloudflare.",
                      tech: ["Next.js", "Prismic", "Cloudflare"],
                    },
                    {
                      name: "Phishing Simulation",
                      status: "R&D",
                      desc: "Early-phase AI-native security tool using agentic workflows and LangGraph for SME phishing awareness.",
                      tech: ["LangGraph", "Python", "AI Agents"],
                    },
                    {
                      name: "AI Engineering",
                      status: "Learning",
                      desc: "Studying agent orchestration, LLM systems design, and building experimental AI tools.",
                      tech: ["LangGraph", "OpenAI", "Python"],
                    },
                  ].map((item, i) => (
                    <div key={i} className="group">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-medium text-text">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                          {item.status}
                        </span>
                      </div>
                      {item.org && (
                        <p className="text-xs text-text-muted mt-0.5">
                          {item.org}
                        </p>
                      )}
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 text-[10px] font-mono border border-border-subtle text-text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Experience */}
              <section id="experience" className="mb-16">
                <ExperienceAttachment />
              </section>

              {/* Projects */}
              <section id="projects" className="mb-16">
                <ProjectAttachment />
              </section>

              {/* Reading */}
              <section className="mb-16">
                <ReadingAttachment />
              </section>

              {/* Contact */}
              <section id="contact" className="mb-12">
                <h3 className="font-serif text-2xl font-bold text-text mb-4">
                  Let's build something together.
                </h3>
                <p className="text-sm text-text-muted mb-6 leading-relaxed">
                  I'm always open to interesting projects, collaborations, or just
                  a good conversation about software.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:jenyang.koh@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border text-xs font-mono hover:bg-text hover:text-bg transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email Me
                  </a>
                  <a
                    href={resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border text-xs font-mono hover:bg-text hover:text-bg transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    View Résumé
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jenyangkoh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border text-xs font-mono hover:bg-text hover:text-bg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                </div>
              </section>

              {/* Footer */}
              <footer className="border-t border-border-subtle pt-6 flex items-center justify-between text-text-muted">
                <p className="font-mono text-[10px]">© 2026 Jen Yang Koh</p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="font-mono text-[10px] hover:text-text transition-colors"
                >
                  Back to top ↑
                </button>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
