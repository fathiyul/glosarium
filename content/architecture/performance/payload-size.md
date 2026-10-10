---
title: "Payload Size"
summary: "Sending fewer bytes over the wire."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["payload size", "response size", "message size"]
prereqs: ["compression", "performance"]
related: ["compression", "pagination", "sparse-fieldsets"]
---
**Payload size** — response and request bytes — directly taxes latency (transfer time), cost (egress, mobile data), parsing (CPU, memory) and battery. Bloated payloads are the most common performance bug precisely because they accumulate invisibly: one more field, one more embed, until the "simple" API returns megabytes.

```text
200KB JSON → parse + GC + render on a mid-tier phone (seconds, not ms)
20KB shaped response → same screen, instant
```

Reduction layers: shape responses (sparse fieldsets, pagination, summary-vs-detail), compress (gzip/Brotli for text), choose efficient encodings (binary where browsers don't need JSON), deduplicate (references over repetition), and stream (chunks over monoliths).

The classic mistakes:

- Accidental N+1 payloads. Embedding full related objects per item multiplies bytes with collection size. Paginate relations; link instead of embed (or embed summaries).
- Unbounded lists. Endpoints returning "all" grow until they break mobile clients and proxies. Paginate everything; cap page sizes server-side.
- Debug data in production. Stack traces, query plans and internal ids shipping to clients bloat and leak. Strip ruthlessly outside development.
- Uncompressed text. Missing content-encoding on JSON/HTML wastes 70-80% of bytes for zero reason. Compress text always.
- Base64 binaries in JSON. 33% overhead plus JSON parse costs for images/files that belong in object storage with URLs.
- Version-bloated responses. Backward-compatible additive fields accumulating for years; old clients ignore them, everyone downloads them. Sunset aggressively.
- Measuring desktop only. Payload pain concentrates on mobile networks and mid-tier devices. Budget and test on representative constraints.

**The discipline:** budget bytes per endpoint, paginate collections, shape fields, compress text, store binaries outside JSON. Payload size is user latency wearing a trench coat — measure it as such.
