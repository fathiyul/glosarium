---
title: "Chart Annotation"
summary: "Marking the thing that happened, so a reader is told what the shape means."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["annotating charts", "chart captions", "callouts on charts"]
prereqs: ["data-visualization", "chart-selection"]
related: ["data-storytelling", "chartjunk", "line-chart", "time-series"]
---

Annotation is the text you put on a chart to say what a shape means: a label beside the line, a shaded band over the release window, an arrow at the dip, a rule at the target. A chart shows that something changed; **annotation says what changed**, so the reader does not have to guess or ask.

## Why it matters

The person who made the chart knows why the line jumped. Everyone else sees a jump and supplies their own reason — usually the one that suits them. An unannotated spike in a time series turns into "the campaign worked" or "quality dropped" depending on who is talking, and neither claim is supported by anything on the page.

## What to annotate

- The events that explain a shape: a deploy, a price change, an outage, a campaign start, a public holiday, a change in how the metric is measured.
- The thing you want noticed: the crossing point, the gap widening, the level the number used to sit at.
- What the reader should do about it — even if the answer is "nothing, this is expected".

## Practical rules

- Put the label next to the mark it describes, not in a legend at the edge.
- Keep the words short. An annotation competes with the data for attention; if the caption is longer than the chart, the chart has become the decoration.
- Date the events. "Outage" is not useful six months later; "outage, 14–16 Mar" is.
- One annotation layer, not five. If everything is marked, nothing is.

## The trade-off

Annotation is interpretation, and it should be attributable. "Expected dip — marketing pause" is a fact about a decision. "Growth slowing" is a claim the chart has not made. **Keep what happened separable from what you think it means**, and the chart stays usable by people who disagree with you. That separation is most of what [data storytelling](/t/data-storytelling) is about, and the discipline that keeps annotation from becoming decoration is the one in [chart junk](/t/chartjunk).
