---
title: "Event Time vs Processing Time"
summary: "When something happened vs when your system saw it."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["event time", "processing time", "ingestion time", "event time vs processing time", "time semantics in streaming"]
prereqs: ["batch-vs-stream", "stream-processing"]
related: ["watermark", "late-arriving-data", "stream-windowing", "stateful-stream-processing", "real-time-vs-near-real-time", "timezone"]
core: [data-engineer]
---

Every event has two relevant times:

- **Event time**: when the thing **actually happened** (the user tapped "buy" at 09:59:58 on their phone).
- **Processing time**: when **your system saw it** (the event reached your pipeline at 10:04:10).

```
event time:        09:59:58 ───────────────┐
                                           │  network delay, offline phone, queue backlog, retry...
processing time:                           └──► 10:04:10
```

They're different, and the gap isn't constant. Mobile devices go offline and send events later, networks delay messages, retries and outages cause backlogs, and different sources have different delays. Events can arrive **out of order** and **late**.

## Why it matters

If you group events into windows (events per 5 minutes) by **processing time**, the numbers reflect when your pipeline happened to receive things, so a backlog after an outage puts hours of activity into one window. Results change depending on system health.

If you use **event time**, results reflect what happened in the real world and are **reproducible**: replaying the same data gives the same answer. That's what business questions usually need.

```sql
-- window by when it happened, not when we received it
SELECT TUMBLE_START(event_time, INTERVAL '5' MINUTE) AS window_start, COUNT(*)
FROM clicks
GROUP BY TUMBLE(event_time, INTERVAL '5' MINUTE);
```

## The cost: knowing when you've seen everything

With event time, you can't be sure a window is complete, because a late event might still arrive. Stream processors use **watermarks**, an estimate that "no events older than T are expected anymore", to decide when to close a window and emit results ([watermarks](/t/watermark)). Anything arriving after that is **late data**, and you decide whether to drop it, put it aside or update earlier results ([late-arriving data](/t/late-arriving-data)).

A third notion, **ingestion time**, is when the event entered the streaming system. It's a middle ground, when sources can't supply event times.

## Practical points

- **Put an event timestamp in the data** at the source, and send **UTC** timestamps ([time zones](/t/timezone)). Don't depend on the arrival time.
- **Beware of device clocks**, which can be wrong. Some systems record both the device time and the server's receive time, and use them to correct skew.
- **Decide the lateness you'll tolerate**, trading completeness against latency.
- **Batch has the same issue**: a "daily" table partitioned by *load date* differs from one partitioned by *event date*. Know which one a dataset uses, and reprocess recent partitions for late events ([batch pipelines](/t/partitioned-runs)).
- Note which time a dashboard shows, and say so.

See [stream windowing](/t/stream-windowing) and [stateful processing](/t/stateful-stream-processing).
