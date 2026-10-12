---
title: "Regression to the Mean"
summary: "Why the worst week of the year is almost always followed by a better one."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["regression to the mean", "RTM", "mean reversion"]
prereqs: ["outliers", "statistics-basics"]
related: ["outliers", "experiment-design", "decision-rule", "peeking-problem", "treatment-effect", "period-over-period"]
---

**Regression to the mean** is what happens when you select on an unusually high or low measurement
and then measure again: the second measurement is usually closer to typical. It is
**not a force acting on the world** — it is the arithmetic of measurement noise.

Concretely: pick your ten worst-performing stores last quarter. Some are genuinely bad, and some are
ordinary stores that happened to have a bad quarter. Both reasons are encoded in the same number, and
the second is noise. Next quarter, the noise mostly does not repeat, so the group's average improves —
with no intervention, no learning, and no help from your coaching programme.

The pattern to watch for:

- "Our worst cohort improved after the intervention." Almost always true, including for a cohort you
  did nothing for. Compare against a matched group that was also selected as extreme
  ([experiment design](/t/experiment-design)).
- "Traffic dropped after the redesign." If the redesign shipped right after your best week, part of
  that drop is the best week not repeating. Compare against a
  [period-over-period](/t/period-over-period) baseline that is not itself an extreme.
- "The top decile of users churns most." Extreme groups are extreme by construction, so their next
  measurement is more ordinary ([outliers](/t/outliers)).
- "This campaign worked, look at the lift." If you targeted people whose last activity was unusually
  low, activity rises for reasons unconnected to the campaign
  ([treatment effect](/t/treatment-effect)).

What reduces it: measure more than once before selecting, and select on a trend rather than on a
single reading. What makes it worse: measuring once, acting, and then quoting the change.

In experiment work it is one reason for a [holdback group](/t/holdback-group) and a
[decision rule](/t/decision-rule) set in advance. Without them, an improvement in the worst group
is indistinguishable from a programme that does nothing.
