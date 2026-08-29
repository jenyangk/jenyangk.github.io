import { useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";

const DOUDOU_API = "https://doudou-api.onrender.com/results/0";

function extractVoteCount(data: unknown): number | null {
    if (typeof data === "number" && Number.isFinite(data)) return data;
    if (data === null || typeof data !== "object") return null;
    const obj = data as Record<string, unknown>;
    for (const key of ["totalVotes", "votes", "count"]) {
        if (typeof obj[key] === "number" && Number.isFinite(obj[key])) {
            return obj[key] as number;
        }
    }
    if (Array.isArray(obj.results)) {
        let sum = 0;
        let found = false;
        for (const item of obj.results) {
            if (item && typeof item === "object") {
                const v = (item as Record<string, unknown>).votes ??
                    (item as Record<string, unknown>).count;
                if (typeof v === "number" && Number.isFinite(v)) {
                    sum += v;
                    found = true;
                }
            }
        }
        if (found) return sum;
    }
    return null;
}

export function useVoteCount(): { votes: number | null; offline: boolean } {
    const [votes, setVotes] = useState<number | null>(null);
    const [offline, setOffline] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let retryTimer: ReturnType<typeof setTimeout> | null = null;

        const tryFetch = (isRetry: boolean) => {
            fetch(DOUDOU_API)
                .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
                .then((data) => {
                    if (cancelled) return;
                    const count = extractVoteCount(data);
                    if (count !== null) {
                        setVotes(count);
                        setOffline(false);
                    } else {
                        setOffline(true);
                    }
                })
                .catch(() => {
                    if (cancelled) return;
                    if (!isRetry) {
                        // Render free-tier cold start: retry once after 4s
                        retryTimer = setTimeout(() => tryFetch(true), 4000);
                    } else {
                        setOffline(true);
                    }
                });
        };

        tryFetch(false);
        return () => {
            cancelled = true;
            if (retryTimer) clearTimeout(retryTimer);
        };
    }, []);

    return { votes, offline };
}

function VoteCount() {
    const { votes, offline } = useVoteCount();

    if (offline) {
        return (
            <span className="whitespace-nowrap font-mono text-[11px] text-text-muted">
                offline — likely cold-starting
            </span>
        );
    }
    if (votes === null) {
        return (
            <span className="whitespace-nowrap font-mono text-[11px] text-text-muted">
                counting votes…
            </span>
        );
    }
    return (
        <span className="font-mono text-xs text-text">
            <span className="text-accent-strong">{votes.toLocaleString()}</span>{" "}
            live votes
        </span>
    );
}

export function Projects() {
    return (
        <section id="projects" className="mb-24 scroll-mt-20">
            <h2 className="font-serif text-2xl font-bold text-text mb-8">
                Projects
            </h2>

            <article>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-bold text-text text-lg">DouDou</h3>
                    <VoteCount />
                </div>
                <p className="mt-2 max-w-[65ch] text-sm text-text-muted leading-relaxed">
                    Interactive photo voting app with a multi-phase workflow —
                    friends vote on photos in real time.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {[
                        "React",
                        "TypeScript",
                        "Socket.IO",
                        "Express",
                        "Node.js",
                        "Azure Static Web Apps",
                        "Render",
                    ].map((tech) => (
                        <span
                            key={tech}
                            className="border border-border-subtle px-1.5 py-0.5 font-mono text-[10px] text-text-muted"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="mt-3 flex gap-4">
                    <a
                        href="https://doudou.muniee.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-text transition-colors"
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live site
                    </a>
                    <a
                        href="https://github.com/jenyangk/doudou"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-text transition-colors"
                    >
                        <Github className="h-3.5 w-3.5" />
                        GitHub
                    </a>
                </div>
            </article>

            <p className="mt-8 max-w-[65ch] text-sm text-text-muted leading-relaxed">
                Also tinkering with a Raspberry Pi — an astrophotography rig
                that captures star fields on clear nights.
            </p>

            <div className="mt-10 space-y-2 font-mono text-xs text-text-muted">
                <p>
                    <span className="text-text">Languages</span> · TypeScript,
                    Go, C#, JavaScript, Python, SQL
                </p>
                <p>
                    <span className="text-text">Frameworks</span> · React,
                    Next.js, Angular, React Native, .NET, .NET MAUI
                </p>
                <p>
                    <span className="text-text">Cloud</span> · Azure, AWS,
                    Cloudflare
                </p>
            </div>
        </section>
    );
}