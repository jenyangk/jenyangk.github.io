# Andy Koh

jenyang.koh@gmail.com | 587-566-9053 | Edmonton, Canada

LinkedIn: [linkedin.com/in/jenyangkoh](https://linkedin.com/in/jenyangkoh) | GitHub: [github.com/jenyangk](https://github.com/jenyangk) | Portfolio: [jenyangkoh.com](https://jenyangkoh.com)

## Summary

_Software Engineer with 5+ years building full-stack IoT and edge platforms across 200+ production sites, processing 2M+ telemetry events daily. Technical lead for end-to-end product delivery, from on-site user discovery in fast-paced field environments through cloud infrastructure. Architected a production edge platform powering sensor-driven motion-intrusion detection across customer sites._

## Experience

**Software Engineer II** | Latium Technologies | Feb 2025 – Present

- Technical lead for a 4-engineer team building an industrial IoT platform for real-time equipment monitoring; owned architecture and end-to-end delivery, scaling deployment to 200+ production sites with 225% YoY site growth
- Redesigned and scaled the IoT telemetry pipeline across 200+ sites and ~3,000 sensors with batching, parallel processing, and backpressure controls, reliably processing 2M+ events/day at ~300ms p95 latency from ingestion to user-visible data
- Improved resilience of the IoT data pipeline through automated recovery, DLQ-based replay, retry controls, and proactive alerting, cutting repeat production incidents by ~50% and reducing manual on-call intervention
- Architected and led delivery of a .NET MAUI field application replacing a long-stagnant legacy product, partnering with business analysts and customers to redesign core workflows and drive 2× user adoption
- Mentored 5 engineers to ship production feature PRs within one week through 1:1 pairing and live walkthroughs; authored architecture documentation adopted as the standard onboarding resource for all new hires
- Rebuilt the team's deployment process with feature branching, CI-enforced branch protection, and release tagging after unstable environments blocked urgent releases, cutting hotfix ship time from weeks to days and establishing a weekly deployment cadence

**Lead Developer** | Eagles Communications | Mar 2026 – Present

- Owned end-to-end delivery of a mobile-first web application with a self-service CMS, enabling 5 non-technical staff to publish independently and cutting content-update turnaround from days to minutes
- Redesigned media delivery architecture using Next.js, Cloudflare CDN, and headless CMS, cutting TTFB by 62% and reducing page weight ~85%
- Migrated 4 years of VantagePoint newsletter archive from PDF to SEO-indexed web articles, growing monthly website engagement by 50%

**Software Engineer I** | Latium Technologies | Sep 2022 – Feb 2025

- Owned end-to-end development of a customer-facing web and mobile product as one of two full-stack engineers, spanning frontend, backend services, and cloud infrastructure while maintaining 99.95% service availability
- Reduced deployment time at each site by 75% through automation of device configuration, registration, and final hardware verification across field-deployable security systems
- Architected an edge computing platform in Go on ARM gateways: microservices processing 50 sensor events/sec via persistent queues, evaluating rules on-device in <100ms (vs ~500ms cloud round-trip) and dispatching real-time camera actions
- Collaborated with hardware engineering to cut sensor-to-camera trigger latency from 30s to 2s and sustain p95 event processing under 300ms by implementing priority-based telemetry queues with device partitioning
- Led incident response for customer-facing systems as part of the production on-call rotation, diagnosing failures across application and cloud infrastructure and implementing corrective actions to prevent recurrence

**Software Developer I** | PCL Construction | Jun 2021 – Sep 2022

- Developed platform-performance monitoring tooling as sole developer for the IoT platform later led end-to-end at Latium
- Extended the platform with follow-up reminder notifications that kept site teams from missing time-sensitive alarms across 100+ sites
- Cut latency on the customer portal's hottest read path with a targeted index on the telemetry table, lowering query cost for latest-telemetry lookups across asset maps, dashboards, and alarm views

## Technical Skills

**Languages:** TypeScript, Go (Golang), C#, JavaScript, Python, SQL (T-SQL)

**Frameworks & DBs:** React, Next.js, Angular, React Native, .NET, .NET MAUI, PostgreSQL, Microsoft SQL Server

**Cloud:** Azure (Functions, Service Bus, Event Hubs, IoT Hub, SQL Database, Custom Vision, Virtual Machines, Key Vault, Storage Accounts, API Management, Monitor, Redis), AWS (EC2, S3), Cloudflare (Workers, D1, R2)

**Systems:** Distributed systems, edge computing, event-driven architecture, serverless, REST APIs, real-time telemetry pipelines, pub/sub messaging, high availability, observability, IoT integration, CI/CD

**AI/Tooling:** AI-assisted development, agentic workflows, LLM applications, developer productivity tooling

## Education

**University of Alberta** | B.S. Computing Science, Minor in Psychology | Class of 2021
