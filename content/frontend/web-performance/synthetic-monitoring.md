---
title: "Synthetic Monitoring"
summary: "Measuring with scripted visits from controlled locations."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["synthetic monitoring", "synthetic checks", "active monitoring"]
prereqs: ["observability", "real-user-monitoring"]
related: ["real-user-monitoring", "observability", "ttfb"]
---

**Synthetic monitoring** probes the site on a schedule from controlled locations: scripted browsers loading key journeys (homepage, search, checkout), asserting content and timing each step. It catches outages, regressions and broken flows *before* (or without) real users hitting them — with clean attribution (same device, same path, every run).

```text
every 5 min, from 10 regions: load → search → add → checkout → assert + time
alert when: step fails, or timing breaches budget
```

Its strengths are control and coverage: baseline comparisons across deploys, off-hours detection, geographic verification, and journey assertions RUM can't make (RUM sees what users did, not what they couldn't). Its weakness is representation — scripted paths on fast networks miss real-device, real-network suffering.

The classic mistakes:

- Synthetic instead of RUM. Green probes with red field data means the probes don't represent users. Both: synthetic for detection and baselines, RUM for truth.
- Homepage-only coverage. Monitoring `/` while checkout breaks for a day is theatre. Script the money paths and critical journeys.
- Brittle selectors. Tests coupled to implementation details (generated classes, exact copy) flap constantly and get muted — then miss real breaks. Assert user-meaningful outcomes.
- No budget gating. Timing data nobody acts on is trivia. Alert and gate deploys on journey budgets.
- Single-region probing. Global sites fail regionally (DNS, CDN, edge bugs). Probe from where users are, especially after infra changes.
- Ignoring off-hours. Nightly batch jobs, cert renewals and cron-driven breakage need 24/7 eyes. Schedule around the clock.
- Alert fatigue. Flaky probes paging humans train teams to ignore them. Stabilise or demote flaky checks; pages mean action.

**How to pair it:** synthetics guard journeys and baselines continuously; RUM reports what users actually experience; labs diagnose. Detection, truth and diagnosis — three jobs, three tools.
