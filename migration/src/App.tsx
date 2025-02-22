
import { Typewriter } from "@/components/ui/typewriter";
import { Separator } from "@/components/ui/separator";

const App = () => {
  return (
    <div className="text-center bg-[##fefbf1]">
      <header className="flex items-center justify-center text-black">
      </header>
      <div className="flex min-h-screen flex-col items-center justify-center text-black">
        <Typewriter
          text={["Jen Yang Koh.", "辜振洋."]}
          speed={100}
          delay={10000}
          loop={true}
          className="text-5xl font-medium"
        />
        <Separator orientation="horizontal" className="m-4" />
        <p>About Me</p>
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
