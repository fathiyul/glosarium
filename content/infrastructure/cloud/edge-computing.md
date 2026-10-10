---
title: "Edge Computing"
summary: "Running code near users at CDN locations."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["edge computing", "edge functions", "edge runtime"]
prereqs: ["cdn", "latency"]
related: ["cloud-computing", "regions-azs", "faas", "data-residency", "cloud-providers"]
---

**Edge computing** means running code at points close to your users — typically inside a [CDN](/t/cdn)'s network of locations — instead of in one central region. The motive is **latency**: a request served 20 milliseconds away is faster and more reliable than one crossing an ocean. It also cuts the amount of traffic that has to reach your origin.

Edge platforms run small functions in many locations: rewrite a request, personalize a response, check a token, cache or transform content, route to the nearest healthy origin. It's a form of [functions as a service](/t/faas) with the runtime distributed globally rather than in one region's data centers.

```text
user ──▶ nearest edge location ──▶ (run code here) ──▶ origin (only if needed)
```

The classic mistakes:

- Treating the edge like a full server. Edge runtimes are deliberately constrained: limited memory and CPU, short execution limits, often no persistent local disk or long-lived connections. Code written for a normal server may simply not fit.
- Expecting global consistency. Data is replicated across locations with some delay. If your edge logic reads state, it may read a slightly stale copy. Design for that, or don't put stateful logic at the edge.
- Cold starts and per-location cost. Many locations each start cold. And while requests are cheap, many locations × many invocations add up; watch the bill (see [cloud cost management](/t/finops)).
- Forgetting governance. Data processed at the edge may land in many jurisdictions. That matters for privacy and [data residency](/t/data-residency).
- Over-engineering. Not everything belongs at the edge. Static assets and simple rewrites benefit most; complex business logic is often simpler and more debuggable at the origin.

**When to use it:** when latency or geography is the product — fast global APIs, geo-personalization, request filtering — or when you want to absorb traffic before it hits the origin. When your users are concentrated in one region, serving them from a normal [region](/t/regions-azs) is usually simpler and cheap. Edge is an optimization, not a default.
