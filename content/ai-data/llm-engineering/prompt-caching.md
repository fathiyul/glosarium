---
title: "Prompt Caching"
summary: "Reusing processed prompt prefixes to save cost and time."
levels: { backend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["prompt caching", "context caching", "prefix caching"]
prereqs: ["llm-cost-latency", "system-prompt"]
related: ["llm-cost-latency", "system-prompt", "cache-hit-miss"]
---
**Prompt caching** reuses the computed processing of a repeated prompt prefix across requests. When many calls share a long, identical beginning — a system prompt, tool definitions, a reference document — the provider or serving stack can reuse the work done on that prefix instead of recomputing it each time, lowering both latency and cost for the shared part.

```text
request 1: [long shared prefix][question A]  → compute prefix, cache it
request 2: [long shared prefix][question B]  → reuse cached prefix, compute only the new part
```

It rewards stable structure: content that changes must come after content that does not. Putting a timestamp or per-user detail at the start of a prompt defeats reuse entirely.

The classic mistakes:

- Varying the prefix. Any change early in the prompt invalidates what follows. Keep shared material first and identical.
- Assuming unlimited lifetime. Cached entries expire. Do not design around a guarantee that they persist.
- Caching sensitive content carelessly. Shared caches can make personal data reusable across requests if the platform allows it. Check the isolation guarantees and keep per-user data out of shared prefixes.
- Measuring savings from one request. Gains appear across repeated traffic. Measure hit rates over a realistic workload.
- Forgetting the minimum size. Short prefixes may not be eligible or may save little. Cache where the shared portion is substantial.

**Practice:** order the prompt from most stable to most variable, keep shared content identical, and measure the effect on real traffic.

Track the cache hit rate as a metric in its own right. A sudden drop usually means someone changed the shared prefix, added a per-user detail near the top, or shipped a template change, and it is worth finding out which before the cost reaches the invoice.
