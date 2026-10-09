---
title: "Consistency Models"
summary: "Linearizable, sequential, causal, eventual: what readers are allowed to see."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["consistency model", "linearizability vs eventual", "strong vs weak consistency", "causal consistency", "sequential consistency"]
prereqs: ["eventual-consistency", "cap-theorem"]
related: ["linearizability", "strong-consistency", "eventual-consistency", "cap-theorem", "pacelc", "logical-clocks", "replication-lag"]
core: [backend]
---

A **consistency model** is a **contract about what values reads are allowed to return** when data is replicated or accessed concurrently. Stronger models are easier to reason about but cost latency and availability. Weaker ones are faster and more available but push complexity onto the application. It's a spectrum, not a switch.

## From strongest to weakest (roughly)

| Model | Guarantee | In plain words |
|---|---|---|
| **[Linearizable](/t/linearizability)** (strong, "atomic") | Operations appear to happen instantaneously at one point in real time. Every read sees the latest completed write | Behaves like a single copy |
| **Sequential** | All see operations in the same order, consistent with each process's own order, but not necessarily real time | Everyone agrees on one order |
| **Causal** | Operations that are causally related are seen in the same order by everyone. Unrelated ones may differ | A reply is never seen before the message it replies to |
| **Session guarantees**: read-your-writes, monotonic reads, monotonic writes | Per-client properties | You see your own updates, and never see time go backwards |
| **[Eventual](/t/eventual-consistency)** | If writes stop, replicas converge | Eventually the same, with no promises in between |

("Consistency" in ACID means something different: constraints hold. See [ACID](/t/acid).)

## Examples

- A **bank balance**, a unique-username check or a distributed lock needs **linearizability**: two clients mustn't both think they got the last seat ([strong consistency](/t/strong-consistency)).
- A **comment thread** needs **causal** ordering: don't show replies before the original.
- A **social feed or like count** is fine with **eventual**.
- **Your own profile edits** should obey **read-your-writes**, or users think saves failed ([replication lag](/t/replication-lag)).

## The trade-offs

- **Stronger models require coordination** (consensus, quorum reads, leader reads), which adds **latency** and reduces **availability** during network partitions ([CAP theorem](/t/cap-theorem)). Even without partitions, there's a latency-vs-consistency trade-off ([PACELC](/t/pacelc)).
- **Weaker models** let replicas respond locally and stay available, but **the application must tolerate or resolve** anomalies: stale reads, conflicts, reordering.

## Making it practical

- **Match the model to each operation**, not the whole system. Many databases let you choose per query or per table: read from the leader for critical reads, and from replicas for the rest.
- **Know what your database actually guarantees**. "Strong" and "eventual" are often used loosely. Read the documentation: what happens on failover, with replicas, across regions?
- **Design the UI and API** for the weaker guarantees you choose (optimistic updates, "processing" states, conflict handling).
- **Use ordering mechanisms** such as versions and logical clocks to detect conflicts ([logical clocks](/t/logical-clocks)).
- **Test failure scenarios.** Consistency bugs appear only under concurrency and faults.

The question to ask for any piece of data: **what's the worst thing that happens if a reader sees an old or out-of-order value?** The answer tells you how strong the guarantee needs to be.
