---
title: "Color Scales"
summary: "Sequential, diverging and categorical palettes, and the misuse that invents patterns."
levels: { data-analyst: mid-level }
aliases: ["colour scales", "colour palette", "color palette"]
prereqs: ["data-visualization", "metrics"]
related: ["heatmap", "accessible-visualization", "chart-selection", "chartjunk"]
---

A colour scale maps a value to a colour. There are three kinds, and mixing them up is how a chart invents patterns that are not in the data.

- **Sequential** — one hue ramping from light to dark, for a quantity that runs from low to high: population, revenue, error rate.
- **Diverging** — two hues meeting at a meaningful neutral middle, for a quantity that runs from below something to above something: change versus last year, where zero is the interesting value.
- **Categorical** — separate hues with no order between them, for groups: region, plan, experiment arm. It is never right for a number, because a rainbow implies a rank that does not exist.

## Rules

- Light-to-dark must map monotonically to the value. If a darker cell can be a smaller value, every scan the reader makes is wrong.
- Choose the ends before you map. A scale fitted to the full theoretical range flattens the interesting middle; a scale fitted to this month's outlier makes last month look empty.
- Print the legend with the numbers at each end. "Darker is more" is not a legend.
- Keep zero and "no data" visually distinct — see [missing data](/t/missing-data).

## The misuse that matters

A categorical rainbow applied to a continuous value, or a sequential ramp anchored at the wrong end. Both manufacture structure: the reader finds bands, clusters and a "hot corner" that come from the palette rather than from the data. Once you have decided there is a hot corner, it is very hard to un-see it.

The other habitual error is anchoring the scale to whatever the data happens to contain today. Then tomorrow's genuine outlier compresses everything else into three shades and the chart stops discriminating. Anchor deliberately, state the anchor in the subtitle, and expect to change it when the data changes.

## The trade-off

A scale that shows everything discriminates poorly; a scale that discriminates well hides the extremes. There is no setting that does both. The honest move is to say which you chose. For the grid case that most often goes wrong, see [heatmap](/t/heatmap); for palettes that survive colour blindness and print, see [accessible visualization](/t/accessible-visualization). And when the palette carries a grouping rather than a quantity, that is a [chart selection](/t/chart-selection) problem, not a colour one.
