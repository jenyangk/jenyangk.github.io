import { ExternalLink, Github, Globe } from "lucide-react";

function EthLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.925 23.96L8 19.1l7.925 12.38 7.924-12.38-7.924 4.86z"
        fill="#627EEA"
      />
      <path d="M15.925 2L8 17.18l7.925-4.86 7.924 4.86L15.925 2z" fill="#627EEA" opacity="0.6" />
      <path d="M15.925 12.32L8 17.18l7.925 4.86 7.924-4.86-7.924-4.86z" fill="#627EEA" opacity="0.8" />
    </svg>
  );
}
import doudou from "@/assets/images/doudou.webp";
import ghostchild from "@/assets/images/ghostchild.gif";
import akogare from "@/assets/images/akogare.webp";
import cybots from "@/assets/images/cybots.webp";
import seoer from "@/assets/images/seoer.webp";

interface Project {
  name: string;
  period: string;
  description: string;
  tech: string[];
  links?: { label: string; url: string; icon: "globe" | "github" }[];
  image?: string;
}

const projects: Project[] = [
  {
    name: "DouDou",
    period: "Oct 2024 – Present",
    description:
      "Developed an interactive photo voting app with a multi-phase workflow for users to join sessions, submit photos, and vote on submissions in real-time.",
    tech: ["React", "TailwindCSS", "ShadCN", "Supabase", "S3"],
    links: [
      { label: "See it live", url: "https://doudou.muniee.com/", icon: "globe" },
    ],
    image: doudou,
  },
  {
    name: "SE-OER",
    period: "January 2020 – May 2020",
    description:
      "Led a team of 4 in developing a collaborative web app for Software Engineering quizzes, enabling users to create, customize, and self-assess on topic-specific questions.",
    tech: ["React", "Material-UI", "Django", "PostgreSQL"],
    links: [
      {
        label: "Source",
        url: "https://ualberta-cmput401.github.io/SE-OER/",
        icon: "github",
      },
    ],
    image: seoer,
  },
  {
    name: "Web3 Experiments",
    period: "2021 – 2022",
    description:
      "Lead contract developer for several NFT collections. Wrote gas-optimized ERC721A contracts deployed to Ethereum mainnet.",
    tech: ["Solidity", "ERC721A", "Hardhat"],
    links: [
      {
        label: "Ghost Child",
        url: "https://opensea.io/collection/ghostchildbones",
        icon: "globe",
      },
      {
        label: "Edgerunner",
        url: "https://opensea.io/collection/edgerunner-pass",
        icon: "globe",
      },
      {
        label: "Cybots",
        url: "https://opensea.io/collection/cybotsnft",
        icon: "globe",
      },
    ],
  },
];

export function ProjectAttachment() {
  return (
    <div className="space-y-5">
      {projects.map((project, i) => (
        <div key={i} className="group">
          <div className="flex items-start gap-3">
            {project.image ? (
              <img
                src={project.image}
                alt=""
                className="w-10 h-10 object-contain rounded border border-border-subtle flex-shrink-0 mt-0.5"
                loading="lazy"
              />
            ) : project.name === "Web3 Experiments" ? (
              <EthLogo className="w-10 h-10 flex-shrink-0 mt-0.5" />
            ) : null}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-serif text-base font-semibold text-text">
                  {project.name}
                </h4>
                <span className="text-xs font-mono text-text-muted flex-shrink-0">
                  {project.period}
                </span>
              </div>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                {project.description}
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-mono border border-border-subtle text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              {project.links && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-builder hover:opacity-70 transition-opacity"
                    >
                      {link.icon === "globe" ? (
                        <Globe className="w-3 h-3" />
                      ) : (
                        <Github className="w-3 h-3" />
                      )}
                      {link.label}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Web3 mini gallery */}
      <div className="flex items-center gap-3 pt-2 border-t border-border-subtle">
        <img
          src={ghostchild}
          alt=""
          className="w-8 h-8 rounded-full border border-border-subtle"
          loading="lazy"
        />
        <img
          src={akogare}
          alt=""
          className="w-8 h-8 rounded-full border border-border-subtle"
          loading="lazy"
        />
        <img
          src={cybots}
          alt=""
          className="w-8 h-8 rounded-full border border-border-subtle"
          loading="lazy"
        />
        <span className="text-xs font-mono text-text-muted">
          3 collections · 1,274+ ETH volume
        </span>
      </div>
    </div>
  );
}
