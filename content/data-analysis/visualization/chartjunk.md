---
title: "Chart Junk"
summary: "Decoration that adds ink but not information, and quietly slows reading down."
levels: { data-analyst: mid-level }
aliases: ["chart junk", "chart decoration", "noise in charts"]
prereqs: ["data-visualization", "chart-selection"]
related: ["chart-annotation", "color-scales", "visual-hierarchy", "gauge-chart", "axis-truncation"]
---

Chart junk is the ink that adds no information: the three-dimensional bar, the gradient fill, the drop shadow, the stock photo behind the columns, gridlines in five shades of grey, a second copy of the axis title.

## Why it matters

**Every mark competes with the data for the reader's attention, and decoration competes loudly.** A three-dimensional bar invites the reader to compare volumes and front-facing faces rather than lengths. A gradient suggests the top of the bar means something different from the bottom. A picture behind the columns silently changes the encoding from length to area.

Specific versions worth naming:

- **Three-dimensional bars and pies.** The perspective distorts precisely the comparison the reader came to make.
- Redundant gridlines and borders. Keep the few that let someone read a value; drop the rest.
- A legend where a direct label on the mark would do.
- Decorative images as part of the encoding.
- A rainbow palette where one sequential ramp carries the quantity — see [colour scales](/t/color-scales).

## Where the line is

Some styling is not junk. A colour that marks the one series you are discussing, a rule at the target, a shaded band over a release window — these direct attention, and attention is what a chart manages. The test is not "is it pretty" but "does removing it change what the reader learns". If removing it changes nothing, remove it.

The threshold also moves with the medium. A chart pasted into a slide often needs more contrast and heavier marks than the same chart on a dashboard, because the reader is further away and has less time. That is not licence for the gradient fill.

The related failure is encoding by something other than the value — see [axis truncation](/t/axis-truncation) for the most common version. Decoration is also the failure mode of [gauge charts](/t/gauge-chart), and the ordering cure is plain [visual hierarchy](/t/visual-hierarchy): rank the marks, then let the ranking decide what gets emphasised. For the positive version of putting words on a chart, see [chart annotation](/t/chart-annotation).
