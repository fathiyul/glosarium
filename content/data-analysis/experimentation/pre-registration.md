---
title: "Pre-registration"
summary: "Writing down the analysis plan before seeing the data."
levels: { data-analyst: senior }
aliases: ["pre-registration", "preregistration", "analysis plan"]
prereqs: ["experiment-design", "hypothesis-testing"]
related: ["experiment-design", "decision-rule", "hypothesis-testing", "peeking-problem"]
---

**Pre-registration** means writing down the hypothesis, primary metric, analysis method and decision rule *before* the data arrives — and timestamping it where others can see. It separates decisions made with knowledge from decisions retrofitted to results, which is the only thing standing between analysis and story-telling with extra steps.

```text
before launch:  metric X, method Y, rule "ship if +2% significant" — written, dated
after launch:   run exactly that. Deviations get their own dated note.
```

The mechanism is commitment, not bureaucracy. A short dated paragraph beats a ten-page template nobody reads; what matters is that the plan predates the result, so a "significant" finding cannot quietly become the hypothesis it was never designed to test.

The classic mistakes:

- Pre-registering everything equally. Exploratory work needs freedom to follow the data; confirmatory tests need chains. Pre-register the tests that will move decisions, and label the rest exploratory.
- Vague plans that permit anything. "We will analyse engagement" pre-registers nothing — any metric that moves can be crowned afterwards. Name the metric, the method and the rule precisely enough that someone else could run it.
- Treating the plan as unchangeable. Legitimate reasons to deviate appear (a bug, a broken variant). Deviate openly: note what changed, why, and what the original plan said — the audit trail is the point.
- No decision rule. A plan without a rule ("ship if…") is a prediction, not a commitment. End every pre-registration with the action each outcome triggers.
- Confusing it with [peeking](/t/peeking-problem) prevention only. Pre-registration also stops metric-shopping, subgroup-hunting and hypothesis-swapping — the whole family of result-contingent choices.

**The habit:** no confirmatory analysis without a dated plan. It costs minutes, and it is the cheapest credibility an analyst can buy — see [experiment design](/t/experiment-design) for what the plan should contain.
