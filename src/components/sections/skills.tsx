const GROUPS: { label: string; items: string[] }[] = [
    {
        label: "Languages",
        items: ["TypeScript", "Go", "C#", "JavaScript", "Python", "SQL"],
    },
    {
        label: "Frameworks",
        items: [
            "React",
            "Next.js",
            "Angular",
            "React Native",
            ".NET",
            ".NET MAUI",
        ],
    },
    {
        label: "Cloud",
        items: ["Azure", "AWS", "Cloudflare"],
    },
    {
        label: "Systems",
        items: [
            "Distributed systems",
            "Edge computing",
            "Event-driven",
            "Real-time telemetry",
            "Observability",
        ],
    },
];

export function Skills() {
    return (
        <section id="skills" className="mb-24 scroll-mt-20">
            <h2 className="font-serif text-2xl font-bold text-text mb-6">
                Skills
            </h2>
            <div>
                {GROUPS.map(({ label, items }) => (
                    <div
                        key={label}
                        className="grid grid-cols-[120px_1fr] gap-4 py-2 border-b border-border-subtle last:border-b-0"
                    >
                        <div className="font-mono text-xs text-text-muted uppercase tracking-wider">
                            {label}
                        </div>
                        <div className="font-mono text-xs text-text">
                            {items.join(" · ")}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}