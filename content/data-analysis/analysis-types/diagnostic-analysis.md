---
title: "Diagnostic Analysis"
summary: "Figuring out why a number moved."
levels: { data-analyst: mid-level }
aliases: ["diagnostic analysis", "root cause analysis for metrics", "why did it move"]
prereqs: ["descriptive-analysis", "segmentation"]
related: ["segmentation", "correlation-vs-causation", "funnel-analysis", "metric-discrepancy"]
---

**Diagnostic analysis** starts where description ends: the number moved — why? A conversion dip, a churn spike, a cost jump. The job is decomposing the change into pieces until the pieces point at a cause: which segment moved, when it started, what changed around then.

```text
metric moved → cut by segment (who moved?) → cut by time (when exactly?)
           → list what changed then → test each candidate → cause or next test
```

Work the decomposition in order. Segment first (a total that moved usually means one segment moved a lot), then time (the exact start rules out most theories), then candidate causes ranked by timing fit. Each candidate gets a check, not a story: if the deploy caused it, the affected surface should show it and unaffected surfaces should not.

The classic mistakes:

- Stopping at the first plausible cause. The campaign launched the same week the metric moved — and so did the pricing test and the outage. Correlation with timing is a suspect list, not a verdict (see [correlation vs causation](/t/correlation-vs-causation)).
- Averaging away the answer. The total barely moved while two segments swung opposite. Decompose before theorising.
- Asking "why" of a noisy number. Small moves in volatile metrics have no cause worth finding. Check the move is real (bigger than normal variation) before spending days on it.
- Confusing metric bugs with business moves. A tracking change, a definition edit or a backfill looks exactly like a business event. Rule out [measurement changes](/t/metric-discrepancy) first — it is the cheapest hypothesis to test.
- No write-up. The diagnosis that lives in chat gets re-derived next quarter. Record cause, evidence and what would change your mind.

**When to stop:** when the evidence picks one cause over the alternatives *and* the finding changes a decision. A perfect causal account nobody acts on was entertainment; a good-enough one that ships a fix was analysis.
