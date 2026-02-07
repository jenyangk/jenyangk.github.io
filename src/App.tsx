import { useState } from "react";
import {
  TypeScript, JavaScript, React as ReactIcon, NextJs,
  TailwindCSS, Supabase, PostgreSQL, MaterialUI, Django, Python, Solidity,
  ThreeJs
} from "developer-icons";
import { motion } from "framer-motion";

import { Typewriter } from "@/components/ui/typewriter";
import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { BentoGrid, BentoCard, BentoCardHighlight } from "@/components/ui/bento-grid";
import { Toolkit } from "@/components/toolkit";

import profile from "@/assets/images/profile.webp";
import resume from "@/assets/Resume.pdf";
import pcl from "@/assets/images/pcl.svg";
import sunway from "@/assets/images/sunway.webp";
import doudou from "@/assets/images/doudou.webp";
import seoer from "@/assets/images/seoer.webp";
import akogare from "@/assets/images/akogare.webp";
import ghostchild from "@/assets/images/ghostchild.gif";
import cybots from "@/assets/images/cybots.webp";
import waving_hand from "@/assets/images/waving-hand.png";
import canada from "@/assets/images/canada.webp";
import malaysia from "@/assets/images/malaysia.webp";

import { GlobeIcon, ChevronRight, ExternalLink, BookOpen, Github } from "lucide-react";

const App = () => {
  const spotlightSpringOptions = {
    bounce: 0.3,
    duration: 0.1
  };

  const [showPclDevDesc, setShowPclDevDesc] = useState(false);
  const [showPclAnalystDesc, setShowPclAnalystDesc] = useState(false);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="bg-bg text-text min-h-screen transition-colors duration-300">
        {/* Fixed Controls */}
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>

        {/* Mobile Nav */}
        <header className="flex items-center justify-center text-text px-8 py-4 gap-4 lg:hidden border-b border-border">
          <a href="#experience" className="font-mono text-sm uppercase tracking-tight hover:underline">Experience</a>
          <a href="#projects" className="font-mono text-sm uppercase tracking-tight hover:underline">Projects</a>
          <a href="#toolkit" className="font-mono text-sm uppercase tracking-tight hover:underline">Toolkit</a>
        </header>

        <h1 className="sr-only">Jen Yang Koh - Software Engineer</h1>

        {/* Main Content */}
        <main className="px-4 py-8 lg:py-16">
          <BentoGrid className="gap-4">

            {/* Hero Card - The "ID Badge" */}
            <BentoCard colSpan={1} rowSpan={1} className="flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex gap-2 items-center mb-4"
              >
                <span className="text-3xl font-bold">Hi, I'm Andy</span>
                <img src={waving_hand} alt="Waving Hand" className="w-7 h-7" />
              </motion.div>

              <Tilt rotationFactor={6} isRevese>
                <div className="flex flex-col items-center relative border-2 p-2 bg-bw border-border w-full max-w-xs mx-auto">
                  <Spotlight
                    className='from-zinc-50 via-zinc-100 to-zinc-200 blur-2xl dark:from-zinc-800 dark:via-zinc-900 dark:to-black'
                    size={64}
                    springOptions={spotlightSpringOptions}
                  />
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black dark:bg-white opacity-80" />

                  <img
                    width="200"
                    className="w-48 aspect-auto mt-6"
                    src={profile}
                    alt="Image of Jen Yang Koh"
                  />

                  <div className="px-3 py-3 w-full">
                    <div className="my-3 text-center">
                      <Typewriter
                        text={["Jen Yang Koh", "辜振洋", "Andy Koh"]}
                        speed={100}
                        delay={13000}
                        loop={true}
                        className="text-2xl font-bold"
                      />
                      <Typewriter
                        text={[
                          "Software Engineer",
                          "Professional Bug Creator",
                          "Senior Googling Engineer"
                        ]}
                        speed={100}
                        delay={10000}
                        loop={true}
                        className="text-sm text-zinc-600 dark:text-zinc-400"
                      />
                      <div className="flex gap-2 items-center justify-center mt-2">
                        <img src={canada} alt="Canada Flag" className="w-5" />
                        <img src={malaysia} alt="Malaysia Flag" className="w-5" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-barcode text-3xl text-center">jenyangk.github.io</h2>
                    </div>
                  </div>
                </div>
              </Tilt>

              {/* Social Links */}
              <div className="flex gap-4 mt-6 text-sm font-mono">
                <a href="https://github.com/jenyangk" className="flex items-center gap-1 hover:underline">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/jenyangkoh/" className="flex items-center gap-1 hover:underline">
                  <ExternalLink className="w-4 h-4" /> LinkedIn
                </a>
                <a href={resume} className="flex items-center gap-1 hover:underline">
                  Résumé
                </a>
              </div>
            </BentoCard>

            {/* The Manifesto Card */}
            <BentoCardHighlight colSpan={2}>
              <h2 className="font-mono text-base uppercase tracking-tight opacity-60 mb-3">// About</h2>
              <p className="text-2xl lg:text-3xl font-bold leading-relaxed">
                I build software that works.
              </p>
              <p className="mt-4 text-lg opacity-80 leading-relaxed">
                I don't stress too much about labels like "frontend" or "backend."
                If a button needs to be clicked, I'll design it. If that button needs to save data, I'll write the API.
                I just want to build the whole thing right.
              </p>
            </BentoCardHighlight>

            {/* Toolkit Card */}
            <BentoCard colSpan={2} id="toolkit">
              <Toolkit />
            </BentoCard>

            {/* Experience: PCL */}
            <BentoCard colSpan={1} id="experience">
              <div className="flex items-start gap-4">
                <img width="56" height="56" src={pcl} alt="PCL Construction" className="w-14 h-14 object-contain flex-shrink-0" />
                <div className="text-left">
                  <div
                    className="group flex items-center gap-1 cursor-pointer"
                    onClick={() => setShowPclDevDesc(!showPclDevDesc)}
                    aria-expanded={showPclDevDesc}
                  >
                    <h3 className="font-bold">Software Developer</h3>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showPclDevDesc ? 'rotate-90' : ''}`} />
                  </div>
                  <p className="text-base text-zinc-500">PCL Construction · 2021 – Present</p>
                  <p className="text-base mt-1">IoT, Microservices, Mobile & Web</p>
                  <div className={`mt-2 text-base text-zinc-600 dark:text-zinc-400 transition-all duration-200 overflow-hidden ${showPclDevDesc ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    Built monitoring systems, automated workflows, and led mobile/web app development.
                    Worked across the stack—from cloud infrastructure to user interfaces.
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Experience: PCL Analyst */}
            <BentoCard colSpan={1}>
              <div className="flex items-start gap-4">
                <img width="56" height="56" src={pcl} alt="PCL Construction" className="w-14 h-14 object-contain flex-shrink-0" />
                <div className="text-left">
                  <div
                    className="group flex items-center gap-1 cursor-pointer"
                    onClick={() => setShowPclAnalystDesc(!showPclAnalystDesc)}
                    aria-expanded={showPclAnalystDesc}
                  >
                    <h3 className="font-bold">Tech Analyst</h3>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showPclAnalystDesc ? 'rotate-90' : ''}`} />
                  </div>
                  <p className="text-base text-zinc-500">PCL Construction · 2021</p>
                  <p className="text-base mt-1">System Administration</p>
                  <div className={`mt-2 text-base text-zinc-600 dark:text-zinc-400 transition-all duration-200 overflow-hidden ${showPclAnalystDesc ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    Managed campus-wide tech upgrades. Automated data tasks with PowerShell.
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Experience: Sunway */}
            <BentoCard colSpan={1}>
              <div className="flex items-start gap-4">
                <img width="56" height="56" src={sunway} alt="Sunway University" className="w-14 h-14 object-contain flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-bold text-lg">Research Assistant</h3>
                  <p className="text-base text-zinc-500">Sunway University · 2017</p>
                  <p className="text-base mt-1">Haptic Technology, AR, IoT</p>
                  <div className="flex gap-2 mt-2">
                    <ThreeJs size={18} />
                    <JavaScript size={18} />
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Project: DouDou */}
            <BentoCard colSpan={2} id="projects">
              <div className="flex items-start gap-3 mb-3">
                <img width="28" height="28" src={doudou} alt="DouDou App" className="w-7 h-7 object-contain" />
                <div>
                  <h3 className="font-bold text-lg">DouDou</h3>
                  <p className="text-sm text-zinc-500">Photo voting app · 2024 – Present</p>
                </div>
              </div>
              <p className="text-left text-base leading-relaxed">
                My friends and I couldn't agree on group photos. So I built an app for it.
                The tricky part was making votes update instantly for everyone—solved it with Supabase's real-time subscriptions.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <ReactIcon size={20} />
                <NextJs size={20} />
                <TypeScript size={20} />
                <TailwindCSS size={20} />
                <Supabase size={20} />
              </div>
              <div className="flex justify-end mt-4 pt-3 border-t border-border">
                <a href="https://doudou.muniee.com/" className="flex items-center gap-1 px-3 py-1 bg-blank text-bw text-sm font-mono hover:opacity-80 transition-opacity">
                  <GlobeIcon className="w-3 h-3" /> See it live
                </a>
              </div>
            </BentoCard>

            {/* Project: SE-OER */}
            <BentoCard colSpan={1}>
              <div className="flex items-start gap-3 mb-3">
                <img width="24" height="24" src={seoer} alt="SE-OER App" className="w-6 h-6 object-contain" />
                <div>
                  <h3 className="font-bold">SE-OER</h3>
                  <p className="text-xs text-zinc-500">Educational Tool · 2020</p>
                </div>
              </div>
              <p className="text-left text-base leading-relaxed">
                A flashcard-style quiz app for Software Engineering students. Built the full stack: Django backend, React frontend, PostgreSQL database.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <ReactIcon size={18} />
                <Django size={18} />
                <Python size={18} />
                <PostgreSQL size={18} />
                <MaterialUI size={18} />
              </div>
              <div className="flex justify-end mt-3 pt-2 border-t border-border">
                <a href="https://ualberta-cmput401.github.io/SE-OER/" className="flex items-center gap-1 text-xs font-mono hover:underline">
                  <Github className="w-3 h-3" /> Source
                </a>
              </div>
            </BentoCard>

            {/* Web3 Experiments Block */}
            <BentoCard colSpan={2}>
              <h3 className="font-mono text-base uppercase tracking-tight mb-3">Web3 Experiments</h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4 text-left">
                Lead contract developer for several NFT collections. Wrote gas-optimized ERC721A contracts.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <a href="https://opensea.io/collection/ghostchildbones" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 border border-border hover:bg-main transition-colors">
                  <img src={ghostchild} alt="Ghost Child" className="w-6 h-6 rounded-full" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Ghost Child</p>
                    <p className="text-xs text-zinc-500">1259 ETH</p>
                  </div>
                </a>
                <a href="https://opensea.io/collection/edgerunner-pass" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 border border-border hover:bg-main transition-colors">
                  <img src={akogare} alt="Akogare" className="w-6 h-6 rounded-full" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Edgerunner</p>
                    <p className="text-xs text-zinc-500">14.5 ETH</p>
                  </div>
                </a>
                <a href="https://opensea.io/collection/cybotsnft" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 border border-border hover:bg-main transition-colors">
                  <img src={cybots} alt="Cybots" className="w-6 h-6 rounded-full" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Cybots</p>
                    <p className="text-xs text-zinc-500">0.58 ETH</p>
                  </div>
                </a>
              </div>
              <div className="flex gap-2 mt-3">
                <Solidity size={18} />
                <span className="text-xs font-mono bg-main border border-border px-2 py-0.5">ERC721A</span>
              </div>
            </BentoCard>

            {/* Currently Reading */}
            <BentoCard colSpan={1}>
              <h3 className="font-mono text-base uppercase tracking-tight mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Reading
              </h3>
              <div className="flex flex-col gap-3 text-left">
                <a href="https://learning.oreilly.com/library/view/ai-engineering/9781098166298/" className="text-base hover:underline">AI Engineering</a>
                <a href="https://learning.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/" className="text-base hover:underline">Designing Data-Intensive Applications</a>
                <a href="https://www.wiley.com/en-ca/Algorithmic+Trading" className="text-base hover:underline">Algorithmic Trading</a>
              </div>
            </BentoCard>

          </BentoGrid>
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between text-text px-8 py-4 border-t border-border">
          <p className="font-mono text-sm">©2026</p>
          <p
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer hover:underline font-mono text-sm lg:hidden"
          >
            Back to top ↑
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
