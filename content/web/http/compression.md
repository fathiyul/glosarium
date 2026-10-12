---
title: "HTTP Compression"
summary: "gzip and Brotli shrinking responses on the wire."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["http compression", "gzip", "brotli", "content encoding"]
prereqs: ["http", "content-negotiation"]
related: ["throughput", "cdn-caching", "content-negotiation"]
---

**HTTP compression** shrinks response bodies in transit: the client advertises what it decodes (`Accept-Encoding: gzip, br`), the server compresses with one of them, and labels the result (`Content-Encoding: br`). Text compresses dramatically — HTML, CSS and JSON commonly to 20–30% of original — making it one of the highest-value bandwidth optimisations.

```text
Accept-Encoding: gzip, br, zstd   →   Content-Encoding: br   (body is Brotli)
```

The algorithms trade differently: gzip is universal and fast; Brotli compresses smaller (at higher cost) and shines for precompressed static assets; zstd is the fast modern middle. Servers typically compress dynamic responses on the fly at moderate levels and serve precompressed static files at maximum.

The classic mistakes:

- Compressing what's already compressed. Images, video, PDFs and archives gain nothing (or grow slightly) while burning CPU. Compress text; pass through binary.
- No `Vary: Accept-Encoding`. Caches must store variants per encoding — without the Vary, a Brotli body can be served to a gzip-only client.
- CRIME/BREACH-style leakage. Compressing responses that mix secrets with attacker-influenced content can leak the secret through size observations. Don't compress sensitive, attacker-shaped responses — or separate the secret from the compressible body.
- Max-level on-the-fly compression. Level-11 Brotli on every dynamic response trades huge CPU for marginal size gains. Moderate levels live; maximum precomputed for static.
- Forgetting TLS interacts. Compression happens above TLS (compress-then-encrypt per connection); it doesn't conflict, but it doesn't reduce handshake costs either.
- Assuming it fixes slowness. Compression cuts transfer bytes, not round trips or server time. It helps bandwidth-bound responses, not chatty ones.

**How to use it:** negotiate encodings properly, compress text aggressively (precomputed for static, moderate for dynamic), skip already-compressed binaries, vary correctly, and keep secrets out of attacker-influenced compressed bodies.
