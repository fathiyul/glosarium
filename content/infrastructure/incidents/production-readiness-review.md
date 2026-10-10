---
title: "Production Readiness Review"
summary: "A checklist before a service goes live."
levels: { backend: staff, frontend: staff, data-engineer: staff }
aliases: ["production readiness review", "PRR", "readiness review"]
prereqs: ["launch-checklist", "monitoring"]
related: ["alerting", "runbook", "rollback", "slo", "on-call", "observability"]
---

A **production readiness review (PRR)** is the gate a service passes before it takes real traffic. It's a structured check that the things that make a service operable — not just functional — are in place. The service works in a test; the review asks whether it will *stay* working under real load, with real users, at 3am.

What a review covers:

- Observability. Metrics, logs and [alerts](/t/alerting) that show the service's health, and an [SLO](/t/slo) that defines "good". You can't operate what you can't see ([observability](/t/observability)).
- Failure handling. What happens when a dependency is down, a request times out, or a queue backs up. Graceful degradation, retries with limits, timeouts.
- Rollback and recovery. A way back (see [rollback](/t/rollback)), and a [runbook](/t/runbook) for known failure modes.
- Capacity. Realistic load tested (see [capacity planning](/t/capacity-planning)), with limits and scaling understood.
- Ownership. An on-call rotation and a team that answers when it pages (see [on-call](/t/on-call)).
- Data and dependencies. Backups, migration safety, and any external services it relies on.

```text
not ready: "it works on staging" + a single instance
ready:     monitored, alerting, SLO'd, rollback-able, on-call owned
```

The classic mistakes:

- Checkbox theater. Running through a list without understanding it gives false confidence. The point is a real conversation about how the service fails and how you'll know.
- No owner. A review with no accountable team drifts and gets skipped. Someone drives it and signs off.
- Skipping it for "small" services. Small services cause outages too. Scale the depth to the risk, but don't drop it — and a service someone depends on isn't small.
- A one-time gate. Readiness decays as the system changes. Revisit for major changes (see [configuration drift](/t/configuration-drift) and [progressive delivery](/t/progressive-delivery)).

**How it fits:** a PRR is the deeper, service-level version of a [launch checklist](/t/launch-checklist), usually required once before a new service carries production traffic. It's the moment to catch the operational gaps while they're cheap, rather than discovering them during the first [incident](/t/incident-response).
