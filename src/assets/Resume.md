# Andy Koh

jenyang.koh@gmail.com | 587-566-9053 | Edmonton, Alberta, Canada

linkedin.com/in/jenyangkoh | github.com/jenyangk | jenyangkoh.com

## Summary

_Software Engineer with 5+ years building full-stack IoT and edge platforms across 100+ active sites, processing terabytes of telemetry daily. Sole technical owner of end-to-end product delivery as one of two engineers, from on-site user discovery through cloud infrastructure. Architected a production edge platform (Go, NATS JetStream, YOLO on NPU) that powers motion-verified camera dispatch across customer sites._

## Experience

**Software Engineer** | Latium Technologies | Sep 2022 - Present

- Owned a customer-facing web + mobile product as one of two full-stack engineers on a cross-functional team across 100+ active construction sites, from frontend through backend and cloud infrastructure
- Halved product implementation and deployment time from 4 hours to 2 hours per site by implementing a least-squares plane fit with RBF interpolation to compute tilt from calibration data, deployed across 100+ sites
- Shipped a concrete-curing sensor integration to field launch through collaboration with the hardware team, running on-site discovery with curing crews and aligning with the sensor vendor, now sustaining ~10 active cures at any given time
- Led development of the mobile app from scratch in .NET MAUI as lead developer, displacing a shelved legacy app since the App Store debut, now used daily with icon-first navigation for low-literacy field environments
- Delivered camera livestreaming and PTZ control in the web client (200+ cameras, ~5s latency), eliminating on-site physical access for camera operation
- Cut sensor-to-camera trigger latency from 5-30s to 1-2s for time-sensitive site security events by splitting telemetry into priority/non-priority queues, with Event Hub auto-scaling and device-based partitioning
- Cut the platform's active-alarms API response time by an order of magnitude for large customers by re-architecting the query plan against a billion-row telemetry table, replacing a correlated scan with a pre-materialized fleet-hierarchy approach and an inline latest-telemetry lookup that eliminated tens of millions of logical reads per query without adding indexes
- Architected and built a smart edge computing platform rolling out to customer sites, running Go services on ARM-based gateway hardware processing LoRaWAN sensor events, evaluating rules locally with state-machine safeguards, and dispatching PTZ camera actions in real-time, backed by NATS JetStream, PostgreSQL, VictoriaMetrics, Loki, and Grafana provisioned as-code
- Connected edge devices into a cross-device mesh over WireGuard with direct-publish NATS dispatch, and integrated YOLO object detection on an on-device NPU as a motion-verification filter that suppresses false-positive PTZ dispatch
- Directed incident response for a platform-wide outage where 100+ sensors went offline for 30 minutes due to a device networking misconfiguration, driving rapid identification, mitigation, and root-cause remediation
- Defined feature-branching as the team's source-control standard, replacing a traditional flow that broke mid-sprint, with branch-protection policies enforced through CI, and now leads epic breakdown, task estimation, and production deployment for feature pushes

**Software Developer** | PCL Construction | Jun 2021 - Sep 2022

- Developed platform-performance monitoring tooling as sole developer (React, .NET Core) for the IoT platform, later led end-to-end at Latium
- Extended the platform with follow-up reminder notifications (email, SMS, Teams) that kept site teams from missing time-sensitive alarms across 100+ sites
- Reduced latest-telemetry lookup latency for the customer-facing portal by adding a targeted index on the telemetry table, lowering query cost for the platform's hottest read path across asset maps, dashboards, and alarm views

## Technical Skills

**Languages:** TypeScript, JavaScript, C#, Golang, SQL (MS SQL, PostgreSQL), HTML/CSS, Python

**Frameworks & Libraries:** React, Next.js, .NET, .NET MAUI, Angular, React Native, TailwindCSS, RxJS

**Cloud & DevOps:** Microsoft Azure (Functions, App Service, Service Bus, Event Hub, IoT Hub, Key Vault, Blob, Queue, Table), AWS (EC2, S3), Cloudflare R2, Docker, Azure Pipelines, Git

**Architectures & Patterns:** Event-Driven Architecture, Distributed Systems, Serverless, IoT Integration, RESTful APIs, CI/CD, real-time telemetry pipelines, pub/sub messaging, multi-site event streaming

## Education

**University of Alberta** | Edmonton, Alberta, Canada

Bachelor of Science in Computer Science, Minor in Psychology