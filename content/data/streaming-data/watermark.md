---
title: "Watermark"
summary: "A stream's estimate of how far event time has progressed, used to close windows."
levels: { data-engineer: senior }
aliases: ["watermarks", "event-time watermark", "stream watermark", "late data watermark", "watermark in Flink"]
prereqs: ["event-time-vs-processing-time", "stream-windowing"]
related: ["late-arriving-data", "event-time-vs-processing-time", "stream-windowing", "stateful-stream-processing", "apache-flink", "real-time-vs-near-real-time"]
core: [data-engineer]
---

In stream processing with **event time**, events arrive late and out of order, so the engine can't know when a time window is complete: could another event from 10:04 still show up? A **watermark** is the system's **estimate of how far event time has progressed**: a promise of the form *"I don't expect any more events with a timestamp earlier than W."* When the watermark passes the end of a window, the window can be **closed and its result emitted**.

```
event time axis:   10:00 ......... 10:05 ......... 10:10
window [10:00, 10:05) closes when watermark reaches 10:05
watermark = (max event time seen so far) − (allowed lateness / out-of-orderness)

events seen up to 10:07, allowed out-of-orderness 2 min → watermark = 10:05 → window [10:00,10:05) can fire
```

## Where it comes from

Typically a **delay-based heuristic**: the watermark is the largest event time seen so far, minus a configured tolerance (how out-of-order you expect events to be). Some sources provide watermarks themselves, or per-partition watermarks are combined by taking the minimum.

```python
# Spark Structured Streaming: tolerate events up to 10 minutes late
events.withWatermark("event_time", "10 minutes") \
      .groupBy(window("event_time", "5 minutes")).count()
```

Flink and other engines have equivalent watermark strategies.

## The trade-off

The tolerance is a choice between **completeness and latency**:

- **A small delay**: windows close quickly, so results are timely, but late events (past the watermark) are **dropped or treated as late**, making results less complete.
- **A large delay**: more complete results, but windows stay open longer, so **results come later and state grows** (you must keep windows' state until they close) ([stateful processing](/t/stateful-stream-processing)).

## What happens to late data

Events that arrive **after** the watermark passed their window are "late". Options ([late-arriving data](/t/late-arriving-data)):

- **Drop** them (and count how many).
- **Allow lateness** for a while longer, and **update** the already-emitted result.
- Send them to a **side output** for separate handling or batch correction.

## Practical pitfalls

- **Idle sources stall the watermark.** If one partition or source stops sending, the overall watermark (the minimum across inputs) can stop advancing, and windows never close. Configure idle timeouts.
- **Wrong tolerance**: choose it from measured lateness distributions, not guesses.
- **Bad event timestamps** (device clocks in the future) can push the watermark ahead and make normal events look late. Validate or clamp.
- **A watermark is a heuristic**, not a guarantee. Late events can always occur. Design downstream consumers to tolerate corrections.
- **Different watermarks per stream** matter for joins.
- **Monitor watermark lag**: the gap between the watermark and wall-clock time is a health metric.

See [event time vs processing time](/t/event-time-vs-processing-time) and [stream windowing](/t/stream-windowing).
