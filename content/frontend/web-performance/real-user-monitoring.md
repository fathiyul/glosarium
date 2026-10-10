---
title: "Real User Monitoring (RUM)"
summary: "Measuring performance from real users' browsers."
levels: { backend: senior, frontend: mid-level }
aliases: ["real user monitoring", "rum", "field data"]
prereqs: ["observability", "performance-budget"]
related: ["synthetic-monitoring", "observability", "long-tasks"]
---

**Real User Monitoring (RUM)** measures performance from real visits — actual devices, networks, geographies and interactions — via in-page instrumentation reporting paint timings, interaction latencies, layout shifts and custom marks. Where lab tests show what's *possible*, RUM shows what *happens*, including the long tail labs never reproduce.

```text
lab:  flagship phone, cable, warm cache → optimistic best case
RUM:  p75 across real devices/networks → the experience to optimise
```

Its metrics (percentiles, segmented by device, connection, region, route) direct optimisation at what users actually suffer — usually distant networks, mid-tier devices and specific heavy routes — rather than what developers' machines show.

The classic mistakes:

- Lab-only optimisation. Perfect Lighthouse scores alongside terrible field data is the norm, not the exception. Lab for diagnosis, RUM for verdicts.
- Mean-watching. Averages hide the suffering tail. Track p75/p90+, segmented — the tail is where users churn.
- Unsegmented data. Global aggregates blend incomparable experiences. Segment by device class, network, geography and route before concluding anything.
- No interaction metrics. Paint timings without input latency miss responsiveness — often the actual complaint. Measure interactions, not just loads.
- Sampling blindness. 100% collection on high traffic is expensive; naive 1% sampling misses rare-but-awful segments. Sample intelligently (all of the tail, fraction of the head).
- Privacy negligence. Performance beacons carrying URLs, IPs and device details need consent handling and minimisation like any telemetry.
- Dashboard without budget. RUM that nobody gates on rots into wallpaper. Tie budgets to alerts and release gates (see [performance budget](/t/performance-budget)).

**The practice:** instrument real visits, percentile and segment relentlessly, optimise what the field shows, gate releases on budgets. Reality outranks simulation — measure where users are.
