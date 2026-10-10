---
title: "Sensitivity Analysis"
summary: "Finding which assumptions your conclusion actually depends on."
levels: { data-analyst: mid-level }
aliases: ["sensitivity analysis", "tornado chart", "what-if on inputs"]
prereqs: ["scenario-analysis", "descriptive-analysis"]
related: ["scenario-analysis", "forecasting", "decision-rule", "margin-of-error"]
---

**Sensitivity analysis** asks which inputs a conclusion is fragile to: vary each assumption across its plausible range and watch the outcome. If the decision survives every reasonable input, it is robust; if flipping one uncertain number flips the answer, that number — not the model — is what needs work.

```text
launch decision:  NPV positive unless churn > 8% or CAC > $120
                  → stop refining the model; go measure churn and CAC
```

Present it as a tornado chart: bars showing how far the outcome swings when each input moves from pessimistic to optimistic. The longest bars are the agenda — they say where further analysis actually pays and where precision is wasted.

The classic mistakes:

- Varying everything equally. A ±10% wiggle on a well-measured input and a wild guess deserve different ranges. Calibrate each input's range to its real uncertainty, or the chart ranks confidence instead of importance.
- One-at-a-time only. Inputs interact — high churn *and* high CAC together can break what each alone merely dents. Test the nasty combinations, not just single moves.
- Sensitivity as the decision. It maps fragility; it does not pick the answer. Pair it with a [decision rule](/t/decision-rule): which outcome ships, kills, or needs more data.
- Built on a model nobody validated. Sensitivity of a broken model is organised nonsense. The base case must be credible first (see [forecast accuracy](/t/forecast-accuracy)).

**How to use it:** run it before defending any model-backed recommendation. Walk in with "the answer holds unless X" rather than "the answer is Y" — it disarms the exact objection that would otherwise arrive mid-meeting.
