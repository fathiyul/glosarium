---
title: "Statistics for Engineers"
summary: "Mean, median, percentiles and variance."
levels: { backend: mid-level, frontend: mid-level, data-engineer: junior }
aliases: ["basic statistics", "descriptive statistics", "mean median mode", "standard deviation"]
related: ["percentile", "probability-basics", "data-profiling", "big-o-notation", "littles-law"]
core: [data-engineer]
---

A few statistics cover most of what engineers need to summarize data and spot problems.

## Measures of the "middle"

| Measure | What it is | Watch out |
|---|---|---|
| **Mean** (average) | Sum divided by count | Pulled hard by extreme values |
| **Median** | The middle value when sorted | Barely affected by outliers |
| **Mode** | The most common value | Useful for categories |

```python
import statistics as st
data = [10, 12, 11, 13, 12, 400]     # one outlier
st.mean(data)      # 76.3: describes nobody
st.median(data)    # 12: typical
```

When data has a long tail (response times, file sizes, order values), **the median and percentiles describe
it better than the mean** ([percentiles](/t/percentile)).

## Measures of spread

- **Range**: max minus min (very sensitive to outliers).
- **Variance** and **standard deviation**: how far values typically sit from the mean. A small standard
  deviation means the values cluster; a large one means they're scattered.
- **Percentiles / interquartile range**: robust ways to describe spread.

```python
st.stdev(data)     # sample standard deviation (for a sample of a larger population)
st.pstdev(data)    # population standard deviation (you have all the data)
```

## Habits worth having

- **Look at the distribution** (a histogram) before trusting any single number.
- **Check for outliers** and decide whether they're errors, or real and important.
- **Sample vs population**: results from a sample are estimates. Small samples are noisy.
- **Correlation isn't causation.** Two numbers moving together doesn't mean one causes the other.
- **Beware of averaging averages.** Combine the underlying counts and sums instead.
- **Report counts alongside rates.** "50% failed" means different things for 2 requests and 2 million.

In practice you use these to profile a dataset ([data profiling](/t/data-profiling)), set alert thresholds,
compare before-and-after performance and notice when "normal" has changed.
