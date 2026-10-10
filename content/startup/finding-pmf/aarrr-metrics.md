---
title: "AARRR Metrics"
summary: "Acquisition, Activation, Retention, Referral, Revenue: a simple funnel for a young product."
levels: { tech-entrepreneur: mvp }
aliases: ["AARRR", "pirate metrics", "Dave McClure"]
prereqs: ["funnel-analysis", "business-model"]
related: ["funnel-analysis", "activation", "retention-curve", "unit-economics"]
---

**AARRR** (from Dave McClure) tracks a product through five stages: Acquisition (users arrive), Activation (first value moment), Retention (they return), Referral (they invite others), Revenue (someone pays). One metric per stage turns "growth is slow" into a located problem — the leaky stage shows itself instead of hiding in an average.

```text
1000 arrive → 300 activate → 120 return → 20 refer → 8 pay
fix the stage with the worst relative drop, not the whole funnel at once
```

Its power is focus: a team can only fix one stage at a time, and AARRR says which. Acquisition problems need distribution work; activation problems need onboarding; retention problems need product value; referral problems need delight worth sharing; revenue problems need pricing and packaging.

The classic mistakes:

- Optimizing stages out of order. Pouring acquisition into 5% activation burns money visibly. Fix downstream first: retention before referral, activation before acquisition — leaky buckets first.
- Same metric for every business. AARRR fits transactional products; marketplaces, SaaS and social bend it (supply-side funnels, expansion stages). Adapt the letters; keep the discipline of staged measurement.
- Stage averages hiding segments. Overall activation flat while new-channel users convert triple — aggregate AARRR lies the way all aggregates do. Cut by segment and cohort ([cohort analysis](/t/cohort-analysis)).
- Referral assumed viral. Most products are not viral; referral rows stay near zero honestly. Do not design growth around a loop the product cannot sustain — see [viral loop](/t/viral-loop) for when it actually applies.

**Run it monthly:** one number per stage, trend per stage, one stage chosen to fix. When a stage sustains health for quarters, graduate to deeper instrumentation ([cohorts](/t/cohort-analysis), [funnels](/t/funnel-analysis)) and pick the next bottleneck.
