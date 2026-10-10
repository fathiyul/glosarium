---
title: "Stream Joins"
summary: "Joining streams with each other or with tables, within time bounds."
levels: { data-engineer: senior }
aliases: ["stream-stream join", "stream-table join", "windowed join", "temporal join"]
prereqs: ["stream-processing", "join-types", "stateful-stream-processing"]
related: ["stream-windowing", "stream-table-duality", "watermark", "late-arriving-data", "stateful-stream-processing", "broadcast-join"]
---

A stream join matches events from one stream with another stream, or with a table, to enrich or correlate them as they flow. Unlike a batch [join](/t/join-types), the data never ends, so the engine must bound how long it waits for a match and keep state for the unmatched side.

**The classic mistake is joining two streams with no time bound.** Without one, the engine has to remember every event from both sides in case a match arrives later, so state grows forever until the job runs out of memory. A window is what makes the join finite: match only events close in time, then forget them.

## Stream–stream joins

Both sides are buffered for a time interval. When an event arrives, the engine looks for matches on the other side within the window and emits joined rows; after the window plus an allowed lateness, that state is dropped. This is a windowed join ([stream windowing](/t/stream-windowing)).

## Stream–table joins

One side is a table rather than a stream. Two common forms:

- Lookup / enrichment: each stream event is looked up against a table — a static file, a database, or a replicated table — to add columns.
- Temporal join: match against the version of the table that was valid at the event's time, so an order joins the product price that applied then. This relies on [stream–table duality](/t/stream-table-duality).

## State is the cost

The join's memory is set by the window size, the event rate, and how many keys are active. [Watermarks](/t/watermark) tell the engine how far event time has progressed so it can expire old state ([stateful stream processing](/t/stateful-stream-processing)). Events that arrive after their window closed are [late-arriving data](/t/late-arriving-data) and are dropped or handled separately.

Engine support and syntax vary: Flink has interval and temporal joins in its Table API/SQL; Spark Structured Streaming supports stream–stream and stream–static joins with watermarks; ksqlDB and others have their own forms. Check your engine's documented semantics before relying on a join type.

## When not to use one

If enrichment data changes slowly, a lookup join or a broadcast of the small table is cheaper than joining two streams ([broadcast join](/t/broadcast-join)). If the answer can wait, a batch join is simpler and easier to test. Reach for a stream join when the correlation has to happen as events arrive.
