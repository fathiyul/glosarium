---
title: "List Virtualization"
summary: "Rendering only the visible rows of huge lists."
levels: { frontend: mid-level }
aliases: ["list virtualization", "windowing", "virtual scrolling"]
prereqs: ["performance-budget", "dom"]
related: ["main-thread", "long-tasks", "resize-observer"]
---

**List virtualization** (windowing) renders only the rows in (and near) the viewport of a huge list — a few dozen DOM nodes standing in for thousands — recycling them as the user scrolls. Ten thousand rows become thirty, and scroll stays smooth because the DOM stays small.

```text
10,000 items, viewport shows 12 → render ~20 (visible + overscan)
scroll → recycle nodes, update content, translate positions
```

It requires measured row geometry (fixed heights, or measured variable ones) and a scroll container owned by the virtualizer — trading DOM size for bookkeeping: scroll position mapping, overscan tuning, and dynamic-height measurement.

The classic mistakes:

- Virtualising short lists. Hundreds of rows render fine natively; virtualization adds complexity (and accessibility quirks) for no gain. Virtualise in the thousands-plus.
- Unmeasured dynamic heights. Variable rows without measurement produce jumping scrollbars and misplaced items. Measure (see [Resize Observer](/t/resize-observer)) or fix heights.
- Breaking find-in-page. Browser search can't find unrendered rows — a real UX regression for long lists. Offer in-list search as compensation.
- Accessibility gaps. Virtual lists need row/rowgroup roles, aria-rowcount/index and keyboard navigation modelling the *full* list, not the window. Screen-reader users navigate data, not DOM.
- Overscan starvation. Too little overscan flashes blank on fast scrolls; too much defeats the purpose. Tune to scroll speed and row cost.
- State in recycled nodes. Row components holding unkeyed state show wrong data after recycling. Key by item id; keep state in data, not nodes.
- Ignoring non-scroll containers. Print, screenshots and text selection see only the window. Provide full-export alternatives where completeness matters.

**When to use it:** lists in the thousands where native rendering janks — data grids, feeds, logs. Small lists stay native; huge ones get windows, measured geometry and full-list accessibility modelling.
