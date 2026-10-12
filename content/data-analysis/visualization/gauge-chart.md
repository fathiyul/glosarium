---
title: "Gauge Chart"
summary: "A dial showing one value against a target \u2014 familiar, and often the wrong choice."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["gauge", "dial chart", "speedometer chart"]
prereqs: ["chart-selection", "kpi-design"]
related: ["chart-selection", "sparkline", "small-multiples", "dashboard-design", "kpi-design"]
---

A gauge is a dial with a needle: one value, a target, and an arc running from zero to some maximum. It is familiar — everyone has read a speedometer — and **that familiarity is the whole of its case**.

## The fair case

For one number against one target, "how far to target" reads instantly, and colour bands on the arc make the state legible from across a room. Teams that track a small fixed set of goals often keep one, and their audience is used to it. Calling it always wrong is too strong.

## The costs

A gauge occupies a large square to communicate one number. The same square holding four small bars, or four gauges' worth of numbers, carries more. A needle at "87" is also harder to read precisely than the digits 87 printed beside the bar it came from.

More importantly, **a gauge shows neither history nor spread.** You cannot tell from a gauge whether 87 is the best week of the quarter or whether the number has been flat for six months. If the question is "are we improving", a [sparkline](/t/sparkline) beside the number answers it in less space.

## Practical guidance

Use a gauge when the audience is used to them, there are only a few, and **the question really is "are we on target"**. Replace it with a number plus a target bar, or a [small multiples](/t/small-multiples) row of bars, when the question is anything else.

Choosing which numbers deserve a dial at all is [kpi design](/t/kpi-design); where the dial sits on the page is [dashboard design](/t/dashboard-design). The general case for picking a form is [chart selection](/t/chart-selection).
