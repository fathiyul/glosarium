---
title: "Heatmap"
summary: "Colouring a grid of values so patterns across two categories appear at once."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["heat map", "colour matrix", "colour grid"]
prereqs: ["color-scales", "chart-selection"]
related: ["color-scales", "box-plot", "small-multiples", "simpsons-paradox", "missing-data"]
---

A heatmap is a grid where each cell is a value drawn as a colour, so you can see patterns across two categories at once — weekday by hour, product by region, feature by cohort.

## Why it works

The same numbers as a table are a grid of cells the reader must compare one at a time. Coloured, the eye finds the hot block in a second. It is the right form when both axes are categorical and the question is "where is it concentrated".

## Rules

- One sequential ramp for one quantity, light to dark in value order — see [colour scales](/t/color-scales).
- Print the cell values when the grid is small enough. Colour is the fast channel and numbers are the accurate one; a reader who needs "13, not 14" cannot get that from a shade.
- Anchor the two ends of the scale deliberately and say what they are.
- Keep a blank cell and a zero cell visually distinct. They mean different things, and merging them is a [missing data](/t/missing-data) decision disguised as a formatting default.

## Sorting changes what a reader sees

This is the part people forget. Order the rows and columns by total value and you get a clean diagonal and an obvious "top-left is hot" story. Order them alphabetically and the same data looks like noise. **The ordering is an editorial act and it is usually the strongest claim the chart makes** — sometimes the only one. Say which ordering you used, and never put two heatmaps ordered differently side by side and invite the reader to compare them.

## Trade-offs

**A heatmap has room for exactly two categories and one value.** Anything that needs segment plus time plus a third measure is a different form.
- The colour blocks hide the distribution inside each cell. When the question is spread rather than level, a [box plot](/t/box-plot) per row beats it.
- A row that looks hot may be one product with a huge total sitting next to three flat ones. Aggregation artefacts live here — see [Simpson's paradox](/t/simpsons-paradox).

When the grid has a natural third measure, small panels of the same grid often beat one big block: see [small multiples](/t/small-multiples).
