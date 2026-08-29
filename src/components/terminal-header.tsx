import { ModeToggle } from "@/components/mode-toggle";

export interface StickyHeaderProps {
    activeSection: string | null;
    onNavigate: (id: string) => void;
}

const NAV_LINKS = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
];

export function StickyHeader({ activeSection, onNavigate }: StickyHeaderProps) {
    return (
        <header
            className="fixed top-0 left-0 right-0 z-40 border-b border-border-subtle"
            style={{ backgroundColor: "var(--header-bg)", backdropFilter: "blur(8px)" }}
        >
            <div className="mx-auto flex h-14 max-w-2xl items-center px-4">
                <nav
                    className="flex items-center gap-2.5 sm:gap-5"
                    aria-label="Main"
                >
                    {NAV_LINKS.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate(id);
                            }}
                            aria-current={activeSection === id ? "true" : undefined}
                            className={`relative whitespace-nowrap font-mono text-[11px] sm:text-xs pb-1 transition-colors cursor-pointer ${
                                activeSection === id
                                    ? "text-text"
                                    : "text-text-muted hover:text-text"
                            }`}
                        >
                            {label}
                            <span
                                aria-hidden="true"
                                className={`absolute left-0 right-0 bottom-0 h-px bg-accent transition-opacity duration-200 ${
                                    activeSection === id ? "opacity-100" : "opacity-0"
                                }`}
                            />
                        </a>
                    ))}
                </nav>

                <div className="ml-auto flex items-center">
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}