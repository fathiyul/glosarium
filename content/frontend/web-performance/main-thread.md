---
title: "Main Thread"
summary: "The single browser thread that runs JavaScript, layout and paint."
levels: { frontend: mid-level }
aliases: ["main thread", "ui thread", "browser main thread"]
prereqs: ["event-loop", "critical-rendering-path"]
related: ["long-tasks", "concurrent-rendering", "event-loop"]
---

The **main thread** runs almost everything users feel: JavaScript execution, DOM updates, style/layout calculation, painting — and input handling. It's largely one lane, so any occupant blocks the rest: a 200ms script means 200ms of dead clicks, frozen scroll and dropped frames.

```text
main thread: [JS][style][layout][paint][input?] — one at a time
blocked 200ms → input waits → jank the user feels
```

Performance engineering is mostly main-thread budgeting: less JS (split bundles, fewer third parties), less layout (batch reads/writes, transform animations), work moved elsewhere (workers, compositor, GPU), and idle time preserved for input.

The classic mistakes:

- Everything on the main thread. Parsing, computing, sorting and rendering stacked synchronously leaves no room for input. Offload compute (workers), defer non-critical (idle/split), slim the rest.
- Third-party sprawl. Each tag, widget and tracker consumes the same single lane. Audit aggregate main-thread cost; every addition spends shared budget.
- Layout in event handlers. Forced reflows inside scroll/input handlers multiply per-frame costs. Read once, write via rAF, animate compositor properties.
- Giant bundles parsed upfront. Parse/compile of megabytes blocks startup before any feature runs. Code-split by route; defer below-fold logic.
- Assuming workers fix architecture. Workers help compute, not DOM — layout, paint and JS-DOM interaction stay main-thread. Move what's movable; slim the rest.
- No input-priority thinking. Background syncs and analytics competing equally with typing degrades feel. Prioritise input (yield, schedule low, debounce the rest).
- Measuring thread idle, not input delay. Low average utilisation with periodic 300ms blocks still janks. Measure worst-case blocking (long tasks, interaction latency), not means.

**The mental model:** one lane, shared by code, rendering and input — every millisecond spent is a millisecond users can't interact. Budget it like the scarce resource it is.
