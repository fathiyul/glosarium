---
title: "Stream Windowing"
summary: "Grouping events by time windows: tumbling, sliding and session windows."
levels: { backend: senior, data-engineer: mid-level }
also: [streaming-data]
aliases: ["stream windowing", "tumbling windows", "sliding windows"]
prereqs: ["stream-processing", "event-time-vs-processing-time"]
related: ["stream-processing", "event-time-vs-processing-time", "message-queue"]
---
**Stream windowing** bounds unbounded data into finite chunks for aggregation: tumbling windows (fixed, non-overlapping — hourly counts), sliding windows (overlapping — 5-min average updated minutely), session windows (activity-gapped — per-user sessions). Windows turn infinite streams into answerable questions.

```text
tumbling:  [00:00-01:00] [01:00-02:00]…         (each event once)
sliding:   [00:00-00:05] [00:01-00:06]…         (events in many)
session:   bursts split by 30-min gaps          (per-key, dynamic)
```

Correctness hinges on time semantics (event time vs processing time), watermarks (how long to wait for late data), and allowed lateness (update-or-drop policy for stragglers). Same data, different windows and watermarks, legitimately different answers.

The classic mistakes:

- Processing-time windows for event-time questions. "Events per hour" by arrival time misattributes delayed data; window by event time, track watermarks, expose lateness.
- Watermarks too tight or loose. Aggressive watermarks drop legitimate late data; lax ones delay results indefinitely. Tune to source lateness distributions, per stream.
- Late data ignored. Dropped laggards silently undercount (mobile offline, retries, backfills). Policy per use case: update, side-output, or accept-and-document.
- Giant state windows. Year-long windows keyed finely exhaust state backends; retention, compaction and incremental aggregation bound the state.
- Session gaps misconfigured. Too-short gaps fragment sessions; too-long merge distinct visits. Calibrate from real inter-event distributions.
- Assuming determinism. Same stream replayed with different arrival patterns yields different window contents unless event-time + watermarks fully determine results. Test replays explicitly.
- One window for all questions. Fraud (short sliding), billing (tumbling daily), sessions (activity gaps) need different windows over the same stream. Window per question.

**The discipline:** window by event time, watermark by measured lateness, policy late data explicitly, bound state. Streams are infinite; answers need edges — windows draw them honestly.
