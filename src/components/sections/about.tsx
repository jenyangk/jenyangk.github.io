const CURRENTLY = [
    "Software Engineer II @ Latium",
    "Reading: Astrophysics for People in a Hurry",
    "Building: a Raspberry Pi astrophotography rig",
    "Squash twice a week",
];

export function About() {
    return (
        <section id="about" className="mb-24 scroll-mt-20">
            <h2 className="font-serif text-2xl font-bold text-text mb-4">About</h2>
            <p className="max-w-[65ch] text-base text-text-muted leading-relaxed">
                Software Engineer II at Latium Technologies, building industrial
                IoT platforms that process millions of telemetry events a day.
                My focus is full-stack systems work. Edge computing, data
                pipelines, and the interfaces on top of them. I like tools
                that fit the problem, not the familiar ones.
            </p>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Currently">
                {CURRENTLY.map((item) => (
                    <span
                        key={item}
                        className="inline-block border border-border-subtle px-2.5 py-1 font-mono text-xs text-text-muted"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </section>
    );
}