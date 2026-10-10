---
title: "A/B Testing"
summary: "Comparing two variants with real users to see which performs better."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-analyst: mid-level , tech-entrepreneur: pmf }
also: [data-serving]
aliases: ["a/b testing", "ab testing", "split testing"]
prereqs: ["product-analytics", "feature-flags"]
related: ["product-analytics", "feature-flags", "user-research"]
core: [data-analyst]
---

**A/B testing** compares variants by random assignment: half the users see A, half see B, and a success metric decides. Done right it's causal evidence ("B lifts checkout 3%"); done casually it's noise worship — peeking, tiny samples and twelve metrics guarantee *something* "wins" by chance.

```text
randomise → expose → measure primary metric → pre-set duration/confidence
→ ship winner or learn nothing (both are outcomes)
```

Validity needs: real randomisation, one primary metric chosen upfront, adequate sample (powered in advance), full-duration runs (no peeking-then-stopping), and segmentation sanity (the win shouldn't concentrate in bots or one browser).

The classic mistakes:

- Peeking and stopping early. Checking daily and shipping the first green day inflates false positives enormously. Pre-commit duration and significance; respect them.
- Tiny samples. A hundred visitors can't detect a 2% lift — the test "fails" and the team concludes wrongly. Power the test or don't run it.
- Metric shopping. Twelve metrics guarantee a "winner" somewhere. One primary metric decides; others diagnose.
- Novelty and seasonality. New-UI curiosity bumps fade; holiday traffic behaves differently. Run full cycles (weeks, covering weekday/weekend) before concluding.
- Broken randomisation. Sticky buckets misassigned, bots included, internal traffic polluting — invalid randomisation invalidates everything. Verify assignment balance first.
- Ignoring segments. A global tie hiding a big mobile win (and desktop loss) misleads. Pre-plan key segments; read them secondarily.
- No rollback on flat. "No difference" still costs complexity. Ship the simpler variant, remove flags, keep the code clean.

**The discipline:** randomise properly, pre-register metric and duration, power adequately, run full cycles, ship or simplify. Experiments produce decisions — design them to decide.
