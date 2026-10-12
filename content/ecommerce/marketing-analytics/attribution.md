---
title: "Marketing Attribution"
summary: "Deciding which touchpoints get credit for a sale — a choice, not a measurement."
levels: { data-analyst: senior, data-scientist: mid-level }
aliases: ["attribution model", "conversion attribution", "touchpoint credit"]
prereqs: ["ctr"]
related: ["roas", "marketing-mix-modeling", "incremental-revenue", "holdback-group", "vanity-metrics"]
---

Attribution assigns credit for a conversion across the touchpoints that preceded it. Every platform does it, every dashboard shows it — and none of them is measuring, they're **choosing** a rule:

```text
last-click    the final touch takes 100%  → retargeting & branded search win
first-click   the opener takes 100%       → discovery channels win
linear        equal split                 → "fair", uninformative
time-decay    more to recent touches      → leans mid/late funnel
position-based 40/20/40 first-last rule   → both ends win
data-driven   modeled shares (Markov chains, Shapley values)
```

Why it's a choice and not a fact: the counterfactual is unknown. A customer clicked ad → email → search → bought. "Which caused it?" has no observational answer — every model splits the same apple differently, and each one's winner is whoever its rule favors. Branded-search harvesting is the classic: last-click models credit the brand-keyword campaign for demand the *other* ads created, because the searcher typed the name after seeing a feed ad.

The senior-analyst habit: run attribution questions through the **budget**, not the report. "Should we move spend to the best-attribution channel?" is an incrementality question ([incremental revenue](/t/incremental-revenue)) — pause the channel, keep a [holdout](/t/holdback-group), watch total revenue, and let MER tell you if the loss was real ([marketing efficiency ratio](/t/marketing-efficiency-ratio)). Attribution then explains *where* the effect sits in the funnel, not *whether* it exists.

Data scientists modeling data-driven attribution: the "causal" flavor (Markov removal effects, algorithmic split by platform) still inherits the platform's own tracking, consented-data gaps and self-serving conversion definitions. Treat model output as a better prior for allocation, and expect large shifts when iOS-style privacy rules remove touchpoints.

When attribution genuinely helps: within one platform's ecosystem, comparing creative/audience paths on a constant rule; sequencing email/SMS cadence; flagging channels whose credit collapses under a stricter model — that's your cannibalization signal. The [vanity-metrics](/t/vanity-metrics) warning exists for a reason: cross-platform ROAS sums are fiction with decimals.
