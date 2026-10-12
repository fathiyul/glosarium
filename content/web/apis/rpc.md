---
title: "RPC"
summary: "Calling a function on another machine as if it were local."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["rpc", "remote procedure call", "remote procedure calls"]
prereqs: ["http", "tcp"]
related: ["grpc", "trpc", "rest"]
---

**RPC** (remote procedure call) invokes a function on another machine with local-call syntax: stubs marshal arguments, ship them over the network, and return the result. The promise is transparency — distribution hidden behind a function call. The peril is the same transparency: networks fail, stall and cost in ways local calls never do.

```text
client: getUser(7)  →  stub → network → server executes → result returns
```

Modern incarnations span JSON-RPC, XML-RPC's descendants, and typed frameworks ([gRPC](/t/grpc), [tRPC](/t/trpc)). They shine for service-to-service operations and actions that aren't resource-shaped — verbs, not nouns.

The classic mistakes:

- Forgetting the fallacies. Latency isn't zero, bandwidth isn't infinite, the network isn't reliable — every RPC assumption that "it's just a function call" eventually bills you. Timeouts, retries and deadlines are mandatory.
- Chatty interfaces. Getters-per-field over RPC multiply round trips catastrophically. Coarsen the interface: fewer, bulkier calls.
- Hiding errors. Mapping every failure to a local exception type loses retryability signals. Preserve status, deadlines and retry guidance across the boundary.
- No deadlines. An RPC without a deadline inherits the caller's patience — usually infinite. Propagate deadlines end to end.
- Versioning by redeploy. Changing signatures without a compatibility story breaks callers silently. Version, evolve additively, or share types from one source.
- Using RPC where REST fits. Resource CRUD with caching needs is better served by HTTP semantics. RPC for actions, REST for resources — roughly.
- Ignoring observability. Transparent calls hide in profiles; instrument RPC boundaries with traces and latency histograms or they become invisible slowdowns.

**When to choose it:** internal service calls and action-oriented APIs where typed functions beat resource modelling. Respect the network's reality — timeouts, coarse calls, explicit errors — and RPC's convenience stops being a trap.
