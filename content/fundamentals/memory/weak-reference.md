---
title: "Weak Reference"
summary: "A reference that doesn't keep its object alive."
levels: { backend: senior, frontend: senior }
aliases: ["weak reference", "weakref", "weak pointer"]
prereqs: ["reference-counting", "garbage-collection"]
related: ["memory-leak", "observer-pattern", "object-pool", "closure"]
---

A **weak reference** points at an object *without* keeping it alive. Where a strong reference raises the object's [reference count](/t/reference-counting) and prevents it from being freed, a weak reference stays out of the count: if only weak references remain, the object is collected and the weak reference becomes empty.

That solves two common problems:

- **Reference cycles.** If two objects hold strong references to each other, neither count reaches zero and both leak. Making one side's link weak breaks the cycle so the objects can be freed.
- Back-references and caches. A child holding a strong link to its parent, or a cache holding strong links to its entries, would keep everything alive forever. Weak links let the object disappear when nothing else needs it.

```text
parent ──strong──▶ child
parent ◀──weak──── child      # child doesn't keep parent alive

# using a weak ref: check it's still alive first
if let Some(obj) = weak.upgrade() { use(obj) }
```

The critical discipline is that a weak reference can become empty at any time, so you must check before dereferencing. Languages expose this differently: an optional / `upgrade()` that returns nothing if the target is gone, or a reference that must be "kept" first.

The classic mistakes:

- Dereferencing without checking. Assuming the object is still there is exactly the bug weak references exist to help you avoid. Always test, and handle the "gone" case.
- Using a weak reference for something you need. If the code genuinely requires the object, a weak reference is wrong — it might vanish under you. Weak is for *optional* links.
- Expecting deterministic disappearance. When a weak reference empties depends on the collector (or, with counting, the moment the last strong ref goes). Don't rely on a precise timing.
- Forgetting weak doesn't break all cycles. It breaks the one link you marked weak. A more tangled cycle needs the right weak link, or a cycle-collecting GC.
- Building a cache of weak entries and being surprised it's empty. A cache whose keys are only weakly held *should* drop them under memory pressure; that's the feature, not a bug.

Weak references are a targeted tool: mark the back-edges in object graphs (children→parent, observers→subject, cache→entry) as weak, and let the normal strong references define lifetime. Done right, they turn leaks into automatic cleanup; done carelessly, they hand you a null when you least expect it.
