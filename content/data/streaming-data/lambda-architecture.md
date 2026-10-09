---
title: "Lambda Architecture"
summary: "Parallel batch and streaming paths merged at query time."
levels: { data-engineer: senior }
aliases: ["Lambda", "lambda architecture", "batch and speed layers", "batch layer speed layer serving layer"]
prereqs: ["batch-vs-stream", "stream-processing"]
related: ["kappa-architecture", "batch-vs-stream", "stream-processing", "real-time-vs-near-real-time", "mapreduce", "data-warehouse"]
core: [data-engineer]
---

**Lambda architecture** (described by Nathan Marz) processes data through **two parallel paths** and merges their results: a **batch layer** that's accurate and complete but slow, and a **speed (streaming) layer** that's fast but approximate, so that queries get both accuracy and low latency.

```
                    ┌──► BATCH LAYER ───► batch views (precise, recomputed over all data, hours old) ─┐
new data ──► log ───┤                                                                                 ├─► SERVING LAYER ─► queries
                    └──► SPEED LAYER ───► real-time views (only recent data, seconds old) ───────────┘   (merge both)
```

- **Batch layer**: stores the complete, immutable master dataset, and periodically **recomputes** views from scratch. Correct, easy to reason about, and able to fix any past mistake by rerunning.
- **Speed layer**: processes only **recent data** as it arrives, producing incremental, low-latency views, covering the gap until the next batch run catches up.
- **Serving layer**: answers queries by **combining** the batch views with the real-time views.

## The idea behind it

In the 2010s, streaming systems were seen as less reliable and less exact than batch, and batch was too slow for fresh results. Lambda combined their strengths: **batch for correctness, streaming for freshness**. When the next batch run completes, its authoritative results replace the speed layer's approximations for that period.

## The main drawback: two systems, two codebases

You implement the **same business logic twice**, once for batch and once for streaming, often in different frameworks, and must keep them consistent. That means:

- **Double the development and testing effort**, and bugs that appear in only one path.
- **Subtle differences** in results between layers, which confuses users when numbers shift after the batch run.
- **Operating two complex pipelines** and a merge step.

This burden motivated simpler alternatives, such as the [Kappa architecture](/t/kappa-architecture) (one streaming pipeline with replay), and modern engines that run the **same code** in batch and streaming modes, and table formats that support both ([lakehouse](/t/lakehouse)).

## When it still appears

- **Legacy systems** built in that era.
- Cases where the **batch and speed computations genuinely differ**: exact algorithms in batch, approximate sketches (HyperLogLog and similar) in streaming.
- A pragmatic setup in which a **streaming path gives fresh, provisional numbers** and a **nightly batch job corrects them**, but with shared code where possible.

## Using the idea wisely

- Ask whether you really need both **freshness and exactness**. Often one suffices, and the simpler design wins ([real-time vs near-real-time](/t/real-time-vs-near-real-time)).
- If you need provisional plus corrected numbers, **say which is which** to consumers.
- **Share logic** between the paths where possible (common libraries, a single engine for both).
- Make batch the **source of truth** that can always repair streaming results, and test that they agree.

It's historically important and still useful for understanding the trade-offs behind modern data platforms.
