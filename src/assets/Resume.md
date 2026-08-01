# Andy Koh

jenyang.koh@gmail.com | 587-566-9053 | Edmonton, Canada

[jenyangkoh](https://linkedin.com/in/jenyangkoh) | [jenyangk](https://github.com/jenyangk) | jenyangkoh.com

## Summary

_Software Engineer with 5+ years building full-stack IoT and edge platforms across 100+ active sites, processing gigabytes of telemetry daily. Sole technical owner of end-to-end product delivery, from on-site user discovery in fast-paced field environments through cloud infrastructure. Architected a production edge platform that powers sensor-driven motion intrusion detection across customer sites._

## Experience

**Software Engineer II** | Latium Technologies | Feb 2025 – Present

- Led architecture and end-to-end delivery of a customer-facing web and mobile security platform as technical lead for a four-engineer team, scaling deployment to 100+ production sites with 2x YoY growth
- Architected edge-based rules execution and AI image-processing pipelines to detect and classify intrusion events directly on site, sustaining p95 event-processing latency under 300 ms while reducing cloud-compute and data-transfer costs; cut camera hardware requirements per site by 60% and false-negative rates by 70%, enabling faster and more reliable incident response
- Cut sensor-to-camera trigger p99 latency from 30s to 2s for time-sensitive site security events by splitting telemetry into priority/non-priority queues, with Event Hub auto-scaling and device-based partitioning
- Cut the platform's active-alarms API response time by an order of magnitude for large customers by re-architecting the query plan against a billion-row telemetry table, replacing a correlated scan with a pre-materialized fleet-hierarchy approach and an inline latest-telemetry lookup that eliminated tens of millions of logical reads per query without adding indexes
- Defined feature-branching as the team's source-control standard, replacing a traditional flow that broke mid-sprint, with branch-protection policies enforced through CI, and leads epic breakdown, task estimation, and production deployment for feature pushes

**Software Engineer I** | Latium Technologies | Sep 2022 – Feb 2025

- Owned a customer-facing web + mobile product as one of two full-stack engineers on a cross-functional team across 100+ active construction sites, from frontend through backend and cloud infrastructure
- Led development of the mobile app from scratch in .NET MAUI as lead developer, displacing a shelved legacy app since the App Store debut, now used daily with icon-first navigation for low-literacy field environments
- Delivered camera livestreaming and PTZ control in the web client (200+ cameras, ~5s latency), eliminating on-site physical access for camera operation
- Halved product implementation and deployment time from 4 hours to 2 hours per site by implementing a least-squares plane fit with RBF interpolation to compute tilt from calibration data, deployed across 100+ sites
- Architected and built a smart edge computing platform rolling out to customer sites, running Go services on ARM-based gateway hardware processing LoRaWAN sensor events, evaluating rules locally with state-machine safeguards, and dispatching PTZ camera actions in real-time, backed by persistent pub/sub messaging, a relational store, and an observability stack provisioned as-code

**Software Developer I** | PCL Construction | Jun 2021 – Sep 2022

- Developed platform-performance monitoring tooling as sole developer for the IoT platform, later led end-to-end at Latium
- Extended the platform with follow-up reminder notifications that kept site teams from missing time-sensitive alarms across 100+ sites
- Reduced latest-telemetry lookup latency for the customer-facing portal by adding a targeted index on the telemetry table, lowering query cost for the platform's hottest read path across asset maps, dashboards, and alarm views

## Projects

**Lead Developer** | Eagles Communications | Mar 2026 – Present

- Rebuilt [eagles.org.sg](https://eagles.org.sg) from legacy WordPress to Next.js + Prismic CMS, [redesigned the site](https://eagles-redesign.vercel.app/) from the ground up with a mobile-friendly responsive layout, accessibility-first markup and semantic structure, and web-native newsletters that render directly in the browser instead of email attachments

## Technical Skills

**Languages:** TypeScript, JavaScript, C#, Golang, T-SQL, pgSQL, Python

**Frameworks & Libraries:** React, Next.js, .NET, .NET MAUI, Angular, React Native

**Cloud:** Azure (Functions, Service Bus, Event Hub, IoT Hub, Custom Vision, VM, Key Vault, Storage Account, APIM), AWS (EC2, S3), Cloudflare (Workers, D1, R2)

**Systems:** Distributed systems, edge computing, event-driven architecture, serverless, RESTful APIs, MVVM, high availability, observability, real-time telemetry pipelines, pub/sub messaging, IoT integration

**AI/Tooling:** Agent harnesses, code harnesses, agentic workflows, loop engineering, LLM applications, prompt engineering, context engineering, developer productivity tooling

## Education

**University of Alberta** | B.S. in Computing Science. Minor in Psychology. || **Class of 2021**