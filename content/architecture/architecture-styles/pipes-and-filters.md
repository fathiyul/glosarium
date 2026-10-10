---
title: "Pipes and Filters"
summary: "Processing data through a chain of independent steps."
levels: { backend: senior }
aliases: ["pipes and filters", "pipeline architecture", "filter chain"]
prereqs: ["unix-philosophy", "modular-monolith"]
related: ["unix-philosophy", "event-driven-architecture", "batch-processing"]
---
**Pipes and filters** structures processing as independent stages connected by channels: each filter transforms its input stream and emits output, oblivious to neighbours; pipes carry data (and backpressure) between them. Compilers, stream processors, ETL pipelines and middleware chains all wear the shape.

```text
source → [parse] → [validate] → [enrich] → [store] (each independent, testable)
```

Independence is the payoff: filters develop, test and scale separately; pipelines reconfigure by rewiring; parallelism falls out naturally. The contract is the data format between stages — versioned and validated like any interface.

The classic mistakes:

- Shared mutable state between filters. Side channels coupling "independent" stages recreate the monolith with extra latency. Filters communicate through pipes, never around them.
- Format anarchy. Each pipe inventing its representation multiplies translation code and breaks rewiring. Standardise the envelope; version it.
- Error handling per filter ad hoc. Failures mid-pipeline need uniform policy (dead-letter, retry, skip-with-log) — not N bespoke behaviours. Standardise failure flow.
- Unbounded buffering. Queues between stages growing without backpressure convert bursts into memory collapse. Bound pipes; propagate pressure upstream.
- Ordering assumptions. Parallel filters reorder output unless sequencing is explicit (sequence numbers, ordered merge). State ordering needs; enforce where required.
- Debugging across stages. Failures manifest far from causes in long pipelines; correlation ids and per-stage observability trace end-to-end. Instrument every joint.
- Pipeline for request/response. Synchronous user requests through long filter chains accumulate latency hopelessly. Pipes serve streams and batches; requests need direct paths.

**When to use it:** staged transformations over streams — ETL, media processing, request middleware, compilers. Independent stages, standardised pipes, backpressure throughout.
