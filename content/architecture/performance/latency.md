---
title: "Latency"
summary: "The time a single operation takes."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["response time"]
prereqs: ["http-request"]
related: ["throughput", "percentile", "caching", "web-performance"]
---

Latency is how long one operation takes, from the moment it starts to the moment it finishes. A request that takes 120 ms has a latency of 120 ms. Latency is what a user feels as "slow".

Latency adds up across the steps involved: the network trip to your server, the work the server does, each database query, and any calls to other services. A slow query or an extra network hop on the request path shows up directly in the total.

Measuring latency well means looking beyond the average. Report percentiles such as p50 (the median), p95 and p99, because a handful of very slow requests can hide behind a good average. If 1 in 100 requests takes several seconds, users will notice even when the mean looks fine.

The classic mistake is optimizing the average and ignoring the tail. A fix can lower the mean while the slowest requests stay bad. Track the percentiles that matter to your users, and keep [throughput](/t/throughput), the number of operations per second, separate in your head, because a system can handle many requests and still respond slowly to each one. [Caching](/t/caching) is a common way to cut latency for repeated work.
