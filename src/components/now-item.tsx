interface NowItemProps {
  name: string;
  org?: string;
  status: "In Progress" | "R&D" | "Client Work" | "Learning";
  description: string;
  tech: string[];
  link?: string;
}

const statusLabel: Record<string, string> = {
  "In Progress": "● In Progress",
  "R&D": "● R&D",
  "Client Work": "● Client Work",
  Learning: "● Learning",
};

export const NowItem = ({
  name,
  org,
  status,
  description,
  tech,
  link,
}: NowItemProps) => {
  return (
    <div className="group">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl font-bold hover:opacity-70 transition-opacity"
            >
              {name}
            </a>
          ) : (
            <h3 className="text-lg md:text-xl font-bold">{name}</h3>
          )}
          {org && (
            <p className="text-sm text-zinc-500 mt-0.5">{org}</p>
          )}
        </div>
        <span className="flex-shrink-0 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
          {statusLabel[status]}
        </span>
      </div>

      <p className="text-base text-zinc-600 leading-relaxed mb-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] uppercase tracking-wider text-zinc-500"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
