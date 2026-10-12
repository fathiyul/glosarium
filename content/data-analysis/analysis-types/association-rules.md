---
title: "Association Rules"
summary: "Finding which items tend to appear together, and how weak 'tends to' really is."
core: [data-scientist]
levels: { data-analyst: senior , data-scientist: junior }
aliases: ["association rules", "market basket analysis", "affinity analysis"]
prereqs: ["segmentation", "correlation-vs-causation"]
related: ["correlation-vs-causation", "segmentation", "causal-inference", "recommendation-system"]
---

**Association rules** find items that co-occur: customers who buy X also buy Y. The classic output reads "people who bought diapers also bought beer" — support (how often the pair occurs), confidence (how often Y follows X), and lift (how much more than chance). Retailers use it for placement and bundles; streaming services for "because you watched" rows.

```text
rule: diapers → beer   support 2% (of all baskets)   confidence 60%   lift 3.2×
read:  common enough to matter, usually together, 3× more than chance
```

Lift is the number that prevents embarrassment: high confidence with lift near 1.0 means Y is just popular, and the "rule" fires on everyone. A rule needs all three — frequent enough to act on, reliable enough to trust, surprising enough to matter.

The classic mistakes:

- Confusing association with causation. The rule says the items travel together, not that stocking one sells the other. Acting on it (bundles, promos) is an intervention that needs its own test — see [correlation vs causation](/t/correlation-vs-causation).
- Trivial rules. "Phone charger → phone case" restates the catalogue. Filter for rules that change a decision, not ones that describe the obvious.
- Thresholds that manufacture findings. Lower support/confidence cutoffs until rules appear, and noise arrives dressed as insight. Fix thresholds before mining, and validate on fresh baskets.
- Ignoring the base rate. A 90%-confidence rule on an item everyone buys says nothing. Lift exists precisely to adjust for popularity — always report it.
- Stale affinities. Tastes shift seasonally; last year's bundle logic misfires this year. Re-mine on a schedule, and expire rules like inventory.

**When not to use it:** when you need personalised ranking rather than global rules (that is a [recommendation system](/t/recommendation-system)), or when the decision needs causality rather than co-occurrence. Association proposes; experiments dispose.
