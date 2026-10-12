---
title: "Percentiles (p50, p95, p99)"
summary: "The value below which a given share of measurements fall; the right way to read latency."
levels: { backend: mid-level, frontend: mid-level, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["percentiles", "p50", "p95", "p99", "quantile", "median latency"]
prereqs: ["statistics-basics"]
related: ["tail-latency", "latency", "slo", "statistics-basics", "data-profiling"]
also: [observability, performance]
core: [data-engineer, data-scientist]
---

A **percentile** answers: *what value do X% of the measurements fall below?*

- **p50** (the median): half of the requests were faster than this.
- **p95**: 95% were faster; the slowest 5% were slower.
- **p99**: 99% were faster; the slowest 1% were slower.

Say a service's response times are: p50 = 80 ms, p95 = 300 ms, p99 = 1.8 s. Half the users wait up to 80 ms, but
one in a hundred waits nearly two seconds.

## Why not just use the average?

An average hides the slow cases. Take 100 requests where 99 take 50 ms and one takes 5 seconds:

```python
times = [50] * 99 + [5000]
sum(times) / len(times)      # 99.5 ms: looks fine
# p99 shows the 5-second request; the average does not
```

Averages mix fast and slow into a number nobody actually experienced. Percentiles show what real users see, and
especially the **tail**, the slowest few percent ([tail latency](/t/tail-latency)). Those are often your most active users,
since users who make more requests are more likely to hit a slow one.

## Computing them

```python
import numpy as np
np.percentile(times, [50, 95, 99])
```

or `statistics.quantiles(times, n=100)` in the standard library.

## Rules of thumb

- **Report p50 *and* a high percentile** (p95 or p99) for anything users wait on.
- **You can't average percentiles.** The average of two servers' p99 values isn't the combined p99. Aggregate the
  raw data, or histogram buckets, then compute it.
- **Need enough samples.** A p99 from 50 data points is mostly noise.
- **Service goals** ([SLOs](/t/slo)) are typically written in percentiles: "99% of requests under 300 ms".
- The same idea applies beyond latency: pipeline run times, file sizes, query durations.

See also [latency](/t/latency) and [statistics for engineers](/t/statistics-basics).
