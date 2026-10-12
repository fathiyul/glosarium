---
title: "Prescriptive Analysis"
summary: "Recommending actions, not just predictions."
core: [data-scientist]
levels: { data-analyst: senior , data-scientist: junior }
aliases: ["prescriptive analysis", "prescriptive analytics", "decision optimisation"]
prereqs: ["predictive-analysis", "scenario-analysis"]
related: ["predictive-analysis", "scenario-analysis", "causal-inference", "decision-rule"]
---

**Prescriptive analysis** goes one step past prediction: given what will probably happen, what should we *do*? It pairs a predictive model with constraints and an objective — inventory targets with warehouse capacity, staffing with demand forecasts, prices with elasticity estimates — and recommends the action that optimises the outcome.

```text
predictive:   "demand will be 1,200 units"          (a number)
prescriptive: "order 1,350 given lead times, holding cost and stockout cost"  (a decision)
```

The optimisation is only as honest as its objective. Minimising cost while ignoring service levels produces a brilliant plan to have empty shelves; maximising revenue while ignoring risk produces concentration. Elicit the real objective — including the constraints nobody wrote down — before solving, or the optimal answer solves the wrong problem.

The classic mistakes:

- Prescribing from a prediction nobody validated. An optimisation faithfully amplifies its inputs, including their errors. The predictive layer must earn trust first (see [predictive analysis](/t/predictive-analysis)).
- Hidden constraints. The model's "optimal" rota ignores the union rules, the school run, the one engineer who cannot do nights. Involve the people living inside the constraints or the plan dies on contact.
- No [causal](/t/causal-inference) basis. Optimising over correlations prescribes levers that do not move anything. The response curves must be causal, not associative.
- Black-box recommendations. "The model says order 1,350" with no reasoning gets overridden the first time it looks odd. Expose the drivers and the trade-off so humans can audit the advice.
- One-shot prescription. Conditions move; a plan frozen at solve time decays. Re-solve on a schedule or on trigger, with the decision rule agreed up front.

**When not to use it:** when the decision is reversible and cheap (just decide), when the objective cannot be stated honestly, or when stakeholders will not cede the call to analysis anyway. Prescription earns its complexity only where the decision is hard, repeated and consequential.
