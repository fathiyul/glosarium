---
title: "Little's Law"
summary: "Items in a system = arrival rate \u00d7 time each spends in it."
levels: { backend: senior, data-engineer: senior }
aliases: ["Little's law", "littles law", "L = λW"]
prereqs: ["queue", "throughput"]
related: ["latency", "backpressure", "capacity-planning"]
---

**Little's law** is a simple, remarkably general relationship from queueing theory:

```text
L = λ × W
L = average number of items in the system
λ = average arrival rate (items per second)
W = average time each item spends in the system
```

It says the number of things "in flight" equals how fast they arrive times how long each stays. It holds for any stable system — queues, servers, databases, connection pools — regardless of the details inside.

Why it matters: it lets you reason about capacity without simulating. If your service receives 1,000 requests per second and each takes 100 ms, then on average 1,000 × 0.1 = **100 requests are in flight** at once. That's 100 concurrent requests your system must be able to hold — threads, connections, memory — at that throughput and latency. If latency rises to 1 second at the same arrival rate, in-flight requests jump to 1,000, and the system may fall over trying to hold them.

It also works in reverse: if you know the concurrency your system can sustain and the arrival rate, it tells you the latency you can expect — or diagnose that a growing number of in-flight items means latency is climbing.

The classic mistakes:

- **Ignoring that it applies to *stable* systems.** If arrivals exceed capacity, the queue grows without bound and "average" items isn't meaningful — the system is diverging, not in steady state. Little's law describes the steady state.
- Forgetting concurrency costs resources. Every in-flight item holds memory, a connection, or a thread. High latency at high throughput means *many* concurrent items — which is often the real capacity limit, not CPU.
- Using it on a component in isolation. Scope matters: L, λ and W must refer to the same boundary (the whole service, or one queue).
- Treating latency as independent of load. As load rises, W usually rises, so L rises faster than λ. The relationship exposes that feedback.
- Assuming it prescribes a fix. Little's law *describes*; it tells you in-flight count, not whether to add workers or reduce latency.

Little's law is a powerful sanity check for performance and capacity: it connects the three numbers you care about — throughput, latency and concurrency — so that improving one often means paying in another. It's why capping concurrency and reducing latency matter for [backpressure](/t/backpressure), and it belongs in any [capacity planning](/t/capacity-planning) discussion.
