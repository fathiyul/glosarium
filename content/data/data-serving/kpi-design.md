---
title: "KPI Design"
summary: "Choosing the few numbers that steer a team."
levels: { data-analyst: mid-level , tech-entrepreneur: growth , data-scientist: mid-level }
aliases: ["KPI design", "key performance indicator", "KPI framework", "designing KPIs"]
prereqs: ["metric-definitions", "descriptive-analysis"]
related: ["metric-definitions", "retention-analysis", "cohort-analysis", "data-storytelling", "funnel-analysis", "metric-discrepancy"]
---

A KPI is a small number a team watches to know whether it is winning. KPI design is choosing **the few that actually steer decisions**, and defining them precisely enough that everyone computes the same value.

What makes a KPI useful:

- A precise definition. The formula, the qualifying events, the filters, the time window, the source and the owner — the same list as any [metric definition](/t/metric-definitions). A KPI without a definition is a dashboard argument waiting to happen.
- An owner. One named person accountable for the number and for what happens when it moves. Shared ownership means nobody's.
- Sensitivity to action. A good KPI moves when the team does its job and does not move when it does not. If shipping a feature never changes it, it is not measuring your work.
- A target or a trend, so there is something to compare the number against.
- Few of them. A handful per team is the common advice; more than that and none of them gets attention.

The classic failures:

- A metric nobody owns. It gets computed, charted and ignored.
- A metric that can be gamed. Measure calls handled per hour and call length collapses; measure tickets closed and reopened tickets rise. For any candidate KPI, ask **how someone would hit the target while hurting the business**.
- A vanity metric. Total signups ever, cumulative page views, app downloads: numbers that only go up and say nothing about value. Prefer a rate or a cohort ([cohort analysis](/t/cohort-analysis)).
- Too many KPIs, so that attention spreads until nothing moves.
- Confusing a goal with a KPI. "Improve retention" is a goal; week-four retention of new cohorts is a KPI ([retention analysis](/t/retention-analysis)).

Two more cautions. Most KPIs are lagging indicators — revenue tells you about last quarter — so pair them with something that moves earlier ([funnel analysis](/t/funnel-analysis)). And when a KPI moves, check that it moved for the business reason: a number that changed because of a data change is a [data incident](/t/data-incident), not a win.

A KPI is a small thing to watch on purpose. It only earns the attention you give it if the definition is pinned down and somebody owns the answer.
