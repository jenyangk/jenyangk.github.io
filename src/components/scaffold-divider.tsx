import { cn } from "@/lib/utils";

interface ScaffoldDividerProps {
  className?: string;
  variant?: "horizontal" | "vertical";
  withHazard?: boolean;
}

export const ScaffoldDivider = ({
  className,
  variant = "horizontal",
  withHazard = false,
}: ScaffoldDividerProps) => {
  if (variant === "vertical") {
    return (
      <div className={cn("relative flex flex-col items-center h-full", className)}>
        <div className="w-px h-full bg-border opacity-40" />
        {withHazard && (
          <div className="absolute top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
            <span className="font-mono text-[10px] uppercase tracking-widest bg-accent-yellow text-black px-1 py-0.5">
              Caution
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex items-center gap-0 w-full">
        <div className="h-px flex-1 bg-border opacity-40" />
        <div className="flex items-center gap-1 px-3">
          <span className="font-mono text-xs opacity-30">+</span>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-30">
            ─────
          </span>
          <span className="font-mono text-xs opacity-30">+</span>
        </div>
        <div className="h-px flex-1 bg-border opacity-40" />
      </div>
      {withHazard && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="font-mono text-[10px] uppercase tracking-widest bg-accent-yellow text-black px-1 py-0.5">
            Work in Progress
          </span>
        </div>
      )}
    </div>
  );
};
