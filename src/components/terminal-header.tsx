import { motion, AnimatePresence } from "framer-motion";

interface TerminalHeaderProps {
  phase: "intro" | "active" | "complete";
  activeSection?: string | null;
  onNavigate?: (section: string) => void;
  agentCount?: number;
}

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function TerminalHeader({
  phase,
  activeSection,
  onNavigate,
  agentCount = 4,
}: TerminalHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg/80 backdrop-blur-sm"
    >
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between text-xs font-mono min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 overflow-hidden">
          {phase === "intro" || phase === "active" ? (
            <>
              <span className="flex items-center gap-1.5 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-text-muted hidden sm:inline">
                  {agentCount} agents online
                </span>
                <span className="text-text-muted sm:hidden">
                  {agentCount}
                </span>
              </span>
              <span className="text-border-subtle shrink-0">|</span>
              <span className="text-text-muted truncate">jenyangk.github.io</span>
            </>
          ) : (
            <>
              <span className="text-text-muted truncate shrink-0 hidden sm:inline">jenyangk.github.io</span>
              <span className="text-border-subtle shrink-0 hidden sm:inline">|</span>
              <nav className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => onNavigate?.(section.id)}
                    className={`hover:text-text transition-colors whitespace-nowrap shrink-0 ${
                      activeSection === section.id
                        ? "text-text underline underline-offset-4"
                        : "text-text-muted"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </>
          )}
        </div>

        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.span
              key="status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-text-muted shrink-0 ml-2"
            >
              initializing...
            </motion.span>
          )}
          {phase === "complete" && (
            <motion.span
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-text-muted shrink-0 ml-2 hidden sm:inline"
            >
              profile assembled
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
