import { Calendar } from "lucide-react";
import latium from "@/assets/images/latium.png";
import pcl from "@/assets/images/pcl.svg";
import sunway from "@/assets/images/sunway.webp";

interface ExperienceItem {
  company: string;
  title: string;
  period: string;
  description: string;
  logo: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Latium Technologies",
    title: "Software Developer",
    period: "September 2022 – Present",
    description:
      "I joined Latium as they were scaling up their IoT platform for construction sites — think cameras, sensors, and real-time monitoring all talking to each other in the middle of a dusty building site. I ended up owning a bunch of different pieces: I built the JSI mobile app in .NET MAUI from scratch, and within a few months mobile adoption jumped 92% because foremen could finally check their sites without lugging a laptop around. I also rebuilt our data pipelines, cutting infrastructure costs by 90% by stripping out redundant services and consolidating everything through Azure Event Hubs and Functions. On the DevOps side, I got our deployment success rate up to 95% after hunting down some nasty race conditions in our Helm charts. Probably the most fun project was an algorithmic camera positioning tool — instead of engineers manually guessing where to mount 20+ cameras, I wrote a spatial coverage algorithm that figured it out automatically, halving installation time. These days I'm also deep in streaming optimization, shaving 30% off end-to-end latency by partitioning queues by device priority.",
    logo: latium,
  },
  {
    company: "PCL Construction",
    title: "Software Developer",
    period: "October 2021 – September 2022",
    description:
      "This was my first real software role after pivoting from IT support, and PCL threw me straight into the deep end. I was the only developer on a monitoring dashboard project that tracked equipment health across job sites — React frontend, .NET Core backend, the whole stack. I also got to lead development on a mobile app for safety inspections, which meant learning mobile development on the fly while coordinating with superintendents who had very strong opinions about what 'simple' meant. Between writing code, I was still the go-to person for anything infrastructure-related from my previous role, so I got pretty good at context-switching between debugging a WebSocket connection and explaining to someone why their printer wasn't working.",
    logo: pcl,
  },
  {
    company: "PCL Construction",
    title: "Construction Technology Analyst",
    period: "June 2021 – October 2021",
    description:
      "I started at PCL doing IT support for their main Edmonton campus, but I kept writing scripts to automate the boring stuff — patching, backups, user provisioning. My PowerShell scripts ended up cutting 20% off our manual labor hours, which caught the attention of the software team. That four-month stint basically became my informal internship: I'd fix printers in the morning, then sit in on architecture reviews in the afternoon. It taught me that the best way to move into development is to solve real problems for real people, even if your official title says 'IT support.'",
    logo: pcl,
  },
  {
    company: "Sunway University",
    title: "Research Assistant",
    period: "2017",
    description:
      "My first taste of research — I spent a year at Sunway exploring how haptic feedback could make AR interfaces feel more tangible. We were building glove prototypes with vibration motors and trying to sync them with HoloLens visualizations. It was equal parts soldering circuits at 2am and reading papers on human perception. I also got to tinker with early IoT setups, connecting temperature and motion sensors to Raspberry Pi boards. None of it ever shipped as a product, but it gave me a lasting appreciation for hardware-software boundaries and the patience required to debug something you can't just console.log.",
    logo: sunway,
  },
];

export function ExperienceAttachment() {
  return (
    <div className="space-y-5">
      {experiences.map((exp, i) => (
        <div key={i} className="relative pl-4 border-l border-archivist/30">
          <div className="flex items-start gap-3">
            <img
              src={exp.logo}
              alt=""
              className="w-9 h-9 object-contain flex-shrink-0 mt-0.5"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-base font-semibold text-text">
                {exp.company}
              </h4>
              <p className="text-sm text-text-muted mt-0.5">{exp.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 text-text-muted">
            <Calendar className="w-3 h-3" />
            <span className="text-xs font-mono">{exp.period}</span>
          </div>
          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            {exp.description}
          </p>
        </div>
      ))}
    </div>
  );
}
