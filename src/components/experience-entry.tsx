import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface ExperienceEntryProps {
  company: string;
  title: string;
  period: string;
  summary: string;
  details: string[];
  tech: React.ReactNode[];
  logo?: string;
}

export const ExperienceEntry = ({
  company,
  title,
  period,
  summary,
  details,
  tech,
  logo,
}: ExperienceEntryProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group">
      <div className="flex items-start gap-4 md:gap-6">
        {logo && (
          <img
            src={logo}
            alt={company}
            className="w-12 h-12 object-contain flex-shrink-0 mt-1 opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        )}
        <div className="flex-1 min-w-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 cursor-pointer text-left w-full hover:opacity-70 transition-opacity"
            aria-expanded={expanded}
          >
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h3>
            <ChevronRight
              className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
            />
          </button>
          <p className="text-sm md:text-base text-zinc-500 mt-1 font-mono">
            {company} · {period}
          </p>
          <p className="text-base md:text-lg mt-2 leading-relaxed">{summary}</p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <ul className="mt-4 space-y-2 text-base text-zinc-600 list-disc list-inside leading-relaxed">
                  {details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {tech.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {tech.map((icon, i) => (
                <span key={i} className="opacity-60 hover:opacity-100 transition-opacity">{icon}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
