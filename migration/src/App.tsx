import { TypeScript, JavaScript, CSharp, Go, Python, Angular, React, NextJs, TailwindCSS, Firebase, Azure, Xamarin } from "developer-icons"

import { Typewriter } from "@/components/ui/typewriter";
import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";

import profile from "@/assets/images/profile.webp";
import resume from "@/assets/Resume.pdf";

const App = () => {
  const spotlightSpringOptions = {
    bounce: 0.3,
    duration: 0.1
  };

  return (
    <div className="text-center bg-[#fefbf1] grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header className="flex items-center justify-center text-black px-8 py-4 gap-4">
        <a href="" className="hover:underline">Work</a>
        <a href="" className="hover:underline">Projects</a>
      </header>
      <div className="flex flex-col items-center justify-center text-black">
        <p className="py-4">Hello! 👋</p>
        <Tilt rotationFactor={8} isRevese>
          <div
            className="flex flex-col items-center relative border-[4px] rounded-xl p-2 bg-white border-black"
          >
            <Spotlight className='bg-white blur-2xl'
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
      <footer className="flex items-center justify-between text-black px-8 py-2">
        <p>©2025</p>
        <p
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer hover:underline"
        >
          Back to top ↑
        </p>
      </footer>
    </div >
  );
};

export default App;
