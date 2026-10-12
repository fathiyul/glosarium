---
title: "Truncated Axes"
summary: "Starting a bar chart's value axis above zero, which exaggerates every difference."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["truncated axis", "truncated y-axis", "baseline"]
prereqs: ["bar-chart", "line-chart"]
related: ["bar-chart", "line-chart", "dual-axis-chart", "chart-selection"]
---

Truncation is when a chart's value axis does not begin at zero. On a bar chart it misleads; on a line chart it is usually the right thing to do. The difference is not taste — it follows from which visual property carries the number.

A reader compares bars by their **length**. Length is proportional to the value only if the axis starts at zero. Begin the axis at 90 and the gap between 91 and 92 becomes the entire drawing:

```text
Two values, 91 and 92, where one # is one unit of value (e.g.):

axis 0-100    91  ###########################################################################################
              92  ############################################################################################

axis 90-100   91  #
              92  ##
```

In a line chart the reader compares each point's **position** against the gridlines, not the length of any mark. Position carries the value at any baseline. If a measure moves between 95,000 and 100,000 all month, a zero baseline draws that as a flat smear along the top of the plot, and the movement the reader came for disappears.

So the rule is about the encoding rather than the chart type. Anything that encodes value by length or area — bars, stacked bars, pies, treemaps, sized bubbles — starts at zero. Anything that encodes by position — lines, dots, box plots — can be zoomed freely, and often should be.

## Where it bites

A dashboard tile reading "+8%" beside bars that look four times as long. The tile is honest and the bars are not. Two honest fixes: plot the *change* rather than the level, or label the values on the bars so length is not the only channel carrying the number.

If you must zoom a bar chart, mark the break on the axis. An unexplained break is worse than the exaggeration, because now the chart is also wrong somewhere it is not showing you. The sibling mistake — choosing two scales on one plot — is covered in [dual axis charts](/t/dual-axis-chart), and the choice of chart form is in [chart selection](/t/chart-selection).
