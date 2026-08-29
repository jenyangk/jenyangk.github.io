# Andy Koh

jenyang.koh@gmail.com | 587-566-9053 | Edmonton, Canada

LinkedIn: [linkedin.com/in/jenyangkoh](https://linkedin.com/in/jenyangkoh) | GitHub: [github.com/jenyangk](https://github.com/jenyangk) | Portfolio: [jenyangkoh.com](https://jenyangkoh.com)

## Summary

_Software Engineer with 5+ years building full-stack IoT and edge platforms across 200+ production sites, processing 2M+ telemetry events daily. Technical lead for end-to-end product delivery, from on-site user discovery in fast-paced field environments through cloud infrastructure. Architected a production edge platform powering sensor-driven motion-intrusion detection across customer sites._

## Experience

**Software Engineer II** | Latium Technologies | Feb 2025 – Present

- Technical lead for a 4-engineer team building an industrial IoT platform for real-time equipment monitoring; owned architecture and end-to-end delivery, scaling deployment to 200+ production sites with 2× YoY site growth
- Re-architected and scaled the IoT telemetry pipeline across 200+ production sites and ~3,000 sensors — introducing batching, parallel processing, and backpressure controls — to reliably process 2M+ events/day at p95 ~300ms end-to-end latency from sensor ingestion to user-visible data
- Improved resilience of the IoT data pipeline through automated recovery, DLQ-based replay, retry controls, and proactive alerting, cutting repeat production incidents by ~50% and reducing manual on-call intervention
- Architected and led delivery of a .NET MAUI field application replacing a long-stagnant legacy product, partnering with business analysts and customers to redesign core workflows and drive 2× user adoption
- Rebuilt the team's shipping process after unstable environments blocked urgent releases — introduced feature branching, CI-enforced branch protection, release tagging, and documentation — enabling safe emergency ships, reducing knowledge silos, and establishing a weekly deployment cadence

**Lead Developer** | Eagles Communications | Mar 2026 – Present

- Owned end-to-end delivery of a mobile-first web platform with a self-service CMS, enabling 5 non-technical staff to publish independently and cutting content-update turnaround from days to minutes
- Redesigned media delivery architecture using Next.js, Cloudflare CDN, and headless CMS, cutting TTFB by 62% and reducing page weight ~85%
- Migrated 4 years of VantagePoint newsletter archive from PDF to SEO-indexed web articles, growing monthly website engagement by 50%

**Software Engineer I** | Latium Technologies | Sep 2022 – Feb 2025

- Owned a customer-facing web + mobile product as one of two full-stack engineers on a cross-functional team, from frontend through backend and cloud infrastructure
- Reduced per-site deployment time by 75% through automation scripts for device configuration, registration, and final hardware verification across field-deployable security systems
- Architected an edge computing platform in Go on ARM gateways: microservices processing 50 sensor events/sec via persistent queues, evaluating rules on-device in <100ms (vs ~500ms cloud round-trip) and dispatching real-time camera actions — sustaining full site protection through WAN outages
- Collaborated with hardware engineering to cut sensor-to-camera trigger latency from 30s to 2s and sustain p95 event processing under 300ms by implementing priority-based telemetry queues with device partitioning
- Mentored 5 engineers to production feature PRs within one week through 1:1 pairing and live walkthroughs; authored architecture documentation still in use by all new hires

**Software Developer I** | PCL Construction | Jun 2021 – Sep 2022

- Developed platform-performance monitoring tooling as sole developer for the IoT platform later led end-to-end at Latium
- Extended the platform with follow-up reminder notifications that kept site teams from missing time-sensitive alarms across 100+ sites
- Cut latency on the customer portal's hottest read path with a targeted index on the telemetry table, lowering query cost for latest-telemetry lookups across asset maps, dashboards, and alarm views

## Technical Skills

**Languages:** TypeScript, Go (Golang), C#, JavaScript, Python, SQL (T-SQL)

**Frameworks & Libraries:** React, Next.js, Angular, React Native, .NET, .NET MAUI

**Databases:** PostgreSQL, Microsoft SQL Server

**Cloud:** Azure (Functions, Service Bus, Event Hubs, IoT Hub, Custom Vision, Virtual Machines, Key Vault, Storage Accounts, API Management), AWS (EC2, S3), Cloudflare (Workers, D1, R2)

**Systems:** Distributed systems, edge computing, event-driven architecture, serverless, REST APIs, real-time telemetry pipelines, pub/sub messaging, high availability, observability, IoT integration

**Tools:** Git, CI/CD pipelines, release automation

**AI/Tooling:** AI-assisted development, agentic workflows, LLM applications, developer productivity tooling

## Education

**University of Alberta** | B.S. Computing Science, Minor in Psychology | Class of 2021
