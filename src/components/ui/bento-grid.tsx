import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  className?: string;
  children?: React.ReactNode;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  onClick?: () => void;
  id?: string;
}

export const BentoCard = ({
  className,
  children,
  colSpan = 1,
  rowSpan = 1,
  onClick,
  id,
}: BentoCardProps) => {
  const colSpanClass = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3 lg:col-span-3",
  }[colSpan];

  const rowSpanClass = {
    1: "row-span-1",
    2: "row-span-2",
  }[rowSpan];

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        // Base
        "relative p-5 bg-bw border border-border overflow-hidden",
        // Industrial precision: sharp corners, no rounded
        "rounded-none",
        // Hover: subtle lift, border highlight
        "transition-all duration-150 ease-out",
        "hover:border-text hover:shadow-[4px_4px_0px_0px_var(--border)]",
        // Grid span
        colSpanClass,
        rowSpanClass,
        // Click state
        onClick && "cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        className
      )}
      onClick={onClick}
    >
      {/* Corner marks - industrial/blueprint feel */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-border opacity-30" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-border opacity-30" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-border opacity-30" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-border opacity-30" />

      {children}
    </motion.div>
  );
};

// A highlight card variant for "hero" or "manifesto" blocks
export const BentoCardHighlight = ({
  className,
  children,
  colSpan = 2,
  rowSpan = 1,
}: BentoCardProps) => {
  const colSpanClass = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3 lg:col-span-3",
  }[colSpan];

  const rowSpanClass = {
    1: "row-span-1",
    2: "row-span-2",
  }[rowSpan];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        // Base with accent
        "relative p-6 bg-blank text-bw border-2 border-border overflow-hidden",
        "rounded-none",
        // Grid span
        colSpanClass,
        rowSpanClass,
        className
      )}
    >
      {/* Crosshair marker */}
      <div className="absolute top-3 right-3 w-4 h-4 opacity-40">
        <div className="absolute top-1/2 left-0 w-full h-px bg-current" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-current" />
      </div>

      {children}
    </motion.div>
  );
};
