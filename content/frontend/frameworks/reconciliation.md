---
title: "Reconciliation"
summary: "How a framework works out what changed between renders."
levels: { frontend: mid-level }
aliases: ["reconciliation", "diffing", "vdom diff"]
prereqs: ["virtual-dom", "dom"]
related: ["virtual-dom", "concurrent-rendering", "diffing-algorithm"]
---

**Reconciliation** is the diffing step: given last render's description and this render's, decide the minimal DOM operations (insert, move, update, remove) to converge them. Keys identify siblings across renders (`key="id"` — stable identity for reorderable lists); types decide replacement (different component type → unmount and remount).

```text
old: [A(1) B(2) C(3)]   new: [B(2) C(3) A(1)]  + keys → two moves, zero remounts
same without keys → three updates in place (state scrambles)
```

Correctness and performance both hinge on identity: stable keys preserve component state across reorders; missing or index keys destroy and recreate (losing focus, input content, animation state) while *looking* fine.

The classic mistakes:

- Index keys on reorderable lists. Reordering with `key={i}` updates every row in place — inputs keep wrong values, focus jumps, animations replay. Key by stable id, always, for dynamic lists.
- Unstable keys. Random-per-render keys force full remounts every update — the worst performance bug that looks like correct code.
- Type churn. Conditionally rendering different component types at the same position unmounts and remounts (state lost). Keep types stable; vary props.
- Assuming minimal DOM ops equal cheap. Reconciliation avoids *DOM* work, but diffing huge trees still costs JS time. Virtualise or memoise large lists regardless.
- Keys suppressing needed resets. Sometimes remount *is* wanted (form reset on user change) — changing key intentionally resets state. Use the mechanism deliberately both ways.
- Cross-framework assumptions. Key semantics and diff heuristics differ subtly across frameworks. Learn yours; don't port habits blindly.
- Ignoring the commit phase. Reconciliation decides *what*; commit applies it (layout, effects). Expensive effects and layouts after a big diff still jank — schedule accordingly.

**The rule:** stable keys for identity, stable types for state, and diffing as the framework's job to feed well-shaped trees. Identity is the whole game.
