---
title: "Streaming Large Files"
summary: "Processing files in chunks instead of loading them into memory."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["streaming large files", "large file upload", "streaming uploads"]
prereqs: ["file-uploads", "object-storage"]
related: ["file-uploads", "object-storage", "unbounded-result-sets", "backpressure"]
---

**Streaming** a large file means processing it piece by piece — as it arrives or as it's sent — instead of loading the whole thing into memory. For uploads and downloads of megabytes to gigabytes, buffering the entire file in the application is what causes out-of-memory crashes, timeouts and stalled servers.

```text
buffering: read entire 2 GB file into memory → process → respond   ✗
streaming: read chunk → write chunk → ... as it flows               ✓
```

Two directions:

- Uploads — read the incoming stream and write it to storage (or a processing pipeline) chunk by chunk, without holding it all. Better still for object storage: a [presigned URL](/t/presigned-url) lets the client upload directly, bypassing the app.
- Downloads/exports — stream the response from its source (database rows, a file) to the client or to storage, so you don't build the whole thing in memory first (see [data export](/t/data-export)).

The classic mistakes:

- Reading the whole file into memory. A single large upload can OOM the process; a few concurrent ones take down the service. Stream instead.
- Buffering the whole response. Building a huge export or download in memory before sending is the download-side version of the same bug. Stream it out.
- No size limit. Even streaming, an unbounded upload can fill storage or processing capacity. Cap file size and reject oversized requests (see [file uploads](/t/file-uploads)).
- Losing the file on failure. A long upload that fails midway shouldn't corrupt state; use resumable uploads or write to a temp location and finalize atomically.
- Holding a request open too long. Very large transfers over a single HTTP request risk timeouts and tie up connections; direct-to-storage (presigned URLs) or resumable/chunked uploads handle this better.
- Ignoring backpressure. If the source produces faster than the destination consumes, a streaming pipeline can still grow buffers; respect backpressure (see [backpressure](/t/backpressure)).
- No progress or validation. For large files, users need progress feedback, and you need to validate (type, size, integrity) before accepting the result.

**How to handle big files:** stream in both directions, cap sizes, prefer direct-to-storage uploads via presigned URLs, make uploads resumable, and validate after transfer. It's the difference between a file feature that scales and one that crashes the moment a user uploads something big. See [object storage](/t/object-storage) and [presigned URL](/t/presigned-url).
