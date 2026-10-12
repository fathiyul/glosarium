---
title: "Correlation Coefficient"
summary: "One number from -1 to 1 for how tightly two measures move together."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["correlation", "Pearson's r", "correlation coefficient"]
prereqs: ["descriptive-statistics", "standard-deviation"]
related: ["correlation-vs-causation", "linear-regression", "scatter-plot", "outliers", "simpsons-paradox", "distribution-shapes"]
---

A **correlation coefficient** is a single number between −1 and 1 summarising how tightly two
measures move together. Positive means they tend to move in the same direction, negative means
opposite, and near zero means little of the kind of association the coefficient measures.

The common form, Pearson's r, measures *linear* association. Rank versions such as Spearman's
correlation take the ranks of each variable and then correlate them, which picks up monotone
relationships that are not straight lines and weights extreme values far less.

Three things that make it misread:

- **A coefficient near 0 does not mean "no relationship".** A perfect U shape — an outcome that is
  worst at a middle value and best at both ends — has a Pearson correlation of about 0. Plot the two
  columns in a [scatter plot](/t/scatter-plot) before you conclude anything: the shape on screen
  tells you more than the number does.
- Correlation is not causation. Two things can move together because one causes the other, because
  a [third factor drives both](/t/confounding-variable), or because you tested enough pairs
  ([correlation versus causation](/t/correlation-vs-causation)).
- **The number depends on the range of the data.** Correlate height with basketball skill among
  professionals and the coefficient collapses — not because the relationship vanished, but because
  you removed most of the variation. A coefficient computed on one subset does not transfer to the
  whole.

Two more that catch people out:

- A single extreme pair can drive the whole coefficient. One row where both values are huge can
  manufacture a relationship out of noise ([outliers](/t/outliers)). Recompute without it; if the
  story depends on that row, the story is about that row.
- A pooled correlation can reverse inside the groups you care about
  ([Simpson's paradox](/t/simpsons-paradox)). Always check
  [inside the segments](/t/segmentation) before reporting one number.

A related quantity, the regression slope, expresses the same relationship as "so much change in y
per unit change in x" rather than a unitless number — see
[linear regression](/t/linear-regression).
