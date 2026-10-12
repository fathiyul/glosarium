---
title: "Segmentation"
summary: "Splitting users or customers into groups that behave differently."
core: [data-scientist]
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["segmentation", "customer segmentation", "user segments"]
prereqs: ["descriptive-analysis", "group-by"]
related: ["rfm-analysis", "cohort-analysis", "diagnostic-analysis", "confounding-variable"]
---

**Segmentation** splits a population into groups that behave differently enough to deserve different treatment: by plan tier, acquisition channel, company size, behaviour. Averages lie across heterogeneous groups; segments tell the truth piece by piece — and mismatched segments explain most "the data contradicts itself" moments.

```text
overall conversion: 4.2% (flat)
enterprise: 1.1% ↓   self-serve: 5.8% ↑   → two opposite stories, one average
```

Segments must earn their keep: each one should differ on the outcome you care about *and* imply a different action. A segmentation nobody uses to decide anything is taxonomy for its own sake. Start with business-natural cuts (tier, channel, tenure) before algorithmic clustering — interpretable segments get used, clever ones get admired.

The classic mistakes:

- Segments that describe but do not discriminate. Cutting by attributes that do not move the outcome adds complexity without insight. Validate: do the groups actually behave differently?
- Too many segments. Twenty micro-segments, each too small to measure or act on. Merge until every segment is big enough to matter and small enough to treat distinctly.
- Confounding the segment with the cause. Enterprise converts worse — because of the segment, or because enterprise gets the slow sales process? Segments describe; [causal claims](/t/correlation-vs-causation) need more.
- Static segments for moving users. A "new user" segment means something different at day 1 and day 90. Recompute or graduate users on a schedule.
- [Simpson's paradox](/t/simpsons-paradox) in reverse. Segments can also mislead when the real driver cuts across them. Check the alternative cut before concluding.

**When to go further:** behavioural clustering for discovery, [cohorts](/t/cohort-analysis) when time since an event is the dimension, [RFM](/t/rfm-analysis) for a fast commercial cut. Segmentation is the lens; pick the lens that changes the decision.
