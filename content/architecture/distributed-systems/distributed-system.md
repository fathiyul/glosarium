---
title: "Distributed System"
summary: "Many machines cooperating over an unreliable network."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["distributed systems", "distributed computing", "networked system", "distributed application"]
prereqs: ["client-server", "network-partition"]
related: ["fallacies-of-distributed-computing", "cap-theorem", "consensus", "clock-skew", "saga-pattern", "fault-tolerance"]
core: [backend]
---

A **distributed system** is a collection of **independent machines that cooperate over a network to appear as one system**. Almost every real backend today is one: a web app, a database, a cache, a queue and a few services already count.

## Why build them

- **Scale**: more machines handle more load and data than one can.
- **Availability and fault tolerance**: if one machine fails, others continue.
- **Latency**: put data and compute near users.
- **Organization**: different teams own different services.

## Why they're hard

The difficulty comes from properties that a single machine doesn't have:

- **Partial failure.** Parts fail independently. A request might succeed on one machine and fail on another, and you can't always tell whether a failed or slow call actually *did* its work. A timeout means "I don't know".
- **An unreliable network.** Messages get lost, delayed, duplicated and reordered. Latency varies. The network can split the system into groups that can't talk to each other ([network partitions](/t/network-partition), [CAP theorem](/t/cap-theorem)). See the [fallacies of distributed computing](/t/fallacies-of-distributed-computing).
- **No shared clock and no global state.** Machine clocks drift, so you can't reliably order events by timestamp ([clock skew](/t/clock-skew), [logical clocks](/t/logical-clocks)).
- **Concurrency everywhere**, with races across machines.
- **Agreement is expensive.** Getting machines to agree on a value (a leader, an order of operations) needs consensus algorithms, which cost latency and are tricky to get right ([consensus](/t/consensus), [Raft](/t/raft), [Paxos](/t/paxos)).
- **Observability is harder.** A request touches many machines, and the story is spread across logs and traces ([distributed tracing](/t/distributed-tracing)).

## Core techniques

| Problem | Typical tools |
|---|---|
| Surviving failures | Redundancy, replication, failover ([database replication](/t/database-replication)) |
| Unknown outcomes of calls | **Idempotency**, retries with backoff, timeouts ([idempotency key](/t/idempotency-key), [retry with backoff](/t/retry-with-backoff)) |
| Cascading failure | Circuit breakers, bulkheads, load shedding ([blast radius](/t/blast-radius)) |
| Consistency across nodes | Consistency models, quorums, consensus ([consistency models](/t/consistency-models), [quorum](/t/quorum)) |
| Multi-step operations | Sagas, outbox ([saga pattern](/t/saga-pattern), [transactional outbox](/t/transactional-outbox)) |
| Coordination | Leader election, locks and leases, fencing tokens ([leader election](/t/leader-election), [leases](/t/lease)) |
| Finding other services | Service discovery ([service discovery](/t/service-discovery)) |

## Practical principles

- **Assume failure** at every call and every node. Design what happens when each dependency is slow, wrong or down.
- **Make operations idempotent.**
- **Prefer simplicity.** Every distributed component adds failure modes. A single database often beats a clever distributed design for a long time ([monolith vs microservices](/t/monolith-vs-microservices)).
- **Use proven building blocks** (managed databases, queues, consensus services) instead of inventing coordination protocols.
- **Test with faults**: kill nodes, delay and drop messages, partition the network ([chaos engineering](/t/chaos-engineering)).
- **Measure and trace.**

If you take one thing away: **a remote call is not a local call**. It can fail, be slow, be duplicated, or have an unknown result.
