---
title: "SLI"
summary: "A service level indicator: a measured aspect of service quality."
levels: { backend: senior, frontend: senior, data-engineer: senior }
also: [observability]
aliases: ["SLI", "service level indicator", "sli definition"]
prereqs: ["monitoring", "metrics"]
related: ["slo", "sla", "error-budget", "golden-signals", "uptime-monitoring", "observability"]
---

An **SLI** (service level **indicator**) is a measurement of how well a service is doing from the user's point of view. It's a specific number you track: the fraction of requests that succeed, the share served under a latency threshold, the availability of an endpoint. It's the raw measurement that an [SLO](/t/slo) sets a target for and an [SLA](/t/sla) makes a promise about.

```text
SLI: fraction of successful requests (good / total)
SLI: fraction of requests faster than 300ms
SLI: time the service is available / total time
```

The key word is *user's point of view*. The best SLIs measure the experience, not the machine: "99.2% of HTTP requests returned successfully in the last 30 days" is an SLI; "the server's CPU was 40%" is not. If an SLI looks good while users are unhappy, you're measuring the wrong thing.

The classic mistakes:

- Measuring internals instead of outcomes. Healthy servers can serve broken responses. Anchor the SLI to what a user asked for and got — success, latency, correctness.
- Too many SLIs. A wall of indicators drowns the signal. Pick the few that map to what users actually care about for that service.
- Averaging over the interesting parts. A single success/failure ratio hides a specific endpoint or region doing badly. Choose the scope deliberately.
- An indicator with no target. An SLI alone tells you the number; it doesn't tell you if it's good enough. That's the [SLO](/t/slo)'s job — measure, then set the bar.
- Only availability. Availability is easy but blunt; latency and correctness often matter more. Use the [golden signals](/t/golden-signals) as a source of candidate SLIs.

**How to use them:** define SLIs for each user-facing service, compute them from the same telemetry you already collect ([metrics](/t/metrics), requests), and let them feed your SLOs and [error budgets](/t/error-budget). A good SLI is one you can calculate continuously and that a user would recognise as "is it working for me?".
