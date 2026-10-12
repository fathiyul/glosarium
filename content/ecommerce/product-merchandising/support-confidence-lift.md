---
title: "Support, Confidence & Lift"
summary: "The three numbers that separate 'they sell together' from 'they sell together *because*.'"
levels: { data-analyst: mid-level, data-scientist: mid-level }
prereqs: ["market-basket-analysis"]
related: ["market-basket-analysis", "attach-rate", "association-rules", "ab-testing"]
---

Support, confidence and lift are the measuring tape of [market basket analysis](/t/market-basket-analysis) — and the pair that makes or breaks the "frequently bought together" decision.

```text
basket 10,000 orders
  support(A,B) = 120/10,000 = 1.2%    (pair is common)
  confidence(A→B) = 120/1,000 with A = 12%   (A buyers often take B)
  lift = 12% / 4% (B overall) = 3.0    (A buyers take B 3× more than chance)
```

Each answers a different question: support = "is this pair big enough to matter?" (volume), confidence = "if they buy A, how likely is B?" (conditional behavior), lift = "is the co-occurrence actually *associated*, or is B just bought by everyone?" (causal flavor). The classic ranking error is sorting by confidence and promoting the popular add-on (every basket includes the phone case: confidence 90%, lift ~1 — no information); lift ranks by the *surprise*.

The statistical honesty checklist:

- **Multiple comparisons** — with thousands of pairs, some at "lift 5" on support 0.1% are noise; set a support floor and treat low-support high-lift as a hypothesis to test, not a widget to ship.
- **Direction** — confidence(A→B) ≠ confidence(B→A); the kettle→filter-liquid direction is the cross-sell; the reverse is a replenishment prompt; one table, two plays.
- **Confounders** — promos co-schedule items ("flash-sale bundle A+B") and manufacture associations that are calendar artifacts; run on non-promo periods or hold promo pairs out ([incremental reasoning again](/t/incremental-revenue)).

Data scientists: lift generalizes into the recommendation scoring layer (PMI-style weighting, co-occurrence embeddings); the same caveats scale. Analysts: the business question is never "what is the lift?" but "expected margin per surfaced impression" — lift × basket-rate × margin, ranked; then prove the widget works with a real [A/B test](/t/ab-testing), because correlation found the pair, and only causation ships it.
