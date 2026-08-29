import { useCallback, useEffect, useRef, useState } from "react";

import { AsciiCanvas } from "@/components/ascii-canvas";
import { StickyHeader } from "@/components/terminal-header";
import { KaomojiMascotRef, KaomojiMood } from "@/components/kaomoji-mascot";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Reading } from "@/components/sections/reading";
import { Contact } from "@/components/sections/contact";

const SECTIONS = ["about", "experience", "projects", "contact"] as const;

const MOOD_BY_SECTION: Record<(typeof SECTIONS)[number], KaomojiMood> = {
  about: "default",
  experience: "work",
  projects: "projects",
  contact: "thinking",
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const mascotRef = useRef<KaomojiMascotRef>(null);

  // Scroll spy: last section whose top has crossed the header line
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const scrollY = window.scrollY;
      let current: string | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop - 96 <= scrollY) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const mascotMood: KaomojiMood =
    activeSection && activeSection in MOOD_BY_SECTION
      ? MOOD_BY_SECTION[activeSection as (typeof SECTIONS)[number]]
      : "default";

  return (
    <div className="min-h-screen bg-bg text-text">
      <AsciiCanvas />
      <StickyHeader activeSection={activeSection} onNavigate={scrollTo} />

      <main className="relative z-10 mx-auto max-w-2xl px-4">
        <Hero mascotRef={mascotRef} mood={mascotMood} />
        <About />
        <Experience />
        <Projects />
        <Reading />
        <Contact mascotRef={mascotRef} />

        <footer className="flex items-center justify-between border-t border-border-subtle pb-10 pt-6 text-text-muted">
          <p className="font-mono text-[10px]">© 2026 Andy Koh</p>
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="font-mono text-[10px] transition-colors hover:text-text cursor-pointer"
          >
            Back to top ↑
          </button>
        </footer>
      </main>
    </div>
  );
}