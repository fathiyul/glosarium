---
title: "Base Rate Fallacy"
summary: "Forgetting how rare something is before testing for it."
levels: { data-analyst: mid-level , data-scientist: junior }
---

The base rate fallacy is weighing a signal — a test result, an alert, a match — while ignoring how common or rare the thing being detected actually is. When the underlying population is mostly negatives, even a good detector produces a flood of false ones, and most hits are noise.

A classic teaching scenario, with made-up but typical numbers: a condition affects 1 in 1,000 people. A test catches 99% of true cases and falsely flags 5% of healthy people. Screen 100,000 people: about 100 are sick and 99 test positive; about 5,000 healthy people also test positive. A positive result now means roughly a 2% chance of actually having the condition — not 99%. The useful number depends on the base rate, not just the detector's quality.

For analysts, this is the fraud-flagging, churn-prediction and anomaly-alert trap. If you alert on "model score above threshold" for a rare event, your dashboard fills with false alarms and people stop trusting it. Report precision in context instead: what share of flagged cases turn out real, given how rare the event is. Data scientists meet the same error in reverse: a "99% accurate" classifier on a 99%-one-class problem that never predicts the positive class.

The mechanics are [conditional probability](/t/conditional-probability) run backwards — confusing P(positive | fraud) with P(fraud | positive) — and [Bayes' theorem](/t/bayes-theorem) is what makes the conversion explicit.

Don't read this as a reason to abandon detection: catching more real cases is still worth it when a miss is expensive. The discipline is to state the expected share of true hits, given the base rate, before anyone celebrates a "99% accurate" filter. It also keeps stakeholders honest: a rare-event model's hit list will mostly be wrong, and that can still be the best available trade.
