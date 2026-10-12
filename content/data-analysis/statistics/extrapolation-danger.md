---
title: "Extrapolation"
summary: "Predicting beyond the data is where models break."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["extrapolation", "extrapolating", "out-of-range prediction"]
prereqs: ["linear-regression", "regression-analysis"]
related: ["regression-analysis", "overfitting", "outliers", "confounding-variable"]
---

Extrapolation is predicting **outside the range you fitted on** — and it is where models break first. Inside the observed range (interpolation), neighbouring data points constrain the curve. Outside it, nothing does: the model keeps following its formula into territory it has never seen.

The classic mistake looks like this. You fit [a straight line](/t/linear-regression) on ad spend of $2k–$12k per week and find roughly +$8 of revenue per $1 spent. Finance asks what $100k per week would bring, and the line cheerfully answers $800k. But saturation, inventory, creative fatigue and competitor response all live beyond $12k — the relationship bends, and your line does not know that. Real curves flatten, kink and reverse; formulas do not volunteer this.

So treat every out-of-range number as a scenario, not a forecast: say what would have to stay true for it to hold, and show how fast the answer changes if the slope decays. Check where the training data actually ends before quoting any prediction, and be extra suspicious when an [outlier](/t/outliers) or a [confounder](/t/confounding-variable) shaped the slope you are extending.

## When not to extrapolate

As a data analyst, flag any dashboard forecast that runs past the data — shade the extrapolated region differently and label the assumption ("assumes the current trend continues"). As a data scientist, keep extrapolation to short horizons with widening uncertainty bands, or to cases with genuine domain constraints behind the functional form. Never extrapolate a model that already [overfits](/t/overfitting) inside its range; outside, its wiggles become wild swings.
