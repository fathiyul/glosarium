---
title: "REST Constraints"
summary: "Statelessness, uniform interface, cacheability and REST's other rules."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["rest constraints", "restful constraints", "fielding constraints"]
prereqs: ["rest", "http"]
related: ["api-contract", "hateoas", "safe-idempotent-methods"]
---

REST isn't "JSON over HTTP" — it's six architectural constraints from Fielding's dissertation, and each buys a scaling property:

- **Client-server** — separation of concerns; clients and servers evolve independently.
- Stateless — every request carries its context; servers keep no session. Enables visibility, reliability, scaling.
- Cacheable — responses declare cacheability; intermediaries reuse them.
- Uniform interface — resources identified in requests, manipulated through representations, self-descriptive messages. The constraint most APIs approximate.
- Layered system — intermediaries (proxies, gateways, CDNs) may sit between without either end knowing.
- Code-on-demand (optional) — servers may ship executable code (the web's scripts).

```text
stateless + cacheable + layered + uniform → the web's scale properties
```

Most "REST" APIs honour statelessness, caching and layering while loosely interpreting the uniform interface (few implement true HATEOAS). That's fine — the constraints are a direction, and partial compliance still captures most benefits.

The classic mistakes:

- Sessions on the server. Server-side session state violates statelessness and breaks scaling and failover. Carry context in tokens or storage, not process memory.
- Uncacheable everything. POST-only APIs with no cache headers forfeit the web's free scaling layer. Make reads safe GETs with validators.
- Tunnelling verbs through POST. One endpoint with an `action` field discards the uniform interface — no caching, no safe retries, no intermediary understanding. Use methods and resources.
- Claiming REST while requiring out-of-band knowledge. If clients must hard-code URL construction rules from docs, you're RPC in REST clothing. Links and consistent patterns fix it.
- Ignoring layering. Designing as if no proxy, CDN or gateway will ever sit between — then breaking when one does (auth assumptions, uncacheable auth'd responses).
- HATEOAS purism or dismissal. Full hypermedia suits long-lived public APIs; pragmatic resource APIs suit most products. Choose deliberately rather than by dogma.

**How to apply them:** stateless requests, cacheable reads, resources with proper methods, intermediaries assumed. The constraints are why the web scales — each one you honour buys you other people's infrastructure working in your favour.
