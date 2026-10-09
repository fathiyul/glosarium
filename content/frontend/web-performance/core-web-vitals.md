---
title: "Core Web Vitals"
summary: "Google's metrics for loading, interactivity and visual stability."
levels: { frontend: mid-level }
aliases: ["web vitals", "CWV", "LCP INP CLS", "Google web vitals", "page experience metrics"]
prereqs: ["web-performance"]
related: ["lcp", "inp", "cls", "lighthouse", "real-user-monitoring", "synthetic-monitoring", "perceived-performance"]
core: [frontend]
---

**Core Web Vitals** are three user-focused metrics for page experience, defined by Google: how fast the main content **loads**, how quickly the page **responds** to input, and how **stable** it is while loading.

| Metric | Measures | Good | Poor |
|---|---|---|---|
| **[LCP](/t/lcp)** Largest Contentful Paint | Loading: when the largest visible element (hero image, headline) renders | ≤ 2.5 s | > 4 s |
| **[INP](/t/inp)** Interaction to Next Paint | Responsiveness: how quickly the page reacts to clicks, taps and key presses | ≤ 200 ms | > 500 ms |
| **[CLS](/t/cls)** Cumulative Layout Shift | Visual stability: how much content jumps around | ≤ 0.1 | > 0.25 |

(INP replaced an older metric, First Input Delay, as a Core Web Vital in 2024. Thresholds are Google's published guidance and can be revised, so check the current documentation.)

A page "passes" when the **75th percentile** of real visits is in the "good" range for each metric ([percentiles](/t/percentile)). Averages would hide the slow experiences.

## Lab data vs field data

- **Lab data** comes from a controlled test run (Lighthouse, DevTools). It's reproducible and good for debugging ([Lighthouse](/t/lighthouse)).
- **Field data** is collected from real users' devices, with all their variety of networks and hardware. It reflects what people actually experience ([real user monitoring](/t/real-user-monitoring)).

Both are needed. A great lab score on your fast laptop can hide poor field results on mid-range phones. Public tools such as PageSpeed Insights and Chrome's field-data reports show real-user numbers, and you can collect your own with the `web-vitals` JavaScript library.

## Typical improvements

- **LCP**: optimize and prioritize the main image ([image optimization](/t/image-optimization)), don't lazy-load it, reduce server response time ([TTFB](/t/ttfb)), remove render-blocking resources.
- **INP**: break up long tasks, reduce JavaScript, keep event handlers light, avoid heavy re-renders ([long tasks](/t/long-tasks)).
- **CLS**: reserve space for images, ads and embeds; set dimensions; load fonts carefully.

## Keep perspective

They matter for user experience (and Google uses them as a search ranking signal, one among many). But they're a **proxy**, not the whole story. A fast page that's confusing is still a bad page, and obsessing over a few
points of a score isn't worth much. Fix the real slowness users feel ([perceived performance](/t/perceived-performance)), and watch the metrics over time so regressions are caught. A [performance budget](/t/performance-budget) helps.
