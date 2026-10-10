---
title: "Bar Chart"
summary: "Comparing amounts across categories with lengths a reader can rank instantly."
levels: { data-analyst: junior }
aliases: ["bar graph", "column chart", "bar diagram"]
prereqs: ["data-visualization", "chart-selection"]
related: ["chart-selection", "stacked-bar-chart", "pareto-chart", "histogram", "axis-truncation"]
---

A bar chart compares amounts across categories using **length**. One bar per category, one shared baseline, and the reader can rank them instantly without reading a single number.

```text
Sessions by channel (e.g.)

paid search  ########################  1,240
organic      ####################      1,050
email        #######                     380
referral     ###                         160
```

## Rules that make one readable

- **Start the value axis at zero.** The length is the claim the bar makes; truncating it exaggerates every difference (see [axis truncation](/t/axis-truncation)).
- One bar per category. If your horizontal axis is a continuous measure rather than a set of categories, you want a [histogram](/t/histogram).
- Sort by value, unless the categories have a natural order — days of the week, age bands, plan tiers. Then keep that order, because the reader expects it.
- Long labels mean horizontal bars. Rotating labels 45 degrees to fit vertical bars costs more than it saves.
- Do not colour each bar differently. Colour earns its place when it carries a grouping, not when it decorates.
- Label the values when the reader will quote them. Length is for ranking, not for reading.

## When not to use it

Past roughly a dozen categories a bar chart becomes **a wall**, however well sorted. Group the tail into "other", or switch to a [Pareto chart](/t/pareto-chart) when the question is prioritisation, or a [treemap](/t/treemap) when the parts are many and belong in a hierarchy. If the composition of each bar matters, that is a [stacked bar chart](/t/stacked-bar-chart), with the readability cost that comes with it.
