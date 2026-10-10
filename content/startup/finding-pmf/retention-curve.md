---
title: "Retention Curve"
summary: "Share of users still active over time; a curve that flattens is the clearest sign of fit."
levels: { tech-entrepreneur: pmf }
aliases: ["retention curve", "cohort retention", "flattening retention"]
prereqs: ["cohort-analysis", "retention-analysis"]
related: ["cohort-analysis", "false-product-market-fit", "activation", "churn-rate"]
core: [tech-entrepreneur]
---

A **retention curve** plots what share of a cohort is still active at each age: 100% at start, decaying as users leave. Curves that decay toward zero mean nobody stays — no fit, whatever growth says. Curves that **flatten** at a stable level mean a core of users found lasting value — the clearest quantitative sign of [product-market fit](/t/product-market-fit) there is.

```text
no fit:    100% → 40% → 15% → 5% → 2% → ~0%   (decays to zero)
fit:       100% → 55% → 38% → 32% → 30% → 30% (flattens: a third stays)
```

Read it by cohort and by segment, never blended: overall curves mix improving new cohorts with decaying old ones and hide both stories. Compare flattening levels across cohorts over time — rising floors mean the product is getting better at keeping people.

The classic mistakes:

- Defining "active" to flatter. Logged-in-but-idle, or any heartbeat event, inflates retention into meaninglessness. Active must mean real value received — define it strictly and never loosen it to improve a chart.
- Blended curves. One number across all cohorts and segments conceals the cohorts that flatten and the ones that die. Always cut by cohort age first ([cohort analysis](/t/cohort-analysis)).
- Reading too early. Week-two retention of a week-old cohort is noise with a chart. Wait for cohorts to age past the novelty window before judging the floor.
- Ignoring resurrection. Users returning after months (seasonal products, annual cycles) break simple decay reads. Define re-engagement explicitly rather than letting it smear the curve.
- Optimizing the curve cosmetically. Re-engagement spam and dark patterns lift short-term activity while destroying trust. Retention earned through value compounds; retention extracted does not.

**The verdict rule:** flat-ish floors, stable or rising across recent cohorts, built on strict activity definitions. That shape — more than any survey or spike — is what "it works" looks like in data.
