---
title: "Treemap"
summary: "Nested rectangles sized by value, for showing parts of a whole when there are many parts."
levels: { data-analyst: mid-level }
aliases: ["treemap chart", "tree map", "nested rectangles"]
prereqs: ["chart-selection", "bar-chart"]
related: ["stacked-bar-chart", "chart-selection", "long-tail-distribution", "color-scales", "table-design"]
---

A treemap divides a rectangle into nested rectangles, each sized by its value and grouped inside its parent. It answers "what are the parts of this whole and how big is each part" when there are too many parts for a pie and too many for a readable bar chart.

## Why it wins at scale

Sixty categories in a bar chart is a long wall; a pie past a handful of slices is unreadable. A treemap packs the same information into a fixed area, and the nesting shows two levels at once — region inside country, sub-category inside category.

Reading one: area is the encoding, so the biggest rectangle is the biggest value, and the rectangles at one level sum to their parent's. **Grouping by parent means a reader can compare the top-level regions without reading anything inside them.**

## What it costs

- **Area is a poor encoding for comparison.** People judge rectangles badly; a bar of the same value is far easier to rank. If the parts are few, use bars.
- The layout algorithm gives some rectangles an extreme aspect ratio, and a long thin rectangle under-reports its own size. That is a property of the layout, not of the data, and it is why two same-area rectangles rarely look the same size.
- Labels do not fit in small rectangles, so the smallest parts exist only as coloured blocks. Give them a tooltip and a list somewhere.

## Practical rules

- Size by the value. Colour by a second measure, or by the parent group — see [colour scales](/t/color-scales).
- Order siblings by size, and state the encoding in the subtitle.
- Pair it with a [table](/t/table-design) of the top items. The smallest rectangles are unreadable by design, so the treemap plus a short list is genuinely more useful than the treemap alone.

Where the parts are few and the total matters, a [stacked bar chart](/t/stacked-bar-chart) is the kinder form. Where the sizes are extremely uneven — a few huge values and a long tail of small ones — a treemap handles it better than a bar chart does, though the reader still has to be told that the small rectangles matter ([long tail distribution](/t/long-tail-distribution)).
