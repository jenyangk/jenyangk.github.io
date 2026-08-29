interface ExperienceEntry {
    role: string;
    company: string;
    dates: string;
    lead?: React.ReactNode;
    bullets: string[];
    metrics?: { value: string; label: string }[];
}

const ENTRIES: ExperienceEntry[] = [
    {
        role: "Software Engineer II",
        company: "Latium Technologies",
        dates: "Feb 2025 – Present",
        lead: (
            <p className="text-base text-text italic leading-relaxed max-w-[65ch]">
                Replaced a shelved legacy mobile app with a new .NET MAUI
                field app. Partnered with business analysts and customers to
                redesign core workflows; drove 2× adoption.
            </p>
        ),
        metrics: [
            { value: "200+", label: "sites" },
            { value: "2M+", label: "events/day" },
            { value: "~50%", label: "fewer repeat incidents" },
        ],
        bullets: [
            "Technical lead for a 4-engineer team; scaled deployment to 200+ production sites with 2× YoY growth",
            "Re-architected the telemetry pipeline: batching, parallel processing, and backpressure. It processes 2M+ events/day at p95 ~300ms from sensor to user-visible data",
            "Improved pipeline resilience through automated recovery, DLQ-based replay, and proactive alerting",
            "Rebuilt the team's shipping process with feature branching, CI-enforced branch protection, and release tagging. Established a weekly deployment cadence",
        ],
    },
    {
        role: "Lead Developer",
        company: "Eagles Communications",
        dates: "Mar 2026 – Present",
        bullets: [
            "Cut TTFB 62% by redesigning media delivery with Next.js, Cloudflare CDN, and a headless CMS, reducing page weight ~85%",
            "Built a self-service CMS that lets 5 non-technical staff publish independently, cutting content-update turnaround from days to minutes",
            "Migrated 4 years of newsletter archive from PDF to SEO-indexed web articles, growing monthly engagement by 50%",
        ],
    },
    {
        role: "Software Engineer I",
        company: "Latium Technologies",
        dates: "Sep 2022 – Feb 2025",
        bullets: [
            "Architected an edge computing platform in Go on ARM gateways: persistent queues processing 50 sensor events/sec, evaluating rules on-device in <100ms vs ~500ms cloud round-trip, sustaining full site protection through WAN outages",
            "Collaborated with hardware engineering to cut sensor-to-camera trigger latency from 30s to 2s using priority-based telemetry queues with device partitioning",
            "Mentored 5 engineers to production PRs within a week through pairing and live walkthroughs",
        ],
    },
    {
        role: "Software Developer I",
        company: "PCL Construction",
        dates: "Jun 2021 – Sep 2022",
        bullets: [
            "Sole developer on the platform-performance monitoring tooling for the IoT platform later led end-to-end at Latium",
            "Added follow-up reminder notifications that kept site teams from missing time-sensitive alarms across 100+ sites",
        ],
    },
];

export function Experience() {
    return (
        <section id="experience" className="mb-24 scroll-mt-20">
            <h2 className="font-serif text-2xl font-bold text-text mb-8">
                Experience
            </h2>

            <div className="space-y-12">
                {ENTRIES.map((entry) => (
                    <article key={`${entry.company}-${entry.role}`}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
                            <h3 className="font-bold text-text">
                                {entry.role}
                                <span className="font-normal text-text-muted"> · {entry.company}</span>
                            </h3>
                            <span className="font-mono text-xs text-text-muted">
                                {entry.dates}
                            </span>
                        </div>

                        {entry.lead}

                        {entry.metrics && (
                            <div className="my-5 flex items-stretch divide-x divide-border-subtle">
                                {entry.metrics.map((m) => (
                                    <div
                                        key={m.label}
                                        className="first:pl-0 pl-5 pr-5 last:pr-0"
                                    >
                                        <div className="font-serif text-2xl md:text-3xl text-text">
                                            {m.value}
                                        </div>
                                        <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted mt-1">
                                            {m.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <ul className="space-y-1.5">
                            {entry.bullets.map((bullet) => (
                                <li
                                    key={bullet}
                                    className="text-sm text-text-muted leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-text"
                                >
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}