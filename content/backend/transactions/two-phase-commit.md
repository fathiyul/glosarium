---
title: "Two-Phase Commit"
summary: "A coordinator making all participants either commit or abort."
levels: { backend: senior, data-engineer: senior }
aliases: ["two-phase commit", "2PC", "two phase commit"]
prereqs: ["transaction", "distributed-transaction"]
related: ["saga-pattern", "message-broker", "idempotence"]
---

**Two-phase commit (2PC)** is a protocol for committing a transaction across multiple participants atomically. A **coordinator** drives two phases:

1. Prepare — ask every participant to get ready to commit (lock resources, write the change locally, but don't commit).
2. Commit / Abort — if *all* participants said "ready", tell them all to commit; if any said "no" (or timed out), tell them all to abort.

```text
phase 1: coordinator → participants: prepare?   ← all reply yes/no
phase 2: coordinator → participants: commit/abort (all together)
```

That gives atomicity across separate databases or services: either everyone commits or no one does. It's the classic answer to "make these systems agree".

The cost is significant. Participants hold locks and resources from prepare until commit, so 2PC is **blocking**. If the coordinator crashes after participants have prepared, they're stuck holding locks until it recovers — a serious availability risk. And it's slow (multiple round trips).

The classic mistakes:

- Using 2PC for high-throughput or high-availability paths. Its blocking and coordinator-failure behaviour fits poorly there. Many systems avoid it in favour of [sagas](/t/saga-pattern) and eventual consistency.
- Ignoring the coordinator's failure mode. The dangerous window is *after* prepare and *before* commit: participants are "in doubt" and must wait or recover. A coordinator that isn't durable makes this worse.
- Assuming it's fast. Two phases and distributed locks mean latency; under contention it serialises.
- Confusing it with MVCC's two-phase locking. "Two-phase commit" (distribution) is a different thing from "two-phase locking" (2PL, a concurrency-control method inside one database). Similar names, unrelated mechanisms.
- Not handling participant timeouts and retries. Networks fail; the protocol must define behaviour when a participant is unreachable, or it hangs.
- Reaching for it when a single database would do. If the data could live in one database, a normal transaction avoids the whole problem. Distribution is what forces 2PC.

**When to use it:** when you truly need atomic commit across independent systems and can accept the availability and latency cost — some financial and infrastructure systems do. For most modern distributed workflows, a saga with idempotent steps and compensations is the more scalable choice (see [distributed transaction](/t/distributed-transaction)).
