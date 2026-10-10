---
title: "Serverless Architecture"
summary: "Building from managed functions and services without running servers."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["serverless architecture", "serverless", "functions architecture"]
prereqs: ["serverless-functions", "faas"]
related: ["serverless-functions", "event-driven-architecture", "faas"]
---
**Serverless architecture** builds systems from managed functions and services without provisioning servers: code runs in short-lived invocations, storage/queues/auth come as services, and scaling to zero is normal. You compose managed pieces and write the glue — the provider owns everything below your handler.

```text
request → managed gateway → function (your code) → managed queue → function → managed DB
```

It inverts the traditional build: instead of a long-running app you operate, you assemble events, functions and services you don't. Cost follows use (per-invocation), scaling is automatic, and undifferentiated work (patching, capacity planning) disappears — traded for provider constraints: timeouts, cold starts, statelessness and observability shaped by someone else's platform.

The classic mistakes:

- Treating functions as tiny servers. Long-running, stateful or connection-heavy workloads fight the model (15-minute caps, frozen filesystems, NAT-gateway connection limits). Fit the workload to the platform, not vice versa.
- Death by a thousand functions. Hundreds of micro-functions with implicit choreography become an undebuggable mesh; structure with workflows, clear events and ownership.
- Ignoring cold starts on user paths. Sporadic latency spikes on latency-sensitive endpoints need provisioned concurrency or architectural warming.
- Surprise bills. Per-invocation pricing punishes chatty, retry-storming or infinite-loop designs; a runaway function loop bills like an attack. Alarms and budgets from day one.
- No local story. Deploy-only debugging slows iteration; invest in local emulation and preview environments early.
- Vendor-shaped design without an exit. Deep reliance on proprietary event shapes and services raises switching costs; isolate provider seams where the business justifies it.

**When to use it:** spiky, event-driven workloads and glue between services — where scaling to zero and zero server operations outweigh the constraints. Steady-state heavy compute usually belongs on containers. See [serverless functions](/t/serverless-functions) for the unit of the model.
