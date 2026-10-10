---
title: "Clarifying Requirements"
summary: "Asking what the system must do, and at what scale, before designing it."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["clarifying requirements", "requirements clarification", "asking questions"]
prereqs: ["system-design", "system-design-interview"]
related: ["system-design", "non-functional-requirements", "capacity-planning"]
---
**Clarifying requirements** means nailing down what to build before designing it: functional scope (which operations, which reads vs writes), scale (users, data, throughput), and constraints (latency, consistency, budget) — asked explicitly, because the same prompt ("design a URL shortener") describes a weekend project and a global service depending on the numbers.

```text
"design X" → users? reads/writes per second? data size? latency? consistency?
→ scope + numbers → design
```

The questions shape everything downstream: read-heavy vs write-heavy picks storage and caching; strong-vs-eventual consistency picks coordination; the scale picks single-box vs distributed. Designing without them optimises for imaginary constraints and misses the real ones.

The classic mistakes:

- Jumping to components. Drawing boxes before knowing the scale produces generic diagrams that fit nothing. Numbers first, boxes second.
- Vague scale acceptance. "Millions of users" without reads/writes per second, data sizes and growth can't size anything. Ask for rates, sizes and ratios.
- Ignoring the read/write ratio. 100:1 read-heavy and 1:1 balanced demand opposite architectures; the ratio is the single most informative number.
- Forgetting non-functional needs. Latency targets, availability, durability and compliance constrain as hard as features. Ask.
- Over-constraining. Demanding bank-grade consistency for a like counter wastes the design. Match guarantees to actual harm.
- No scope boundaries. "And notifications, and analytics, and…" — endless scope creep kills the exercise. Time-box features; defer explicitly.

**How to do it:** functional scope, then scale numbers (users, QPS, storage, bandwidth), then constraints (latency, consistency, availability). Five minutes of questions saves an hour of wrong design — in interviews and in real projects alike.
