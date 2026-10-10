---
title: "Range Requests"
summary: "Fetching part of a resource, for resumable downloads and video."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["range requests", "http range", "partial content"]
prereqs: ["http", "etag"]
related: ["conditional-request", "streaming-large-files", "cdn-caching"]
---

**Range requests** fetch part of a resource: `Range: bytes=1000-1999` returns that slice with `206 Partial Content` and a `Content-Range` header. Servers advertising `Accept-Ranges: bytes` unlock resume-after-interruption, media seeking without full download, and parallel chunk fetching.

```text
HEAD /big.zip → Accept-Ranges: bytes, 10 GB
GET /big.zip (Range: bytes=0-999999) → 206, first MB
…later… Range: bytes=1000000- → resume where it stopped
```

Ranges compose with validators: `If-Range` revalidates before serving the slice, so a changed file restarts instead of corrupting. CDNs and players depend on this machinery daily.

The classic mistakes:

- No range support on large files. Forcing full downloads for a 2-hour video's last 10 minutes (or a resumed 10GB transfer) wastes enormous bandwidth. Support ranges on anything big.
- Ignoring If-Range. Serving a stale slice of a changed file corrupts the result silently. Validate before slicing.
- Single-threaded giant downloads. One connection ramps slowly and stalls on loss; ranged parallel chunks saturate links (with server courtesy — bound concurrency).
- Assuming all intermediaries pass ranges through. Some proxies collapse ranges or strip the headers; verify end to end, especially with signed URLs and auth.
- Range math off-by-ones. Inclusive byte ranges (`0-499` is 500 bytes) trip every implementer once. Test boundaries and suffix ranges (`-500`).
- Multipart/byteranges complexity. Multi-range responses use multipart bodies few clients parse well. Single ranges cover nearly every real need.
- Forgetting HEAD. Clients discover size and range support via HEAD; a HEAD that 404s or omits `Accept-Ranges` breaks resume before it starts.

**How to serve them:** advertise `Accept-Ranges`, honour `Range` with `206`/`Content-Range`, validate with `If-Range`, and make HEAD accurate. It's the protocol behind every seek bar and resumable download.
