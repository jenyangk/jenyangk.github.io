import {
  TypeScript, JavaScript, CSharp, Go, Python, Angular, React, NextJs,
  TailwindCSS, Firebase, Azure, Xamarin, PowerShell, ThreeJs, Supabase,
  PostgreSQL, Django, Solidity
} from "developer-icons";
import { motion } from "framer-motion";

interface ToolGroupProps {
  title: string;
  description: string;
  tools: { icon: React.ElementType; name: string }[];
  delay?: number;
}

const ToolGroup = ({ title, description, tools, delay = 0 }: ToolGroupProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay }}
    viewport={{ once: true }}
    className="flex flex-col gap-3"
  >
    <div className="flex items-baseline gap-2">
      <h3 className="font-mono text-base font-bold uppercase tracking-tight">{title}</h3>
      <div className="flex-grow h-px bg-border opacity-30" />
    </div>
    <p className="text-base text-zinc-600 dark:text-zinc-400 mb-2">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <div
          key={tool.name}
          className="group relative flex items-center justify-center p-2 border border-border bg-main hover:bg-bw hover:border-text transition-all duration-100"
          title={tool.name}
        >
          <tool.icon size={20} />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-blank text-bw text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  </motion.div>
);

// .NET icon component
const DotNetIcon = () => (
  <svg aria-label=".NET" className="w-5 h-5" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="#512bd4" d="M-.134-.326h512.002v512.002H-.134z" />
    <path d="M91.122 326.786c-3.62 0-6.698-1.206-9.232-3.619-2.534-2.475-3.8-5.413-3.8-8.815 0-3.465 1.266-6.434 3.8-8.908 2.534-2.475 5.612-3.712 9.232-3.712 3.68 0 6.787 1.237 9.321 3.712 2.595 2.474 3.892 5.443 3.892 8.908 0 3.402-1.297 6.34-3.892 8.815-2.534 2.413-5.64 3.619-9.321 3.619zM235.844 324.745h-23.532l-61.996-97.807a43.764 43.764 0 01-3.892-7.703h-.543c.483 2.847.724 8.94.724 18.28v87.23h-20.817v-133.07h25.07l59.916 95.487c2.534 3.96 4.163 6.682 4.887 8.166h.362c-.603-3.525-.905-9.495-.905-17.91v-85.743h20.726v133.07zM337.213 324.745h-72.856v-133.07h69.96v18.745h-48.42v37.675h44.62v18.652h-44.62v39.346h51.316v18.652zM440.757 210.42h-37.289v114.325h-21.54V210.42H344.73v-18.745h96.027v18.745z" fill="#fff" />
  </svg>
);

// SQL Server icon wrapper
const SqlServerIcon = () => (
  <i className="devicon-microsoftsqlserver-plain colored text-xl leading-none" title="Microsoft SQL Server" />
);

export const Toolkit = () => {
  const toolGroups: ToolGroupProps[] = [
    {
      title: "Heavy Lifting",
      description: "For systems that need to be solid.",
      tools: [
        { icon: CSharp, name: "C#" },
        { icon: () => <DotNetIcon />, name: ".NET" },
        { icon: Go, name: "Go" },
        { icon: () => <SqlServerIcon />, name: "SQL Server" },
        { icon: PostgreSQL, name: "PostgreSQL" },
        { icon: Azure, name: "Azure" },
      ],
    },
    {
      title: "Look & Feel",
      description: "For interfaces that feel good to use.",
      tools: [
        { icon: React, name: "React" },
        { icon: NextJs, name: "Next.js" },
        { icon: Angular, name: "Angular" },
        { icon: TypeScript, name: "TypeScript" },
        { icon: JavaScript, name: "JavaScript" },
        { icon: TailwindCSS, name: "Tailwind CSS" },
        { icon: ThreeJs, name: "Three.js" },
      ],
    },
    {
      title: "Everywhere Else",
      description: "For reaching users on any device.",
      tools: [
        { icon: Xamarin, name: "Xamarin" },
        { icon: Firebase, name: "Firebase" },
        { icon: Supabase, name: "Supabase" },
        { icon: Python, name: "Python" },
        { icon: Django, name: "Django" },
        { icon: PowerShell, name: "PowerShell" },
        { icon: Solidity, name: "Solidity" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline gap-2 mb-2">
        <h2 className="font-mono text-lg font-bold uppercase tracking-tight">My Toolkit</h2>
      </div>
      {toolGroups.map((group, index) => (
        <ToolGroup key={group.title} {...group} delay={index * 0.1} />
      ))}
    </div>
  );
};
