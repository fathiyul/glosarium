---
title: "Byzantine Fault"
summary: "Nodes that behave arbitrarily or maliciously."
levels: { backend: principal, data-engineer: principal }
aliases: ["byzantine fault", "byzantine failure", "arbitrary fault"]
prereqs: ["consensus", "quorum"]
related: ["consensus", "paxos", "zero-trust"]
---
A **Byzantine fault** is arbitrary misbehaviour: not just crashes, but lies — corrupted messages, malicious nodes, equivocation (telling different stories to different peers). Named for generals with traitors among them, it's the fault model for adversarial settings: blockchains, cross-organisation consensus, and any system where participants may be compromised rather than merely dead.

```text
crash fault:    node stops (detectable silence)
byzantine fault: node lies differently to each peer (needs 3f+1 to tolerate f)
```

Tolerance costs more than crash tolerance (3f+1 nodes per f traitors, extra protocol rounds), so use it where adversaries are realistic — permissionless or multi-party systems — and stick with crash-fault protocols (Raft/Paxos) inside single trust domains.

The classic mistakes:

- Byzantine protocols for crash problems. Paying 3f+1 and protocol complexity inside one company's datacenter buys nothing over Raft. Match the fault model to the adversary.
- Crash assumptions in adversarial settings. Majority votes among potentially-lying nodes decide nothing; equivocation defeats naive quorums. Use BFT protocols (or trust boundaries) where lies are possible.
- Ignoring the network adversary. Byzantine models often assume bounded message delay manipulation; real attackers partition, delay and replay. Model the network too.
- Key management gaps. BFT identity rests on keys; compromised key infrastructure voids protocol guarantees. Harden PKI with the same seriousness as the protocol.
- Performance optimism. BFT throughput/latency trails crash protocols significantly; capacity-plan for the protocol's reality, not its marketing.
- Assuming blockchains equal BFT understanding. Using a chain doesn't confer its guarantees to surrounding systems (oracles, bridges, clients) — each link needs its own fault model.
- Forgetting recovery. Detected traitors need exclusion and reconfiguration paths; a protocol that tolerates but never expels degrades permanently.

**When to assume it:** multi-party, permissionless or compromise-plausible settings. Everywhere else, crash-fault tolerance plus good security buys the same safety cheaper.
