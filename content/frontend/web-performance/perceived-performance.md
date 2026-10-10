---
title: "Perceived Performance"
summary: "Making waits feel shorter with skeletons and instant feedback."
levels: { frontend: mid-level }
aliases: ["perceived performance", "perceived speed", "felt performance"]
prereqs: ["performance-budget", "fcp"]
related: ["skeleton-screen", "stale-while-revalidate", "real-user-monitoring"]
---

**Perceived performance** is how fast the experience *feels*, which diverges from measured time constantly: instant feedback with background work feels faster than a shorter wait with none; progressive content beats blank-then-everything; a responsive 800ms beats a frozen 500ms. Optimising perception often beats optimising clocks.

```text
same 900ms:  spinner → content   feels slow
             instant shell → progressive fill → feels fast
```

The techniques are psychological and structural: respond to input immediately (optimistic UI, instant navigation states), reveal progressively (shells, skeletons, streaming), prioritise the viewport (above-fold first), and never leave users guessing (progress for waits over a second, done well under).

The classic mistakes:

- Spinners for everything. Blank screens with throbbers maximise felt slowness. Show structure instantly (shells), fill progressively.
- No input acknowledgement. Buttons that do nothing visible for 500ms get clicked five times. Acknowledge in milliseconds (state change, navigation start), complete when ready.
- Optimistic without honesty. Fake success that fails later betrays trust worse than waiting. Optimistic for likely-success with graceful rollback, never for consequential actions without confirmation paths.
- Skeletons that lie. Placeholder shapes wildly unlike final content cause layout shift and confusion when swapped. Skeletons should mirror structure.
- Ignoring the slowest moments. Optimising median interactions while checkout still freezes misses where perception forms. Fix the felt-critical paths first.
- Motion as decoration. Gratuitous animation delays felt completion; purposeful motion (guiding attention during waits) shortens it. Animate meaningfully or not at all.
- Measuring clocks, not feelings. Lab timings improving while interaction feedback stays poor means users notice nothing. Pair metrics with interaction-quality review.

**The principle:** acknowledge instantly, progress visibly, complete honestly. Felt speed comes from feedback and progress — engineer those as deliberately as bytes and queries.
