
import { Typewriter } from "@/components/ui/typewriter";
import { Separator } from "@/components/ui/separator";
import { Tilt } from "@/components/ui/tilt";

import profile from "@/assets/images/profile.webp";
import { Spotlight } from "@/components/ui/spotlight";

const App = () => {
  return (
    <div className="text-center bg-[##fefbf1]">
      <header className="flex items-center justify-center text-black">
      </header>
      <div className="flex min-h-screen flex-col items-center justify-center text-black">
        <Typewriter
          text={["Jen Yang Koh.", "辜振洋.", "Andy Koh."]}
          speed={100}
          delay={10000}
          loop={true}
          className="text-5xl font-medium"
        />
        <Separator orientation="horizontal" className="m-4" />
        <p>Hello! 👋</p>
        <Tilt rotationFactor={8} isRevese>
          <div
            className="flex flex-col items-center relative border-[4px] rounded-xl p-2 bg-white border-black"
          >
            <Spotlight className='bg-white blur-2xl'
              size={64}
              springOptions={{
                bounce: 0.3,
                duration: 0.1,
              }}></Spotlight>
            <div id="cutout"
              className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[25px] rounded-[25px] bg-black"
            />
            <img
              className="w-72 aspect-auto mt-8"
              src={profile}
              alt="Image of Jen Yang Koh"
            />
            <div className="backdrop-blur-sm px-4 py-4">
              <h1 className="text-2xl">Jen Yang Koh</h1>
              <div className="w-full flex flex-col items-start">
                <div className="mb-1 flex flex-col items-start">
                  <h2>Languages:</h2>
                  <div className="icon-list">
                    <i className="devicon-typescript-plain text-2xl px-1" title="Typescript" />
                    <i className="devicon-javascript-plain text-2xl px-1" title="Javascript" />
                    <i className="devicon-solidity-plain text-2xl px-1" title="Solidity" />
                    <i className="devicon-csharp-plain text-2xl px-1" title="C#" />
                    <i className="devicon-python-plain text-2xl px-1" title="Python" />
                  </div>
                </div>
                <div className="mb-1 flex flex-col items-start">
                  <h2>Libraries:</h2>
                  <div className="icon-list">
                    <i className="devicon-microsoftsqlserver-plain text-2xl px-1" title="PostgreSQL" />
                    <i className="devicon-angularjs-plain text-2xl px-1" title="Angular" />
                    <i className="devicon-svelte-plain text-2xl px-1" title="Svelte" />
                    <i className="devicon-tailwindcss-plain text-2xl px-1" title="Tailwind CSS" />
                    <i className="devicon-d3js-plain text-2xl px-1" title="D3" />
                    <i className="devicon-dotnetcore-plain text-2xl px-1" title=".NET Core" />
                  </div>
                </div>
                <div className="mb-1 flex flex-col items-start">
                  <h2>Platforms:</h2>
                  <div className="icon-list">
                    <i className="devicon-azure-plain text-2xl px-1" title="Azure" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="mt-4 font-barcode text-3xl sm:text-5xl">jenyangk.github.io</h1>
              </div>
            </div>
          </div>
        </Tilt>
        <Separator orientation="horizontal" className="m-4" />
        <p>About Me</p>
      </div>
      <footer className="flex items-center justify-between text-black px-8">
        <p>©2025</p>
        <p
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer hover:opacity-70"
        >
          Back to top ↑
        </p>
      </footer>
    </div>
  );
};

export default App;
