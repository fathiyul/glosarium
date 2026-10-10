---
title: "Scenario Analysis"
summary: "Testing decisions against several plausible futures instead of one forecast."
levels: { data-analyst: mid-level }
aliases: ["scenario analysis", "what-if analysis", "scenario planning"]
prereqs: ["forecasting", "sensitivity-analysis"]
related: ["forecasting", "sensitivity-analysis", "forecast-interval", "run-rate"]
---

**Scenario analysis** replaces one forecast with several: a base case, an upside and a downside — each a coherent story about the future with numbers attached. Instead of betting the plan on a single line, the team sees what each future demands and which decisions survive all of them.

```text
base:     growth continues → hire 6, spend X
upside:   viral loop catches → need capacity + support (trigger: waitlist > N)
downside: churn persists → freeze hiring, cut discretionary (trigger: logo churn > Y%)
```

Good scenarios differ in kind, not just by ±10%. Vary the drivers that actually branch the future — a key deal closing, a regulation landing, a competitor move — and attach a trigger to each so the team knows which future arrived and what to do. A scenario without a trigger and an action is fiction.

The classic mistakes:

- Three versions of the same story. Base/upside/downside at ±10% share every assumption that matters. Scenarios must disagree about the world, not just the growth rate.
- Too many scenarios. Seven futures paralyse; nobody plans for seven. Three or four, sharply distinct.
- Probabilities nobody believes. False precision ("23% likely") invites arguments about the number instead of the plan. Rank likelihood roughly or leave it out; the value is the prepared response.
- Built once, never revisited. Scenarios rot as the world moves. Revisit when a trigger fires or quarterly, whichever comes first.
- Analysis as cover for indecision. Scenarios inform a choice; they are not a substitute for making one. End with the decision each future implies.

**When to use it:** high-uncertainty, high-stakes calls — annual plans, capacity bets, pricing changes — where a single forecast would be a lie told precisely. For stable operations, a forecast with [intervals](/t/forecast-interval) is enough.
