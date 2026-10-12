---
title: "Debugging in Production"
summary: "Finding issues with logs, traces and metrics when you can't attach a debugger."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["debugging production", "production debugging", "debug in prod"]
prereqs: ["debugging", "observability"]
related: ["distributed-tracing", "logging", "correlation-id", "reproducing-prod-issues", "production-console", "heisenbug"]
---

**Debugging in production** is finding the cause of a problem in a live system you can't stop, restart or attach a debugger to. It works differently from local debugging: **instead of pausing execution**, you read what the system already emits — [logs, metrics and traces](/t/logs-metrics-traces) — and follow a single request through them. The tool is observation, not interruption.

The core techniques:

- Follow one request. Start from a failing request, find its [correlation ID](/t/correlation-id) and follow it across services via [distributed tracing](/t/distributed-tracing) and the matching log lines.
- Compare a working case to a broken one. Metrics and traces let you see what's different for the affected users, endpoint or region.
- Reproduce locally. Once you understand the inputs and data shape, recreate it in a safe environment (see [reproducing production issues](/t/reproducing-prod-issues)) to iterate quickly.
- Look at the edges. The cause is often a dependency: a slow database, a full queue, a downstream service. Traces show the waiting.

The classic mistakes:

- Attaching a debugger or a breaking breakpoint. Pausing a live process stalls every user it serves. Never break in production; even "just one request" blocks a worker.
- Needing a deploy to add logging. If you can only see more by shipping code, your debugging is slow and risky. Invest in structured logging and tracing ahead of time, plus log levels you can turn up.
- Changing data while investigating. A read-only investigation is safe; a write to "fix and see" is a production change with no review (see [production consoles](/t/production-console)). Read first, fix carefully.
- Trusting a single data point. One slow request or one error can be noise. Look at patterns, percentiles and rates.
- Forgetting the clock. Distributed systems skew; correlate by timestamps *and* correlation IDs, not by eye.

The habit that makes this possible is designing for it *before* the incident: structured logs, traces with context, and a way to see per-request detail without touching the running system. Debugging in production is really the payoff of good [observability](/t/observability) — which is why it's worth building before you need it, and why [heisenbugs](/t/heisenbug) (bugs that vanish when observed) are so much easier when observation is non-intrusive.
