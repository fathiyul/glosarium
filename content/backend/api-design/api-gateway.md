---
title: "API Gateway"
summary: "A single entry point handling routing, auth and rate limits for many services."
levels: { backend: mid-level, frontend: mid-level }
also: [system-design]
aliases: ["api gateway", "gateway", "edge gateway"]
prereqs: ["rest", "microservices"]
related: ["rate-limiting", "load-balancer", "reverse-proxy", "bff"]
---

An **API gateway** sits in front of your backend services and acts as their single entry point. Clients call the gateway; it routes each request to the right service, and handles **cross-cutting** concerns in one place: authentication, [rate limiting](/t/rate-limiting), TLS termination, request logging, and sometimes response aggregation.

```text
clients → API gateway ─┬─▶ users service
                       ├─▶ orders service
                       └─▶ payments service
```

The appeal is centralisation. Instead of every service reimplementing auth, throttling and logging, the gateway does it once, and you can change those policies without touching the services. It also shields clients from knowing how many services exist or where they live.

The classic mistakes:

- A fat gateway. Putting business logic in the gateway makes it a bottleneck and a tangled dependency. Keep it to routing and cross-cutting concerns; business rules belong in the services.
- A single point of failure. If all traffic passes through it, it must be redundant and monitored. A down gateway is a down API.
- Latency and hop cost. Every request takes an extra hop. For deeply chained calls, that adds up; measure.
- Confusing it with a load balancer or reverse proxy. A [load balancer](/t/load-balancer) spreads traffic; a [reverse proxy](/t/reverse-proxy) forwards and terminates; a gateway adds API-aware routing and policy. They overlap and are often combined.
- Hiding too much from services. Centralising auth can tempt services to trust the gateway blindly; keep defence in depth.
- Over-using it for aggregation. Fetching from many services in the gateway re-couples them. A [BFF](/t/bff) is the better place for client-specific composition.

**When to use one:** when many services need shared, uniform handling of auth, throttling and routing, and clients benefit from one address. For a couple of services, a plain reverse proxy may be enough; the gateway earns its keep as the backend grows.
