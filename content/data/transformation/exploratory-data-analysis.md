---
title: "Exploratory Data Analysis"
summary: "Getting to know a dataset before modelling it."
levels: { data-analyst: junior }
aliases: ["exploratory data analysis", "EDA", "data exploration"]
prereqs: ["descriptive-analysis", "data-profiling"]
related: ["data-profiling", "descriptive-analysis", "data-visualization", "missing-data", "outliers"]
---

**Exploratory data analysis (EDA)** is the first date with a dataset: its size and shape, what is missing, what looks wrong, what might be interesting — before any model or dashboard commits to an interpretation. An hour of EDA routinely saves a week of modelling the wrong thing, because most datasets arrive with surprises their documentation never mentions.

```text
shape → distributions → missingness → oddities → relationships → questions
(rows? cols? types?) (histograms) (where? how much?) (spikes? negatives?) (what moves together?)
```

Work in that order. Confirm grain and size first (is each row what you think?), then distributions ([profiling](/t/data-profiling)), then missingness and odd values, and only then relationships. Questions that survive this pass deserve modelling; most early hypotheses do not survive contact with the histograms.

The classic mistakes:

- Modelling before looking. A pipeline on unexamined data bakes in every surprise — leakage, duplicates, shifted definitions — as silent features. Look first, always.
- Exploring without writing anything down. EDA that lives in a scrolled-away notebook is lost. Note data quirks, dead ends and open questions; they become the data docs and the model caveats.
- Treating exploration as confirmation. EDA finds hypotheses; it does not test them. A pattern spotted in exploration needs fresh data (or a test) before it becomes a claim — otherwise it is circular.
- Ignoring [missing data](/t/missing-data) and [outliers](/t/outliers). The weird rows are often the story (a broken sensor, a fraud pattern) or the threat to it. Either way they deserve attention before the pretty charts.
- Plots without reading them. Generating twenty histograms and glancing at none is worse than useless — it creates the feeling of diligence. Look at every plot you make, and ask what would be surprising.

**The output of EDA** is not a deliverable but readiness: a mental model of the data's quirks, a list of questions worth modelling, and the judgement to distrust the dataset in the right places. See [data visualisation](/t/data-visualization) for showing what you found.
