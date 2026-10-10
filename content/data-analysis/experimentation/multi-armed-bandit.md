---
title: "Multi-Armed Bandits"
summary: "Learning the best option while serving, instead of testing then shipping."
levels: { data-analyst: senior }
aliases: ["multi-armed bandit", "bandit algorithm", "explore-exploit"]
prereqs: ["ab-testing", "statistical-power"]
related: ["ab-testing", "sequential-testing", "decision-rule", "recommendation-system"]
---

A **multi-armed bandit** replaces "test, then ship the winner" with continuous learning: traffic shifts toward better-performing options as evidence accumulates, while a slice keeps exploring the rest in case the world changed. Named for casino slot machines, used for headlines, layouts, prices and recommendations — anywhere the cost of showing a worse option briefly is smaller than the cost of a long test.

```text
classic test:  50/50 for 2 weeks → pick winner → 100% (loser cost paid fully)
bandit:        60/30/10 → 80/15/5 → 95/4/1   (loser cost shrinks as evidence grows)
```

The trade is statistical efficiency for opportunity cost. Bandits earn more *during* the learning period but learn the final answer slower than a fixed test of the same size — exploration is throttled precisely when it would teach the most. They also complicate inference: the data is adaptively collected, so naive significance math does not apply.

The classic mistakes:

- Bandits everywhere by default. For a one-shot launch decision, a fixed test answers faster and cleaner. Bandits suit ongoing allocation (which headline, which offer), not ship/kill calls.
- No floor on exploration. Letting a weak arm starve to zero means never noticing when it becomes the best. Keep a minimum exploration rate.
- Non-stationary rewards ignored. Bandits assume the world holds still enough to learn; a shifting environment needs forgetting (discounting, windows), or the bandit confidently serves yesterday's winner.
- Reading bandit data like test data. Adaptive assignment breaks randomisation assumptions. Do not run t-tests on bandit logs and quote the p-values.
- Debugging opacity. "The algorithm chose it" is unsatisfying when revenue dips. Log arm pulls, rewards and the policy state so a human can audit what happened.

**When to choose it:** repeated decisions with fast feedback and modest per-decision cost, where the environment is stable enough to learn and exploration is cheap. For irreversible launches and precise effect estimates, run a proper [test](/t/ab-testing) with a [decision rule](/t/decision-rule) instead.
