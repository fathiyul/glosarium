---
title: "SLA"
summary: "A service level agreement: a promise to customers, with consequences."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["sla", "service level agreement", "sla vs slo"]
prereqs: ["slo", "sli"]
related: ["error-budget", "uptime-monitoring", "status-page", "incident-response", "metrics"]
---

A service level agreement (SLA) is a promise to customers about the service you'll provide — typically availability or latency — with a consequence if you miss it, such as service credits or refunds. It's the external, often contractual version of an internal target. The three terms fit together:

- **SLI** (indicator) — the thing you measure, e.g. the fraction of requests that succeed.
- **SLO** (objective) — your internal target for that indicator.
- **SLA** — the customer-facing promise, usually looser than the SLO.

```text
SLI: 99.2% of requests succeeded this month
SLO: target 99.9% internally
SLA: promise customers 99.5%, credits below that
```

You want the SLO stricter than the SLA so you're warned before you breach the contract. If the SLO says 99.9% and you run at 99.6%, you're already fighting a problem — the SLA breach is the last thing you want to discover.

The classic mistakes:

- **Promising 100%.** No service is perfect, and chasing 100% is enormously expensive. Set a realistic target above what customers actually need.
- An SLA with no measurement. A promise you don't measure can't be met or proven. You need an [SLI](/t/sli) and [uptime monitoring](/t/uptime-monitoring) behind it.
- Legal language disconnected from engineering. If engineers don't know the target or can't see the current number, the SLA is a surprise at contract renewal, not a guide.
- Confusing the SLA with the SLO. Holding the team to the customer number, when the tighter internal objective is what should drive work, causes both over- and under-investment (see [SLO](/t/slo) and [error budget](/t/error-budget)).

A good SLA is a small set of meaningful promises tied to how customers use the service, backed by measurement and by [incident response](/t/incident-response) and [status-page](/t/status-page) communication when it's at risk. Frontend, backend and data each contribute their piece of the measured indicator.
