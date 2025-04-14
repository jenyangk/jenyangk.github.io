import { TypeScript, JavaScript, CSharp, Go, Python, Angular, React, NextJs, TailwindCSS, Firebase, Azure, Xamarin, PowerShell, ThreeJs, Supabase, PostgreSQL, MaterialUI, Django } from "developer-icons"

import { Typewriter } from "@/components/ui/typewriter";
import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";

import profile from "@/assets/images/profile.webp";
import resume from "@/assets/Resume.pdf";
import pcl from "@/assets/images/pcl.svg";
import sunway from "@/assets/images/sunway.png";
import doudou from "@/assets/images/doudou.png";
import seoer from "@/assets/images/seoer.png";
import { GlobeIcon } from "lucide-react";

const App = () => {
  const spotlightSpringOptions = {
    bounce: 0.3,
    duration: 0.1
  };

  return (
    <div className="text-center bg-[#fefbf1] grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header className="flex items-center justify-center text-black px-8 py-4 gap-4 lg:hidden">
        <a href="#experience" className="hover:underline">Experience</a>
        <a href="#projects" className="hover:underline">Projects</a>
        <a href="#contributions" className="hover:underline">Contributions</a>
      </header>
      <h1 className="hidden">Jen Yang Koh</h1>
      <div className="grid lg:grid-cols-2 gap-8 items-start justify-center text-black px-4 lg:px-8 py-4 lg:place-self-center">
        <div className="flex flex-col items-center justify-start w-full lg:sticky lg:top-8">
          <p className="py-4 text-4xl font-extrabold">Hi, I'm Andy 👋</p>
          <Tilt rotationFactor={8} isRevese>
            <div
              className="flex flex-col items-center relative border-[4px] rounded-xl p-2 bg-white border-black w-full max-w-md mx-auto"
            >
              <Spotlight className='bg-ite blur-2xl'
                size={64}
                springOptions={spotlightSpringOptions}></Spotlight>
              <div id="cutout" className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[25px] rounded-[25px] bg-black"></div>
              <p className="pt-8">[insert company logo]</p>
              <img
                className="w-72 aspect-auto"
                src={profile}
                alt="Image of Jen Yang Koh"
              />
              <div className="backdrop-blur-sm px-4 py-4">
                <div className="my-4">
                  <div>
                    <Typewriter
                      text={["Jen Yang Koh", "辜振洋", "Andy Koh"]}
                      speed={100}
                      delay={13000}
                      loop={true}
                      className="text-3xl font-medium"
                    />
                  </div>
                  <div>
                    <Typewriter
                      text={[
                        "Software Engineer",
                        "Professional Bug Creator",
                        "Senior Googling Engineer"
                      ]}
                      speed={100}
                      delay={10000}
                      loop={true}
                      className="text-lg font-medium"
                    />
                  </div>
                  <div className="flex text-sm gap-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 36 36" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet"><path fill="#D52B1E" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h6V5H4zm28 0h-6v26h6a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z" /><path fill="#EEE" d="M10 5h16v26H10z" /><path fill="#D52B1E" d="M18.615 22.113c1.198.139 2.272.264 3.469.401l-.305-1.002a.46.46 0 0 1 .159-.476l3.479-2.834l-.72-.339c-.317-.113-.23-.292-.115-.722l.531-1.936l-2.021.427c-.197.03-.328-.095-.358-.215l-.261-.911l-1.598 1.794c-.227.288-.687.288-.544-.376l.683-3.634l-.917.475c-.257.144-.514.168-.657-.089l-1.265-2.366v.059v-.059l-1.265 2.366c-.144.257-.401.233-.658.089l-.916-.475l.683 3.634c.144.664-.317.664-.544.376l-1.598-1.793l-.26.911c-.03.12-.162.245-.359.215l-2.021-.427l.531 1.936c.113.43.201.609-.116.722l-.72.339l3.479 2.834c.138.107.208.3.158.476l-.305 1.002l3.47-.401c.106 0 .176.059.175.181l-.214 3.704h.956l-.213-3.704c.002-.123.071-.182.177-.182z" /></svg>
                    Edmonton, Alberta
                  </div>
                </div>
                <div className="w-full flex flex-col items-start">
                  <div className="mb-1 flex flex-col items-start">
                    <h2>Languages:</h2>
                    <div className="flex gap-2">
                      <TypeScript size={24} aria-label="TypeScript" xlinkTitle="Typescript"></TypeScript>
                      <JavaScript size={24} aria-label="JavaScript"></JavaScript>
                      <Go size={24} aria-label="Go"></Go>
                      <CSharp size={24} aria-label="CSharp"></CSharp>
                      <Python size={24} aria-label="Python"></Python>
                    </div>
                  </div>
                  <div className="mb-1 flex flex-col items-start">
                    <h2>Stack:</h2>
                    <div className="flex gap-2">
                      <Angular size={24} aria-label="Angular"></Angular>
                      <svg aria-label=".NET" className="w-6 h-6" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#512bd4" d="M-.134-.326h512.002v512.002H-.134z" /><path d="M91.122 326.786c-3.62 0-6.698-1.206-9.232-3.619-2.534-2.475-3.8-5.413-3.8-8.815 0-3.465 1.266-6.434 3.8-8.908 2.534-2.475 5.612-3.712 9.232-3.712 3.68 0 6.787 1.237 9.321 3.712 2.595 2.474 3.892 5.443 3.892 8.908 0 3.402-1.297 6.34-3.892 8.815-2.534 2.413-5.64 3.619-9.321 3.619zM235.844 324.745h-23.532l-61.996-97.807a43.764 43.764 0 01-3.892-7.703h-.543c.483 2.847.724 8.94.724 18.28v87.23h-20.817v-133.07h25.07l59.916 95.487c2.534 3.96 4.163 6.682 4.887 8.166h.362c-.603-3.525-.905-9.495-.905-17.91v-85.743h20.726v133.07zM337.213 324.745h-72.856v-133.07h69.96v18.745h-48.42v37.675h44.62v18.652h-44.62v39.346h51.316v18.652zM440.757 210.42h-37.289v114.325h-21.54V210.42H344.73v-18.745h96.027v18.745z" fill="#fff" /></svg>
                      <Xamarin size={24} aria-label="Xamarin"></Xamarin>
                      <i aria-label="Microsoft SQL Server" className="devicon-microsoftsqlserver-plain colored text-2xl leading-none" title="Microsoft SQL Server"></i>
                      <Azure size={24} aria-label="Azure"></Azure>
                      <React size={24} aria-label="React"></React>
                      <NextJs size={24} aria-label="Next JS"></NextJs>
                      <TailwindCSS size={24} aria-label="Tailwind CSS"></TailwindCSS>
                      <Firebase size={24} aria-label="Firebase"></Firebase>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="mt-4 font-barcode text-3xl sm:text-5xl">jenyangk.github.io</h1>
                </div>
              </div>
            </div>
          </Tilt>
          <div className="flex gap-4 py-8">
            <a href="https://github.com/jenyangk" className="underline">GitHub</a>
            <a href="https://www.linkedin.com/in/jenyangkoh/" className="underline">LinkedIn</a>
            <a href={resume} className="underline">Résumé</a>
            <a href="mailto:jenyang.koh@gmail.com" className="underline">Email</a>
          </div>
        </div>

        {/* Column 2: Experience, Projects, Contributions */}
        <div className="flex flex-col gap-8 items-center lg:items-start w-full">
          <div className="w-full max-w-xl mx-auto lg:mx-0">
            <h2 id="experience" className="text-xl font-semibold mb-4">Experience</h2>
            <div className="flex flex-col gap-8 items-start">
              <div className="flex gap-8 items-center justify-start w-full">
                <div className="flex flex-col items-center flex-shrink-0">
                  <img src={pcl} alt="PCL Construction" className="w-24 h-24 object-contain" />
                </div>
                <div>
                  <div className="flex flex-col items-start text-left">
                    <h3 className="text-lg font-semibold">Software Developer</h3>
                    <p className="text-gray-600">October 2021 - Present</p>
                    <p>IoT, Microservices, Mobile & Web Applications</p>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    <TypeScript size={24} aria-label="TypeScript" xlinkTitle="Typescript"></TypeScript>
                    <JavaScript size={24} aria-label="JavaScript"></JavaScript>
                    <Go size={24} aria-label="Go"></Go>
                    <CSharp size={24} aria-label="CSharp"></CSharp>
                    <Azure size={24} aria-label="Azure"></Azure>
                    <Angular size={24} aria-label="Angular"></Angular>
                    <Xamarin size={24} aria-label="Xamarin"></Xamarin>
                    <svg aria-label=".NET" className="w-6 h-6" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#512bd4" d="M-.134-.326h512.002v512.002H-.134z" /><path d="M91.122 326.786c-3.62 0-6.698-1.206-9.232-3.619-2.534-2.475-3.8-5.413-3.8-8.815 0-3.465 1.266-6.434 3.8-8.908 2.534-2.475 5.612-3.712 9.232-3.712 3.68 0 6.787 1.237 9.321 3.712 2.595 2.474 3.892 5.443 3.892 8.908 0 3.402-1.297 6.34-3.892 8.815-2.534 2.413-5.64 3.619-9.321 3.619zM235.844 324.745h-23.532l-61.996-97.807a43.764 43.764 0 01-3.892-7.703h-.543c.483 2.847.724 8.94.724 18.28v87.23h-20.817v-133.07h25.07l59.916 95.487c2.534 3.96 4.163 6.682 4.887 8.166h.362c-.603-3.525-.905-9.495-.905-17.91v-85.743h20.726v133.07zM337.213 324.745h-72.856v-133.07h69.96v18.745h-48.42v37.675h44.62v18.652h-44.62v39.346h51.316v18.652zM440.757 210.42h-37.289v114.325h-21.54V210.42H344.73v-18.745h96.027v18.745z" fill="#fff" /></svg>
                    <i aria-label="Microsoft SQL Server" className="devicon-microsoftsqlserver-plain colored text-2xl leading-none" title="Microsoft SQL Server"></i>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 items-center justify-start w-full">
                <div className="flex flex-col items-center flex-shrink-0">
                  <img src={pcl} alt="PCL Construction" className="w-24 h-24 object-contain" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <h3 className="text-lg font-semibold">Construction Technology Analyst</h3>
                  <p className="text-gray-600">June 2021 - October 2021</p>
                  <p>System Administrator</p>
                  <div className="flex gap-2 flex-wrap mt-2">
                    <PowerShell size={24} aria-label="PowerShell"></PowerShell>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 items-center justify-start w-full">
                <div className="flex flex-col items-center flex-shrink-0">
                  <img src={sunway} alt="Sunway University" className="w-24 h-24 object-contain" />
                </div>
                <div>
                  <div className="flex flex-col items-start text-left">
                    <h3 className="text-lg font-semibold">Research Assistant</h3>
                    <p className="text-gray-600">June 2017 - December 2017</p>
                    <p>Haptic Technology, Augmented Reality, IoT</p>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    <JavaScript size={24} aria-label="JavaScript"></JavaScript>
                    <ThreeJs size={24} aria-label="ThreeJs"></ThreeJs>
                    <i aria-label="Arduino" className="devicon-arduino-plain colored text-2xl leading-none" title="Arduino"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div id="projects" className="w-full max-w-xl mx-auto lg:mx-0">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="flex flex-col gap-8">
              {/* DouDou Project */}
              <div className="flex flex-col p-4 border border-zinc-200 rounded-md bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <img src={doudou} alt="DouDou App" className="w-6 h-6 object-contain" />
                  <h3 className="text-lg font-semibold">DouDou</h3>
                </div>
                <p className="text-sm mb-4">
                  Developed an interactive photo voting app, allowing users to initiate and manage photo voting sessions,
                  submit photos, and vote on submissions with real-time tracking.
                </p>
                {/* <div className="w-full mb-6">
                  <div className="w-full h-24 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                    <div className="w-32 h-20 bg-gray-300 rounded-md flex items-center justify-center">Thumbnail</div>
                  </div>
                </div> */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <React size={24} aria-label="React"></React>
                  <NextJs size={24} aria-label="Next JS"></NextJs>
                  <TypeScript size={24} aria-label="Typescript"></TypeScript>
                  <TailwindCSS size={24} aria-label="Tailwind CSS"></TailwindCSS>
                  <Supabase size={24} aria-label="Supabase"></Supabase>
                </div>

                {/* Footer: Date range grouped with links */}
                <div className="flex justify-between items-center gap-2 mt-auto pt-4 border-t border-zinc-100">
                  <p className="text-sm text-gray-600">Oct 2024 – Present</p>
                  <a href="https://doudou.muniee.com/" className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-zinc-800 transition-colors">
                    <GlobeIcon className="w-3 h-3"></GlobeIcon> Website
                  </a>
                </div>
              </div>

              {/* SE-OER Project */}
              <div className="flex flex-col p-4 border border-zinc-200 rounded-md bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <img src={seoer} alt="SE-OER App" className="w-6 h-6 object-contain" />
                  <h3 className="text-lg font-semibold">SE-OER</h3>
                </div>
                <p className="text-sm mb-4">
                  Developed a collaborative web application for practicing Software Engineering topics through
                  interactive flashcard-style quizzes, enabling customized study and exam-like conditions.
                </p>
                {/* <div className="w-full mb-6">
                  <div className="w-full h-24 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                    <div className="w-32 h-20 bg-gray-300 rounded-md flex items-center justify-center">Thumbnail</div>
                  </div>
                </div> */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <React size={24} aria-label="React"></React>
                  <MaterialUI size={24} aria-label="MaterialUI"></MaterialUI>
                  <TypeScript size={24} aria-label="Typescript"></TypeScript>
                  <Django size={24} aria-label="Django"></Django>
                  <Python size={24} aria-label="Python"></Python>
                  <PostgreSQL size={24} aria-label="PostgreSQL"></PostgreSQL>
                </div>

                {/* Footer: Date range grouped with links */}
                <div className="flex justify-between items-center gap-2 mt-auto pt-4 border-t border-zinc-100">
                  <p className="text-sm text-gray-600">Jan 2020 – May 2020</p>
                  <a href="https://ualberta-cmput401.github.io/SE-OER/" className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-black rounded-md text-sm hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.417 4.865 20.167 8.84 21.494C9.34 21.583 9.52 21.276 9.52 21.006C9.52 20.764 9.512 20.005 9.508 19.176C6.726 19.794 6.139 17.849 6.139 17.849C5.685 16.688 5.029 16.384 5.029 16.384C4.147 15.765 5.095 15.778 5.095 15.778C6.072 15.841 6.598 16.799 6.598 16.799C7.48 18.35 8.862 17.893 9.54 17.633C9.629 16.977 9.889 16.522 10.175 16.278C7.954 16.031 5.62 15.173 5.62 11.293C5.62 10.17 6.01 9.26 6.618 8.557C6.517 8.302 6.168 7.309 6.713 5.985C6.713 5.985 7.545 5.711 9.496 7.048C10.294 6.819 11.166 6.704 12.034 6.7C12.9 6.704 13.771 6.819 14.571 7.048C16.52 5.711 17.351 5.985 17.351 5.985C17.898 7.309 17.548 8.302 17.447 8.557C18.057 9.26 18.443 10.17 18.443 11.293C18.443 15.182 16.105 16.027 13.876 16.269C14.235 16.573 14.558 17.173 14.558 18.094C14.558 19.415 14.545 20.677 14.545 21.006C14.545 21.279 14.722 21.59 15.232 21.492C19.205 20.163 22.066 16.417 22.066 12C22.066 6.477 17.59 2 12.066 2H12Z" fill="currentColor" />
                    </svg>
                    Source
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contributions Section */}
          <div className="w-full max-w-xl mx-auto lg:mx-0">
            <h2 id="contributions" className="text-xl font-semibold mb-4">Contributions</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col text-left bg-white border border-zinc-200 rounded-md p-3">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-1 text-zinc-500" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg>
                      <div>
                        <a href="https://github.com/actions/runner-images/issues/11683" className="font-medium hover:underline">
                          macOS - 20250226.755 - Missing iOS Platform
                        </a>
                        <div className="text-sm text-zinc-500">
                          <a href="https://github.com/actions/runner-images" className="hover:underline">actions/runner-images</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end min-w-[100px]">
                    <span className="px-2 py-1 text-xs font-medium bg-[#8957e5] text-white rounded-full">closed</span>
                    <div className="text-xs text-zinc-500 mt-1">March 25, 2024</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-left bg-white border border-zinc-200 rounded-md p-3">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-1 text-zinc-500" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg>
                      <div>
                        <a href="https://github.com/actions/runner-images/issues/10200" className="font-medium hover:underline">
                          Significant build time and bundle size for .NET MAUI on iOS
                        </a>
                        <div className="text-sm text-zinc-500">
                          <a href="https://github.com/actions/runner-images" className="hover:underline">actions/runner-images</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end min-w-[100px]">
                    <span className="px-2 py-1 text-xs font-medium bg-[#8957e5] text-white rounded-full">closed</span>
                    <div className="text-xs text-zinc-500 mt-1">July 11, 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-between text-black px-8 py-2">
        <p>©2025</p>
        <p
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer hover:underline lg:hidden"
        >
          Back to top ↑
        </p>
      </footer>
    </div >
  );
};

export default App;
