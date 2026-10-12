---
title: "Stateful Stream Processing"
summary: "Keeping running state like counts or sessions across events."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["stateful streaming", "stream state", "state in stream processing", "keyed state", "Flink state", "checkpointing"]
prereqs: ["stream-processing", "event-time-vs-processing-time"]
related: ["apache-flink", "watermark", "stream-windowing", "exactly-once", "stream-joins", "stream-table-duality"]
core: [data-engineer]
---

Some stream computations are **stateless**: look at one event and emit a result (parse, filter, enrich from a fixed lookup). Most interesting ones need **state**, which is **memory across events**:

- **Running aggregates**: counts per user, sums per window.
- **Windows and sessions**: collecting events until a window closes.
- **Deduplication**: remembering IDs already seen.
- **Joins**: holding one stream's events while waiting for matching events on another ([stream joins](/t/stream-joins)).
- **Pattern detection**: "three failed logins within five minutes".

```
event stream ──► keyed by user_id ──► [ state per user: running count, last seen, session start ] ──► results
```

The state is usually **partitioned by key**, so each worker holds the state for its subset of keys and updates it locally, which allows the computation to scale.

## The hard problems

**Fault tolerance.** Workers crash, and in-memory state would be lost. Stream engines (such as Apache Flink) take periodic **checkpoints**: consistent snapshots of all state, plus the **position** in the input (offsets), saved to durable storage. After a failure, the job **restores the latest checkpoint and replays** the input from the saved offsets. This is the machinery behind **exactly-once state updates** ([exactly-once](/t/exactly-once)). External side effects still need idempotency.

**State size.** State can grow without bound. Examples: a "distinct users ever" set, windows that never close, session state for users who left. Plan for it:

- Use **time-to-live (TTL)** and expire state for old keys.
- Close windows with [watermarks](/t/watermark), and discard their state.
- Prefer compact structures and approximate sketches where precision allows.

Large state is often kept in an embedded store (such as RocksDB) on local disk, with incremental checkpoints, since memory is limited.

**Event time and late data.** State for windows must be retained until the watermark passes, plus allowed lateness ([event time vs processing time](/t/event-time-vs-processing-time), [late-arriving data](/t/late-arriving-data)).

**Scaling and rescaling.** To change parallelism, state must be redistributed across workers by key, which engines support (key groups), but takes planning. A skewed key concentrates state and load on one worker ([data skew](/t/data-skew)).

**Evolving the job.** Changing the program's logic or the state's schema while keeping existing state requires care. Savepoints (manually triggered, portable snapshots) support upgrades, but state compatibility must be managed.

**Observability.** Monitor state size, checkpoint duration and failures, backpressure and lag.

## Practical advice

- **Keep state small and bounded**, always define when state expires.
- **Key by something well-distributed.**
- **Test failure and recovery**: kill workers, restart from a checkpoint, and replay.
- **Version your state schemas.**
- **Choose a stateful engine deliberately.** If a computation can be done as a periodic batch over a table, it may be simpler and cheaper ([batch vs stream](/t/batch-vs-stream)).

See [stream processing](/t/stream-processing) and [Flink](/t/apache-flink).
