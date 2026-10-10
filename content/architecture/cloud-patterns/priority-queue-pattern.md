---
title: "Priority Queue Pattern"
summary: "Processing urgent messages before others."
levels: { backend: senior }
aliases: ["priority queue pattern", "prioritised queues", "multi-priority queue"]
prereqs: ["message-queue", "load-shedding"]
related: ["message-queue", "competing-consumers", "load-shedding"]
---
The **priority queue pattern** serves important work first: separate queues (or prioritised ordering) per class — interactive over batch, paying over free, blocking-user over background — with workers draining high priority first and lower classes getting remaining capacity. Overload degrades the unimportant, never the critical.

```text
[high] password resets, checkout → workers first
[low]  digests, reindexing → remaining capacity (or shed)
```

Implementations span strict priority (drain high fully first — starves low under sustained load), weighted fair sharing (proportional capacity — low always progresses), and lane separation (dedicated workers per class — strongest isolation, least efficiency). Starvation guards (aging, minimum shares) keep low priority alive.

The classic mistakes:

- Single queue for mixed criticality. Password resets behind newsletter blasts delay what matters. Separate by criticality from the start.
- Strict priority without starvation guards. Sustained high-priority load starves low forever (reindexing never completes, digests never send). Minimum shares or aging.
- Priority inversion. Low-priority work holding locks/resources high-priority needs (shared pool, same rows) blocks the important. Isolate resources per class too.
- Too many classes. Seven priorities nobody can rank consistently collapse into arbitrariness. Three-ish classes (critical, normal, background) stay decidable.
- Unclassified producers. New workloads defaulting to high priority inflate the top class until it means nothing. Default normal; promote deliberately.
- Ignoring FIFO within class. Same-priority ordering still matters (oldest first, or explicit sequencing). Priority selects the class; policy orders within.
- No shedding policy. Priority queues delay low work; sustained overload still needs shedding (drop/expire low with visibility). Prioritise, then shed explicitly.

**How to apply it:** classify by user impact, drain high first with starvation guards, isolate resources per class, shed low loudly. Important work first — by construction under any load.
