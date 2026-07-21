import { Calendar } from "lucide-react";
import latium from "@/assets/images/latium.png";
import pcl from "@/assets/images/pcl.svg";

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
    title: "Software Engineer",
    period: "September 2022 – Present",
    description:
      "I joined Latium to scale their IoT platform for construction sites — cameras, sensors, and real-time monitoring all talking to each other across 100+ active sites. As one of two full-stack engineers on a cross-functional team, I've owned pieces end-to-end, from frontend through backend and cloud infrastructure. I led development of the mobile app in .NET MAUI from scratch, now used daily by field crews with icon-first navigation built for low-literacy environments. I halved per-site implementation time from 4 hours to 2 by writing a least-squares plane fit with RBF interpolation to compute tilt from calibration data, deployed across 100+ sites. On the web side, I delivered camera livestreaming and PTZ control for 200+ cameras at ~5s latency, eliminating on-site physical access for camera operation. Lately I've been deep in performance and platform work — cutting sensor-to-camera trigger latency from 5-30s down to 1-2s with priority queueing and device-based partitioning, and re-architecting the active-alarms API against a billion-row telemetry table to drop response time by an order of magnitude. The most fun has been architecting a smart edge computing platform in Go on ARM gateway hardware — LoRaWAN sensors, local rule evaluation with state-machine safeguards, real-time PTZ dispatch over a WireGuard mesh, backed by NATS JetStream, PostgreSQL, VictoriaMetrics, Loki, and Grafana. I integrated YOLO object detection on an on-device NPU as a motion-verification filter that suppresses false-positive camera dispatch. I also defined feature-branching as the team's source-control standard and now lead epic breakdown, task estimation, and production deployment.",
    logo: latium,
  },
  {
    company: "PCL Construction",
    title: "Software Developer",
    period: "June 2021 – September 2022",
    description:
      "My first real software role after pivoting from IT support. I was the sole developer on a platform-performance monitoring tool for their IoT platform — React frontend, .NET Core backend, the whole stack. I also extended the platform with follow-up reminder notifications (email, SMS, Teams) that kept site teams from missing time-sensitive alarms across 100+ sites, and reduced latest-telemetry lookup latency for the customer-facing portal by adding a targeted index on the telemetry table. This is where I first learned the platform inside-out before moving to Latium to lead it end-to-end.",
    logo: pcl,
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
