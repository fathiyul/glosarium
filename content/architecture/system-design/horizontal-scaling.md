---
title: "Horizontal Scaling"
summary: "Scaling out with more machines."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["scale out", "scaling out", "horizontal scalability", "adding more servers", "scale horizontally"]
prereqs: ["load-balancer", "stateless-service"]
related: ["vertical-scaling", "load-balancer", "sharding", "stateless-service", "scalability", "database-replication"]
core: [backend]
---

**Horizontal scaling** (scaling out) means handling more load by **adding more machines**, instead of making one machine bigger (**vertical scaling**, scaling up).

```
Vertical:    one 8-core server  →  one 64-core server
Horizontal:  one server         →  ten servers behind a load balancer
```

| | Vertical | Horizontal |
|---|---|---|
| How | Bigger CPU, more RAM | More machines |
| Simplicity | Very simple: no code changes | Requires the design to support it |
| Limit | Ceiling at the biggest available machine, and cost rises steeply | Practically much higher |
| Resilience | One machine is a single point of failure | A failed machine is replaced by others |
| Downtime to scale | Often a restart | Add nodes without stopping |

See [vertical scaling](/t/vertical-scaling) and [scalability](/t/scalability).

## What makes an app scale out easily

**A stateless application tier.** If servers keep no per-user state locally, any server can handle any request, and you can add or remove them freely behind a [load balancer](/t/load-balancer). State goes into shared stores: a database, a cache, a session store
([stateless services](/t/stateless-service)).

```
clients ─► load balancer ─► app server 1 ┐
                       ├─► app server 2 ├─► shared database / cache
                       └─► app server 3 ┘
```

Autoscaling adds and removes instances based on load.

## The hard part: the data tier

Stateless servers are easy to multiply. **Data** isn't:

- **Read-heavy**: add read replicas ([read replicas](/t/read-replica), [replication](/t/database-replication)).
- **Write-heavy or too big for one machine**: partition the data across machines ([sharding](/t/sharding), with its trade-offs: cross-shard queries, rebalancing, hot spots).
- **Caching** reduces load before you need either ([caching](/t/caching)).

## Costs and cautions

- **Complexity**: distributed systems have partial failures, network issues and consistency questions.
- **Don't scale out too early.** A single well-tuned server (and a replica) handles a lot. Measure and find the real bottleneck first.
- **Find the actual bottleneck**: adding web servers does nothing if the database is saturated.
- **Things that silently break**: in-memory sessions, local file uploads, scheduled jobs that now run on every instance, in-process caches that diverge.
- **Cost**: more machines means more to run, monitor and pay for.

A common path is: optimize → scale up → add caching and replicas → scale out the stateless tier → partition data only when necessary.
