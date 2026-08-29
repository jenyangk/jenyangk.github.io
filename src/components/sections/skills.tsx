type Tier = 1 | 2 | 3;

const TIER_GLYPH: Record<Tier, string> = { 1: "█", 2: "▓", 3: "▒" };
const TIER_OPACITY: Record<Tier, number> = { 1: 1, 2: 0.78, 3: 0.58 };

interface SkillItem {
    name: string;
    tier?: Tier;
}

const GROUPS: { label: string; items: SkillItem[] }[] = [
    {
        label: "Languages",
        items: [
            { name: "TypeScript", tier: 1 },
            { name: "SQL", tier: 2 },
            { name: "C#", tier: 2 },
            { name: "JavaScript", tier: 2 },
            { name: "Go", tier: 2 },
            { name: "Python", tier: 3 },
        ],
    },
    {
        label: "Frameworks",
        items: [
            { name: "React", tier: 1 },
            { name: "Next.js", tier: 1 },
            { name: ".NET", tier: 2 },
            { name: ".NET MAUI", tier: 2 },
            { name: "Angular", tier: 3 },
            { name: "React Native", tier: 3 },
        ],
    },
    {
        label: "Cloud",
        items: [
            { name: "Azure", tier: 1 },
            { name: "Cloudflare", tier: 2 },
            { name: "AWS", tier: 3 },
        ],
    },
    {
        label: "Systems",
        items: [
            { name: "Real-time telemetry" },
            { name: "Edge computing" },
            { name: "Distributed systems" },
            { name: "Event-driven" },
            { name: "Observability" },
        ],
    },
];

function SkillName({ item }: { item: SkillItem }) {
    if (!item.tier) return <>{item.name}</>;
    return (
        <>
            <span aria-hidden="true" style={{ opacity: TIER_OPACITY[item.tier] }}>
                {TIER_GLYPH[item.tier]}{"\u00a0"}
            </span>
            <span style={{ opacity: TIER_OPACITY[item.tier] }}>{item.name}</span>
        </>
    );
}

const LEGEND = [
    { tier: 1 as Tier, text: "daily" },
    { tier: 2 as Tier, text: "often" },
    { tier: 3 as Tier, text: "now and then" },
];

export function Skills() {
    return (
        <section id="skills" className="mb-24 scroll-mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-6">
                <h2 className="font-serif text-2xl font-bold text-text">
                    Skills
                </h2>
                <p
                    className="font-mono text-[11px] text-text-muted"
                    aria-label="Legend: block density indicates how often each skill is used. Filled block: daily. Three-quarters block: often. Quarter block: now and then."
                >
                    {LEGEND.map(({ tier, text }, i) => (
                        <span key={tier}>
                            {i > 0 && (
                                <span className="mx-1.5" aria-hidden="true">
                                    ·
                                </span>
                            )}
                            <span
                                aria-hidden="true"
                                style={{ opacity: TIER_OPACITY[tier] }}
                            >
                                {TIER_GLYPH[tier]}
                            </span>{" "}
                            {text}
                        </span>
                    ))}
                </p>
            </div>

            <div>
                {GROUPS.map(({ label, items }) => (
                    <div
                        key={label}
                        className="grid grid-cols-[120px_1fr] gap-4 py-2 border-b border-border-subtle last:border-b-0"
                    >
                        <div className="font-mono text-xs text-text-muted uppercase tracking-wider">
                            {label}
                        </div>
                        <div className="font-mono text-xs text-text leading-relaxed">
                            {items.map((item, i) => (
                                <span key={item.name}>
                                    {i > 0 && (
                                        <span
                                            className="text-text-muted"
                                            aria-hidden="true"
                                        >
                                            {" · "}
                                        </span>
                                    )}
                                    <SkillName item={item} />
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}