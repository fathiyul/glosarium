---
title: "Persistent Data Structure"
summary: "An immutable structure that shares unchanged parts between versions."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["persistent data structure", "immutable data structure", "structural sharing"]
prereqs: ["immutability", "binary-search-tree"]
related: ["functional-programming", "memento-pattern"]
---

A **persistent data structure** is one that keeps its previous versions available after you "modify" it. Instead of changing the structure in place, an update returns a *new* version that shares the unchanged parts with the old one — **structural sharing**. It's how immutable collections stay efficient rather than copying everything on every change.

```text
v1: [a b c d]
update b → v2: [a B c d]
v1 still valid, unchanged; v2 shares most nodes with v1
```

The key insight is that copying an entire immutable structure on each update would be far too expensive. Structural sharing means only the path from the root to the changed node is new; everything else is reused. A balanced-tree-based map can produce a new immutable "version" in O(log n) instead of O(n).

Why it's useful:

- Cheap snapshots and undo. Every prior version is just a reference — no copying. This underlies version control and time-travel debugging, and the [memento pattern](/t/memento-pattern).
- Safe sharing across threads. An immutable value never changes under you, so it can be read by many threads without locks.
- Efficient change detection. Two versions share most nodes, so "did this change?" can be answered by comparing roots in O(1).
- Functional programming. Functional languages build on these structures because their values are immutable by default.

The classic mistakes:

- Assuming "immutable" means "copies everything". That's exactly what structural sharing avoids. Naive copying is slow; persistent structures are not.
- Reaching for them when mutation is fine. In a single-threaded, hot loop, a mutable array is simpler and faster. Persistence earns its place when you need old versions or sharing.
- Ignoring the constant factors. They're efficient asymptotically but do more allocation and pointer work than a mutable array; sometimes that matters.
- Confusing persistence with durability. Here "persistent" means *versions persist in memory*, not data saved to disk. Same word, different meaning.
- Building them by hand. Correct persistent trees are subtle; use a library.

Persistent data structures are the reason immutability is practical: you get snapshots, safe sharing and easy undo without paying to copy the world. They're central to [functional programming](/t/functional-programming) and to state management in modern UI frameworks, and they pair naturally with any design that values history.
