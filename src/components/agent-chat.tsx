import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { TypewriterText } from "./typewriter-text";

export interface AgentConfig {
  id: string;
  name: string;
  kaomoji: string;
  color: string;
  voice: string;
}

interface AgentChatProps {
  agent: AgentConfig;
  message: string;
  attachment?: ReactNode;
  phase: "pending" | "typing" | "attached" | "expanded" | "collapsed";
  timestamp?: string;
}

export function AgentChat({
  agent,
  message,
  attachment,
  phase,
  timestamp,
}: AgentChatProps) {
  const showAttachment = phase === "attached" || phase === "expanded";

  if (phase === "collapsed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mb-2 py-2 px-3 border border-border-subtle bg-bg/50 flex items-center gap-2 flex-wrap"
      >
        <span
          className="text-base select-none whitespace-nowrap shrink-0"
          style={{ color: agent.color }}
          aria-hidden
        >
          {agent.kaomoji}
        </span>
        <span className="font-mono text-xs font-medium truncate min-w-0" style={{ color: agent.color }}>
          {agent.name}
        </span>
        <span className="ml-auto font-mono text-[10px] text-text-muted shrink-0">
          completed
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6"
    >
      {/* Agent header */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-lg select-none whitespace-nowrap shrink-0"
          style={{ color: agent.color }}
          aria-hidden
        >
          {agent.kaomoji}
        </span>
        <span className="font-mono text-xs font-medium" style={{ color: agent.color }}>
          {agent.name}
        </span>
        {timestamp && (
          <span className="font-mono text-[10px] text-text-muted ml-1">
            {timestamp}
          </span>
        )}
      </div>

      {/* Chat bubble */}
      <div className="relative">
        {/* ASCII corner marks */}
        {phase !== "pending" && (
          <>
            <span
              className="absolute -top-2 -left-1 font-mono text-[10px] text-text-muted select-none"
              aria-hidden
            >
              ┌
            </span>
            <span
              className="absolute -bottom-2 -left-1 font-mono text-[10px] text-text-muted select-none"
              aria-hidden
            >
              └
            </span>
          </>
        )}

        <div className="pl-3 border-l border-border-subtle">
          <p className="text-sm leading-relaxed text-text">
            {phase === "typing" ? (
              <TypewriterText
                text={message}
                speed={40}
                showCursor
                start
              />
            ) : (
              message
            )}
          </p>
        </div>
      </div>

      {/* Attachment */}
      {showAttachment && attachment && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            height: "auto",
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          className="mt-3 ml-4"
        >
          <div className="border border-border-subtle bg-bg p-5">
            {/* ASCII frame header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[10px] text-text-muted select-none">┌</span>
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(90deg, ${agent.color}40, transparent)`,
                }}
              />
            </div>

            {attachment}

            <div className="flex items-center gap-2 mt-3">
              <span className="font-mono text-[10px] text-text-muted select-none">└</span>
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(90deg, ${agent.color}20, transparent)`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

interface CollapsibleAgentLogProps {
  agents: AgentConfig[];
  children: ReactNode;
  isIntroComplete: boolean;
}

export function CollapsibleAgentLog({
  agents,
  children,
  isIntroComplete,
}: CollapsibleAgentLogProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Collapsed state - compact reasoning bar */}
      <AnimatePresence>
        {isIntroComplete && !isExpanded && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            className="w-full flex flex-col items-center gap-3 px-3 py-2.5 border border-border-subtle bg-bg/60 hover:bg-bg/80 transition-colors text-left group cursor-pointer"
          >
            <div className="flex -space-x-1.5">
              {agents.map((agent) => (
                <span
                  key={agent.id}
                  className="text-base bg-bg border border-border-subtle rounded-full px-1.5 py-0.5 flex items-center justify-center select-none whitespace-nowrap shrink-0 min-w-[2rem] min-h-[2rem]"
                  style={{ color: agent.color }}
                >
                  {agent.kaomoji}
                </span>
              ))}
            </div>
            <span className="font-mono text-xs text-text-muted group-hover:text-text transition-colors">
              {agents.length} agents collaborated to build this profile
            </span>
            <span className="ml-auto font-mono text-[10px] text-text-muted">
              [expand]
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded state - full agent chat */}
      <AnimatePresence>
        {(!isIntroComplete || isExpanded) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isIntroComplete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="mb-3 font-mono text-[10px] text-text-muted hover:text-text transition-colors cursor-pointer"
              >
                [collapse reasoning]
              </button>
            )}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
