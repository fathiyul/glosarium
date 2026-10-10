---
title: "Long Tasks"
summary: "JavaScript running over 50 ms and blocking the main thread."
levels: { frontend: mid-level }
aliases: ["long tasks", "long task", "main thread blocking"]
prereqs: ["main-thread", "event-loop"]
related: ["main-thread", "concurrent-rendering", "observability"]
---

A **long task** is any main-thread occupation over 50ms — parsing a huge bundle, a mega-render, a synchronous loop. Beyond 50ms, input waits perceptibly: clicks feel delayed, typing stutters, animations hitch. Long tasks are the *unit* of jank, and the Performance API exposes them directly for measurement.

```text
task 120ms → input at 30ms waits 90ms → user feels the lag
```

Responsiveness metrics count their damage (total blocking time sums the over-50ms portions), and field data attributes poor interaction scores to exactly these tasks. The fix is always structural: split the work, move it off-thread, or do less.

The classic mistakes:

- Giant synchronous initialisation. Parsing, state hydration and first render stacked synchronously stall the page's first seconds. Chunk startup (idle callbacks, staged hydration, code-split routes).
- Mega-renders. Rendering thousands of nodes in one commit blocks regardless of framework. Virtualise, paginate, memoise boundaries.
- Synchronous data processing. Sorting/filtering megabytes on the main thread freezes UI. Workers for compute; main thread for presentation.
- Third-party pileups. Each tag's synchronous work adds up invisibly. Audit third parties with long-task attribution; defer or remove the worst.
- Measuring averages. Mean task time hides the 500ms monsters users remember. Track p95/max and count over-budget tasks.
- requestAnimationFrame misuse. Stuffing heavy work into rAF callbacks *creates* frame-busting tasks. rAF schedules visual updates; heavy lifting goes elsewhere.
- Scheduler API ignorance. `scheduler.yield()` and prioritised task scheduling let long work cooperate with input. Yield explicitly in chunked work.

**The practice:** measure long tasks in the field, attribute to code, then split (chunks + yields), relocate (workers), or remove. Responsiveness is the absence of long tasks, maintained deliberately.
