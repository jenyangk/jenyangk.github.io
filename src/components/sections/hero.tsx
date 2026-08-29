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
                I build systems where correctness matters. Interested in fintech.
            </p>
            <p className="mt-6 font-mono text-xs text-text-muted">
                Edmonton, Canada · Open to Singapore
            </p>
        </section>
    );
}