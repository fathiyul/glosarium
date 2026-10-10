---
title: "Histogram"
summary: "Showing how values are spread by binning them and plotting the counts."
levels: { data-analyst: junior }
aliases: ["frequency distribution", "bin chart", "distribution chart"]
prereqs: ["data-visualization", "chart-selection"]
related: ["bar-chart", "box-plot", "distribution-shapes", "descriptive-statistics", "axis-truncation"]
---

A histogram shows how one measure is spread. You split the range into equal-width bins, count how many values fall into each, and draw the counts as bars.

```text
Response time in ms (e.g.)

 0–50     ####
 50–100   ################
 100–150  ##########
 150–200  ###
 200–250  #
```

What you are reading: where the mass sits, how wide the middle is, whether one tail runs longer than the other, and whether there is more than one hump. Those four things are [distribution shapes](/t/distribution-shapes), and they are what decide which summary statistic is honest.

## Histogram versus bar chart

They look similar and mean different things.

A bar chart's horizontal axis is **categorical** — region, plan, channel. One bar per category, gaps between the bars, and the order is yours to choose.

A histogram's horizontal axis is **numeric and continuous**. The bins cover one measure in value order, there is no gap between them because the scale is continuous, and the bin width is a choice that changes the picture. A bar chart comparing four categories and a histogram of response times are not the same chart with different labels.

Bin width matters. Too narrow and most bins hold one or two values and you are looking at noise. Too wide and a two-humped distribution collapses into one lump. Try two or three widths before you believe a shape.

## Rules

- Equal-width bins. Unequal bins make the bar heights unreadable.
- The bars show counts, so the axis starts at zero — see [axis truncation](/t/axis-truncation).
- Say what you excluded. A histogram of "response time" that quietly drops timeouts above some cutoff is a histogram of the successes.

For the middle half of the data without the tails, a [box plot](/t/box-plot) is the compact alternative. For numbers rather than a picture, [descriptive statistics](/t/descriptive-statistics) puts values on the same idea.
