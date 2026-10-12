---
title: "ETag"
summary: "A version identifier used for conditional requests and caching."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
also: [caching, api-design]
aliases: ["etag", "entity tag", "etag header"]
prereqs: ["http", "cache-control"]
related: ["conditional-request", "cache-control", "cdn-caching"]
---

An **ETag** is a version identifier a server attaches to a response — a hash of the content, a version number, anything that changes when the bytes change. On the next request the client sends it back (`If-None-Match`), and if it still matches, the server replies `304 Not Modified` with no body. Bandwidth saved, latency cut.

```text
GET /report      → 200, ETag: "v42", [body]
GET /report      → If-None-Match: "v42" → 304 (unchanged, no body)
```

Strong validators change on any byte difference; weak ones (`W/"v42"`) signal semantic equivalence and allow tiny insignificant differences. Either way, the ETag turns "download it again to check" into "ask if it changed."

The classic mistakes:

- No ETag on revalidatable responses. `must-revalidate` without a validator forces full downloads. The pair is what makes caching efficient.
- Weak generation. An ETag that doesn't actually change with the content (a timestamp rounded to the hour, a deployment id) serves stale bytes with a fresh stamp. Derive it from the content or a real version.
- Leaking information. ETags derived from internal details (inode numbers, exact build hashes) fingerprint servers. Prefer opaque hashes.
- ETag-only caching. Validation still costs a round trip; combine validators with `max-age` freshness so most uses never revalidate at all.
- Forgetting Vary interaction. The ETag identifies one variant; caches must still separate variants by the negotiated dimensions.
- Using ETags for concurrency naively. `If-Match` gives optimistic locking on writes, but only if every writer honours it — pair with real transaction discipline server-side.

**How to use it:** emit a content-derived ETag on cacheable GETs, honour `If-None-Match` with `304`s, and layer freshness (`max-age`) above validation. It's a few bytes of header that eliminate most redundant transfer.
