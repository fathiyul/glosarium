---
title: "Box Plot"
summary: "Summarising a whole distribution with a median box, whiskers and the outliers left outside."
levels: { data-analyst: mid-level }
aliases: ["boxplot", "box and whisker plot", "box-and-whisker diagram"]
prereqs: ["descriptive-statistics", "quartiles-and-iqr"]
related: ["histogram", "outliers", "distribution-shapes", "quartiles-and-iqr", "exploratory-data-analysis"]
---

A box plot summarises a whole distribution in a handful of marks: a box covering the middle half of the data, a line at the median, whiskers reaching out from the box, and individual points drawn for whatever the whiskers do not reach.

## Reading one

The bottom and top edges of the box are the first and third quartiles. A quarter of the values sit below the bottom edge, a quarter above the top edge, so **half the data lives inside the box**. The line inside the box is the median — the middle value, not the average.

So a single mark answers three questions: where the middle is, how wide the typical range is, and what sits outside it. Placed side by side, boxes compare distributions in a way that a column of averages flattens: two groups can share a mean and be entirely different animals, one with a tight middle and one with a long tail.

## The whiskers are where you must be careful

**There is no single universal whisker rule.** Tools differ, and so do options inside the same tool:

- one common convention extends the whiskers to the most extreme value that is not flagged as an outlier by a 1.5×IQR test on the box edges
- other tools simply draw the whiskers to the observed minimum and maximum
- others use a fixed percentile pair for the whisker ends

Values beyond the whiskers are drawn as separate marks, so you can see how far out they are and how many there are. Because the whisker rule changes what counts as "outside", always check which rule your tool is using before you compare two box plots made in different tools. What counts as an outlier at all is covered in [outliers](/t/outliers).

## The trade-off

A box plot hides the shape inside the box. Two humps, a large pile of zeros, a spike at one value — none of it survives the summary. When the shape is the question, use a [histogram](/t/histogram). When the numbers matter rather than the picture, [descriptive statistics](/t/descriptive-statistics) and [quartiles and IQR](/t/quartiles-and-iqr) put values on the same idea. It is a first-look tool at its best: [exploratory data analysis](/t/exploratory-data-analysis) leans on it heavily for exactly that reason.
