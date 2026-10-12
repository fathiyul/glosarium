---
title: "Trend"
summary: "The long-run direction underneath the noise."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["trend line", "upward trend", "trend direction"]
prereqs: ["time-series", "line-chart"]
related: ["time-series", "seasonality", "moving-average", "line-chart"]
---

A **trend** is the slow, long-run direction of a [time series](/t/time-series): up, down or flat, underneath the weekly wiggles and one-off spikes. Revenue growing 2% a month has an upward trend even in a week it dipped. Naming the trend separately from the noise is the first step of reading any series honestly.

```text
sales:  __/--_/--__/---___/----__/__   (noisy week to week, climbing overall)
trend:  /                              (up and to the right)
```

A [moving average](/t/moving-average) is the quickest way to see it: average each point with its neighbours and the short-term noise mostly cancels, leaving the direction visible. Fitting a straight line through the series does the same job more formally.

The classic mistakes:

- Calling a spike a trend. Three good weeks after a launch is excitement, not a direction. A trend needs enough history to survive the noise — compare against the same period last year, not last week.
- Confusing the slope with the level. "Growing fast" and "big" are different claims. A small new product can grow 50% a month and still be tiny; a mature one growing 1% adds far more revenue.
- Extending the line forever. A trend describes the past. Assuming it continues is forecasting, with all of forecasting's uncertainty (see [forecasting](/t/forecasting)).

Trend is the first of the three [time components](/t/time-components): direction, repeating [seasonality](/t/seasonality), and leftover noise. Split a series into those three before deciding what moved and why.
