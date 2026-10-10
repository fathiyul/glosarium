---
title: "Virtual DOM"
summary: "An in-memory UI tree diffed to find the minimal real DOM updates."
levels: { frontend: mid-level }
aliases: ["virtual dom", "vdom", "virtual-dom"]
prereqs: ["dom", "reconciliation"]
related: ["reconciliation", "diffing-algorithm", "memoization"]
---

The **Virtual DOM** is a lightweight description of UI (plain objects) re-created on every render, diffed against the previous description, with differences patched into the real DOM. Developers write declarative "given state, UI is this" code; the framework minimises actual DOM operations — the expensive part — behind the scenes.

```text
render(state) → vdom tree → diff vs last → patch real DOM (few ops)
```

Its value is developer experience plus good-enough performance: whole-tree re-rendering made affordable by cheap diffing. Its costs are diff overhead itself (large trees still cost JS time) and the abstraction gap (real DOM behaviour — focus, scroll, animations — needs escape hatches).

The classic mistakes:

- Assuming it makes everything fast. Diffing 10,000 nodes still costs; the vdom avoids *DOM* thrash, not *work*. Virtualise, memoise and split regardless.
- New object identities every render. Inline objects/arrays as props defeat memoisation and force child diffs. Hoist constants, memoise callbacks.
- Keys wrong or missing. Without stable keys, reordered lists remount and scramble state (see [reconciliation](/t/reconciliation)). Identity is the diff's anchor.
- Fighting it with manual DOM. Direct DOM mutation under a vdom renderer gets overwritten or desynchronises. Mutate through state; use refs/escape hatches for the genuinely imperative (focus, media, third-party widgets).
- Huge single trees. One component rendering the whole page diffs the whole page per keystroke. Split trees so updates stay local.
- Ignoring the commit cost. Diffing decides; commit applies (layout, paint, effects). Big patches still jank — schedule and slim them.
- Choosing by vdom alone. Fine-grained (signals) and compiled approaches skip diffing with different trade-offs. Match the renderer to update patterns, not hype.

**What it is:** a programming model (declarative re-render) with a performance strategy (diff + patch). Write pure renders of state, key identities, memoise boundaries — and let the diff do the economising.
