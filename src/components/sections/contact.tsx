import { useCallback, useEffect, useRef, useState } from "react";
import { Copy, Check, Github, Linkedin } from "lucide-react";
import type { KaomojiMascotRef } from "@/components/kaomoji-mascot";

const EMAIL = "jenyang.koh@gmail.com";

interface ContactProps {
    mascotRef: React.RefObject<KaomojiMascotRef | null>;
}

export function Contact({ mascotRef }: ContactProps) {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        },
        [],
    );

    const copyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
        } catch {
            // Fallback for non-secure contexts
            const ta = document.createElement("textarea");
            ta.value = EMAIL;
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand("copy");
            document.body.removeChild(ta);
            if (!ok) return;
        }
        setCopied(true);
        mascotRef.current?.celebrate();
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), 2000);
    }, [mascotRef]);

    return (
        <section id="contact" className="mb-24 scroll-mt-20">
            <h2 className="font-serif text-2xl font-bold text-text mb-4">
                Say hello
            </h2>
            <p className="max-w-[65ch] text-base text-text-muted leading-relaxed">
                Open to interesting work in fintech, Canada or Singapore.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                    href={`mailto:${EMAIL}`}
                    className="font-mono text-sm text-text underline decoration-border-subtle underline-offset-4 hover:decoration-text transition-colors"
                >
                    {EMAIL}
                </a>
                <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="inline-flex h-7 w-7 items-center justify-center border border-border-subtle text-text-muted hover:text-text transition-colors cursor-pointer"
                >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <span
                    aria-live="polite"
                    className={`font-mono text-xs text-accent-strong transition-opacity duration-200 ${
                        copied ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {copied ? "copied (⌐■_■)ノ♪" : ""}
                </span>
            </div>

            <div className="mt-6 flex gap-5">
                <a
                    href="https://github.com/jenyangk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-text transition-colors"
                >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/jenyangkoh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-text transition-colors"
                >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                </a>
            </div>
        </section>
    );
}