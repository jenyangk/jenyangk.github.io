type Tier = 1 | 2 | 3;

const TIER_GLYPH: Record<Tier, string> = { 1: "█", 2: "▓", 3: "▒" };
const TIER_OPACITY: Record<Tier, number> = { 1: 1, 2: 0.8, 3: 0.6 };

const TIERS: { tier: Tier; label: string; items: string[] }[] = [
    {
        tier: 1,
        label: "daily",
        items: ["TypeScript", "React", "Go", "C#", "Azure"],
    },
    {
        tier: 2,
        label: "often",
        items: ["SQL", "Next.js", ".NET", "Cloudflare", "JavaScript"],
    },
    {
        tier: 3,
        label: "now and then",
        items: ["Python", "Angular", "React Native", "AWS"],
    },
];

export function Skills() {
    return (
        <section id="skills" className="mb-24 scroll-mt-20">
            <h2 className="font-serif text-2xl font-bold text-text mb-6">
                Skills
            </h2>

            <div className="space-y-2 font-mono text-sm leading-relaxed">
                {TIERS.map(({ tier, label, items }) => (
                    <p key={label}>
                        <span
                            aria-hidden="true"
                            className="mr-2"
                            style={{ opacity: TIER_OPACITY[tier] }}
                        >
                            {TIER_GLYPH[tier]}
                        </span>
                        <span className="text-text-muted">{label}: </span>
                        <span style={{ opacity: TIER_OPACITY[tier] }}>
                            {items.join(", ")}
                        </span>
                    </p>
                ))}
            </div>

            <p className="mt-5 max-w-[65ch] text-sm text-text-muted leading-relaxed">
                Underneath all of it: real-time telemetry, edge computing,
                distributed systems, event-driven design, observability.
            </p>
        </section>
    );
}