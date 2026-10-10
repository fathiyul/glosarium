---
title: "Decision Rules"
summary: "Agreeing before the test what result ships it, what kills it and what is inconclusive."
levels: { data-analyst: mid-level }
aliases: ["decision rule", "ship criteria", "stopping rule"]
prereqs: ["ab-testing", "hypothesis-testing", "metric-definitions"]
related: ["ab-testing", "hypothesis-testing", "metric-definitions", "statistical-power", "guardrail-metrics", "data-storytelling"]
core: [data-analyst]
---

A decision rule is a written statement, **agreed before the data arrives**, that maps each possible result to an action: this ships it, that kills it, this is inconclusive and we move on. It is part of the test design, not something you work out when the chart appears.

Suppose you agreed, before launch, that a new checkout ships only if the completion rate rises by at least the smallest effect worth the engineering cost, the interval excludes zero, and the guardrail metrics are unchanged. With the rule in hand the analysis is arithmetic. Without it the same numbers support several stories, and the decision drifts to whoever argues best ([data storytelling](/t/data-storytelling)).

| Result | Action |
|---|---|
| Primary metric up by at least the pre-agreed minimum, guardrails flat | Ship |
| Primary metric down, or a guardrail clearly worse | Kill and roll back |
| Interval includes zero and excludes the minimum in both directions | Inconclusive; do not ship, and say so |
| Interval excludes zero but is smaller than the minimum | Real, but not worth it; do not ship |

The thresholds in that table are illustrative — they are yours to set, and they depend on what the change costs and what it risks.

## Why it has to come first

Deciding the rule after seeing the data turns every test into a choice of test. You can always find a cut-off, a segment or a metric under which the result looks like a win, and that is how a single experiment ends up justifying whichever option the loudest person already preferred. Writing it down first also removes the temptation to keep looking until the number is green ([peeking](/t/peeking-problem)).

## The parts worth writing down

- The primary metric, with its exact definition ([metric definitions](/t/metric-definitions)).
- The smallest effect you would act on. That is a business judgement, not a statistical one ([minimum detectable effect](/t/minimum-detectable-effect)).
- What counts as a guardrail breach ([guardrail metrics](/t/guardrail-metrics)).
- The duration, and therefore when you look ([test duration](/t/test-duration)).
- Who decides when the rule and the judgement conflict.

The trade-off is **rigidity**. A rule written before you knew what you would see will sometimes look wrong in hindsight, and a narrow rule leaves no room for learning that does not fit the metric. Keep the rule for the ship-or-kill call, and keep the diagnostics — segment cuts, qualitative notes, new questions — as a separate write-up that is not allowed to change the decision.
