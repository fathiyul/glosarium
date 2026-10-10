---
title: "Small Multiples"
summary: "The same chart repeated on a common scale, side by side, instead of one crowded plot."
levels: { data-analyst: senior }
aliases: ["small multiple", "trellis chart", "panel chart"]
prereqs: ["chart-selection", "line-chart"]
related: ["line-chart", "heatmap", "chart-selection", "dashboard-design", "chartjunk"]
---

Small multiples is the same chart repeated once per category, laid out in a grid, on a common scale. Ten regions become ten small line charts rather than one plot with ten lines.

## Why it works

One crowded plot with ten series asks the reader to hold ten colours in memory and track ten overlapping paths. **Ten small charts ask them to look at one shape, then the next.** The question changes from "which colour is that and where is it going" to "does this panel look like that one" — a much easier question, and one people answer reliably. It also deletes the legend, which deletes an entire class of "which line was the blue one".

## The conditions

- **Same chart, same scale, every panel.** A common vertical axis is what makes the panels comparable at all. If each panel rescales itself to fit its own data, you have built a gallery of unrelated shapes that share a format, and every comparison the reader draws from it is false.
- A sensible panel order. By value, unless there is a natural order such as time or geography. Alphabetical order destroys the comparison you made the grid for.
- Enough room per panel for the shape to survive. Ten panels across a phone screen are ten illegible panels; on a narrow screen, reformat to two columns and let the reader scroll.
- The title on each panel, not in a shared legend, so any one panel can be read alone — and so the reader can find the one they care about.

## The trade-offs

Space. A grid of twelve takes more room than one plot, and on a dashboard that room competes with everything else. When there are only two to four categories and the shapes are distinct, one plot with direct labels is usually better. When there are many, small multiples or a heatmap.

The harder trade-off is the shared scale when one category dominates. A region with ten times the volume flattens every other panel to a line along the bottom, and readers will draw a comparison between the panels that the grid never intended. Either keep the shared scale and say so in the subtitle, or lift the outlier into its own panel with its own scale and a visible note. Silently rescaling one panel is the worst of the three options, because it looks like the other two.

Where the categories are not the point and the grid is dense, a [heatmap](/t/heatmap) carries more in less room; where the grid has a natural reading order, a [line chart](/t/line-chart) per category with direct labels is usually the friendlier version. The form decision itself is [chart selection](/t/chart-selection), and the grid layout on the page is [dashboard design](/t/dashboard-design).
