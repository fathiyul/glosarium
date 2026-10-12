---
title: "Late-Arriving Data"
summary: "Events that show up after their window was already computed."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["late data", "out-of-order events", "late events", "late-arriving facts", "late-arriving dimensions"]
prereqs: ["event-time-vs-processing-time"]
related: ["watermark", "event-time-vs-processing-time", "stream-windowing", "backfill", "partitioned-runs", "surrogate-key-dw"]
core: [data-engineer]
---

**Late-arriving data** is data that shows up **after the time you expected it**: after the window it belongs to was computed, after a day's batch ran, or before the dimension row it refers to exists. In real systems it's normal, not an edge case.

## Where it comes from

- Mobile apps sending events after coming back online.
- Network delays, retries and outages that cause backlogs.
- Source systems that load data in nightly or irregular batches.
- Partners delivering files days late.
- Corrections and backdated records (an order edited retroactively).
- Late dimension data: a fact arrives for a customer you haven't ingested yet.

## Handling it in streaming

Streaming engines use event time and **watermarks** ([event time vs processing time](/t/event-time-vs-processing-time), [watermarks](/t/watermark)). You decide an **allowed lateness**: wait this long before closing a window. Then for data later than that:

- **Drop it**, accepting small inaccuracy (and count how much you drop).
- **Send it to a side output** to process separately or reconcile in batch.
- **Update the earlier result** (emit a corrected value), if downstream can handle updates.

The trade-off is **completeness vs latency**: waiting longer gives more complete answers but delays results.

## Handling it in batch

- **Partition by event date**, and **reprocess recent partitions** (the last N days) on each run, to absorb stragglers. Use idempotent, overwrite-by-partition jobs so that reprocessing is safe ([partitioned runs](/t/partitioned-runs), [idempotent pipelines](/t/idempotent-pipeline)).
- Use a **lookback window** when loading incrementally ([high-water marks](/t/high-water-mark)).
- **Schedule periodic larger reprocessing** (weekly) for very late corrections, or run a [backfill](/t/backfill).
- Keep the **raw data** with ingestion timestamps, so you can see when things actually arrived ([landing zone](/t/landing-zone)).

## Late-arriving dimensions and facts

A fact can refer to a dimension member that doesn't exist yet. Instead of dropping the fact, create a **placeholder ("inferred member")** row with the key, and fill in its attributes when the real data arrives ([surrogate keys](/t/surrogate-key-dw)). Also decide how late-arriving changes affect [slowly changing dimension](/t/slowly-changing-dimension) history.

## Practices

- **Measure lateness**: track the distribution of delays per source, and set expectations from data.
- **Tell consumers** which numbers can still change ("the last 3 days are provisional").
- **Make downstream models able to handle revisions.**
- **Monitor the volume of late events**, since a sudden rise often signals a pipeline or source problem.
