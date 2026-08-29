import { KaomojiMascot, KaomojiMascotRef, KaomojiMood } from "@/components/kaomoji-mascot";

interface HeroProps {
    mascotRef: React.RefObject<KaomojiMascotRef | null>;
    mood?: KaomojiMood;
}

export function Hero({ mascotRef, mood = "default" }: HeroProps) {
    return (
        <section className="pt-28 pb-20">
            <div className="mb-6">
                <KaomojiMascot
                    ref={mascotRef}
                    mood={mood}
                    className="text-5xl md:text-6xl text-text"
                />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-text leading-tight">
                Andy Koh
            </h1>
            <p className="mt-3 text-lg font-medium text-text">
                Full-stack software engineer
            </p>
            <p className="mt-4 max-w-[65ch] text-base text-text-muted leading-relaxed">
                Good systems are the ones you stop noticing.
            </p>
            <p className="mt-6 font-mono text-xs text-text-muted">
                Edmonton, Canada · Open to Singapore
            </p>
            <p className="mt-4 font-mono text-xs">
                <a
                    href="/Andy_Koh_Resume.pdf"
                    download="Andy_Koh_Resume.pdf"
                    className="inline-flex items-center gap-1.5 text-text underline decoration-border-subtle underline-offset-4 hover:decoration-text transition-colors"
                >
                    Resume ↓
                </a>
            </p>
        </section>
    );
}