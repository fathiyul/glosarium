---
title: "Mean, Median and Mode"
summary: "Three ways of naming a 'typical' value, and why the choice changes the story."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["mean", "median", "mode", "average"]
prereqs: ["descriptive-statistics", "percentile"]
related: ["distribution-shapes", "long-tail-distribution", "outliers", "percentile", "quartiles-and-iqr"]
---

Three numbers compete to describe a "typical" value, and on messy data they say different things.

- The **mean** is the sum divided by the count.
- The **median** is the middle value once the data is sorted.
- The **mode** is the value that appears most often.

Take a column of last month's order values (illustrative):

```text
12, 15, 15, 16, 18, 19, 20, 21, 430
```

The mean is about 63. The median is 18. The mode is 15. If you tell your stakeholder "the average
order was 63", and most customers spend about 15, you have described a number that no customer
produced.

Which one to reach for:

- Use the mean when the distribution is roughly balanced and a total makes sense. It uses every data
  point, which is both its strength and its weakness.
- Use the median when a few very large or very small values would drag the mean. It is the usual
  choice for response times, salaries and order values.
- Use the mode when the question is about the most common category or the most frequent value, not a
  typical size.

One trap worth memorising: an average of averages is not the average. Averaging a per-region average
only gives the overall average when every region has the same number of rows. Combine the sums and
the counts instead, which is what [GROUP BY](/t/group-by) aggregation should do in the first place.

Look at the shape before you pick: [distribution shapes](/t/distribution-shapes) tells you whether
the mean is being honest, and [outliers](/t/outliers) tells you whether one row is doing all the
work. For a skewed column, the median and a [percentile](/t/percentile) are usually the better
report.
