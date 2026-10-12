---
title: "Relative Risk"
summary: "How many times more likely an outcome is in one group."
levels: { data-analyst: mid-level , data-scientist: mid-level }
---

Relative risk divides the probability of an outcome in one group by the probability in another: 4% churn versus 2% churn is a relative risk of 2. It is the most persuasive way to describe a difference, and therefore the most abused.

The persuasion problem is that it erases the starting point. Moving churn from 0.1% to 0.2% is also RR 2 — a doubling — yet the absolute change is one tenth of a percentage point. Conversely a modest RR of 1.3 on a 30% outcome matters far more than RR 2 on a near-zero one. The classic mistake is a stakeholder reading "twice as likely" as "twice as important." Pair relative risk with the absolute difference — here, 2 versus 4 percentage points — and let the decision see both numbers.

Analysts also meet it as the twin of the [odds ratio](/t/odds-ratio). When outcomes are common, the two diverge (odds exaggerate), so quote RR for probabilities, OR only when the model or design hands you one — and translate before telling the story.

Data scientists should watch the denominator's stability. RR is a ratio of small numbers when the outcome is rare, which makes it noisy exactly when it sounds dramatic; report its [confidence interval](/t/confidence-interval), not just the point. Segmented RR can also vanish on aggregation — [Simpson-style reversals](/t/confounding-variable) survive any averaging that ignores composition.

When not to use it: "doubled conversion" as a headline invites overreaction to base-rate wiggles; "conversion rose from 2% to 3%" invites correct calibration. Relative risk is honest when the baseline is visible next to it, and misleading when it stands alone — which is why regulators' warnings, risk ladders and product decisions almost always want both framings in the same sentence.
