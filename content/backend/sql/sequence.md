---
title: "Sequence"
summary: "A database object that generates increasing numbers, used for auto-increment IDs."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["sequence", "database sequence", "auto increment"]
prereqs: ["primary-key", "uuid-vs-autoincrement"]
related: ["transaction", "natural-vs-surrogate-key"]
---

A **sequence** is a database object that hands out incrementing numbers on demand — the engine behind auto-increment IDs. Each `nextval` returns the next value; it's often used to generate primary keys or order numbers without a round-trip to compute the maximum.

```text
nextval('order_id_seq') → 1001
nextval('order_id_seq') → 1002
```

Sequences have useful properties: allocation is fast and concurrent (multiple transactions can request values without blocking each other), and you can set a start, increment, and cycle. They're also usable independently of any table, so you can share one counter across several tables or generate numbers before a row exists.

The classic mistakes:

- Expecting gapless numbers. Sequences are **not** transactional: a rolled-back transaction still consumes a value, and cached values can be lost on restart. So a sequence produces **gaps**. Never treat it as a receipt number where gaps are unacceptable — generate those differently (and serialise if you must).
- Assuming order reflects commit order. A lower sequence value doesn't mean "created earlier"; transactions interleave. Don't sort by ID and infer time — store a timestamp.
- Using a sequence where UUIDs fit. If you need distributed generation or non-guessable IDs, a sequence (a single authoritative counter) doesn't fit; see [UUID vs auto-increment](/t/uuid-vs-autoincrement).
- Caching values without understanding the trade-off. Larger caches reduce contention but lose more values on restart, widening gaps.
- Assuming portability. Sequence behaviour, caching and `nextval` semantics differ across databases; check before relying on specifics.
- Confusing it with the primary key. A sequence *generates* values; whether it's the key, and how uniqueness is enforced, is a separate schema decision (see [primary key](/t/primary-key)).

**When to use it:** for efficient, concurrent surrogate-key generation and simple counters where gaps are acceptable — which is most of the time. If you need gapless numbering or a business-meaningful identifier, that's a different problem requiring a locked counter or a different scheme. See [natural vs surrogate key](/t/natural-vs-surrogate-key).
