---
title: "Data Visualization"
summary: "Turning numbers into marks a person can read in a few seconds."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["data viz", "dataviz", "charting"]
prereqs: ["chart-selection", "metrics"]
related: ["chart-selection", "exploratory-data-analysis", "metric-definitions", "dashboard-design", "chartjunk"]
---

Data visualization is turning numbers into marks a person can read in a few seconds. **The point is never the picture; it is the comparison the reader can finish without counting.**

## Why it matters to you

Your reader is a stakeholder who asked one question and has limited attention. A chart answers "which region fell behind" far faster than a forty-row table answers it. It is also the fastest way for you to find out that the data is not what you assumed — a flat line where you expected seasonal movement is information you would never see in a total.

Three jobs a chart does:

- It shows you the shape before you summarise. [Exploratory data analysis](/t/exploratory-data-analysis) is mostly looking.
- It makes a comparison in one glance that a table would make a reader compute.
- It makes the honest version of the finding easy to see, and the dishonest version harder to hide.

## The classic mistake

**Charting the number you have instead of the comparison you were asked for.** "Monthly revenue" is a chart. "Monthly revenue by region, last thirteen months, against target" is an answer. If you cannot say which comparison the reader is making, the chart is not ready.

A second common mistake is starting with the chart type. Start with the question and let the question pick the form — [chart selection](/t/chart-selection) is the map. The numbers underneath still have to mean the same thing everywhere, which is [metric definitions](/t/metric-definitions), and most charts end up inside a [dashboard](/t/dashboard-design) or a story rather than in a file nobody opens.
