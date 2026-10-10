---
title: "Cold Start"
summary: "The delay when a serverless function or container starts fresh."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["cold start", "cold starts", "warm-up latency"]
prereqs: ["serverless-functions", "cache-warming"]
related: ["serverless-functions", "cache-warming", "autoscaling"]
---
A **cold start** is the first-use penalty: provisioning a sandbox, loading runtimes and code, JIT-warming, connection-pool priming, cache filling — before useful work begins. Serverless functions, fresh autoscaled instances, restarted services and newly deployed regions all pay it; users experience it as sporadic latency spikes on otherwise fast systems.

```text
cold:  provision + load + init + warm → serve (seconds)
warm:  serve (milliseconds)
```

Mitigations layer: keep instances warm (provisioned concurrency, minimum counts), shrink init (lazy imports, smaller bundles, lighter frameworks), pool outside handlers (reuse across invocations), warm gradually (traffic ramps, synthetic warmups), and design for it (async paths, generous timeouts on first call).

The classic mistakes:

- Measuring warm only. Load tests hitting warmed systems miss the spike users feel after idle periods and deploys. Test cold explicitly (fresh deploy, post-idle, new region).
- Heavy global init. Importing everything, connecting everywhere, loading ML models at module scope maximises cold time. Lazy-load; initialise on first use.
- Provisioned-everything spending. Warming all functions constantly recreates the server bill serverless was meant to avoid. Warm latency-sensitive paths; let the rest scale to zero.
- Cold-unaware timeouts. First-call timeouts tuned for warm latency fail cold starts spuriously. Budget cold explicitly (or warm before traffic).
- Ignoring downstream cold. Your warm function calling a cold database (new connections, cold caches) pays cold anyway. Warm the chain, not just the front.
- Framework weight blindness. Heavyweight frameworks multiply init seconds; cold-sensitive paths favour lean runtimes. Match framework weight to latency need.
- Cache-cold confusion. Empty caches after deploys look like cold starts but need warming strategies, not init optimisation. Distinguish init-cold from cache-cold.

**How to manage it:** measure cold explicitly, warm deliberately (provisioned/warmup where latency matters), slim init everywhere, design async tolerance. Cold starts are physics plus software — minimise the software half.
