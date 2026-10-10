---
title: "Designing a URL Shortener"
summary: "A classic beginner system design exercise."
levels: { backend: mid-level }
aliases: ["url shortener", "design url shortener", "tinyurl design"]
prereqs: ["clarifying-requirements", "key-value-store"]
related: ["key-value-store", "cache-hit-miss", "consistent-hashing"]
---
**Designing a URL shortener** is the canonical system-design exercise because it's small enough to finish and rich enough to matter: accept long URLs, mint short codes, redirect fast at scale — with analytics, expiry and abuse handling as follow-ups. The design hinges on the read/write ratio (redirects dominate writes ~100:1) and the id space.

```text
POST /shorten {url} → code (base62 of id) → store code→url
GET /:code → lookup → 301/302 redirect (+ cache hot codes)
```

Key decisions: code generation (counter + base62 is simple and ordered; random needs collision checks; hash needs salting), storage (key-value lookups by code, with hot-code caching), redirect type (301 caches permanently, 302 allows analytics and changes), and rate limiting plus spam/malware filtering on creation.

The classic mistakes:

- Random codes without collision handling. Birthday collisions arrive fast at scale; check-and-retry or counter-based generation avoids the loop.
- 301 everywhere. Permanent redirects cache in browsers/CDNs — changing the destination later won't reach cached clients. Use 302 unless permanence is truly intended.
- No rate limiting on creation. Open shortening becomes a spam/phishing service within days. Authenticate or throttle creation; scan destinations.
- Single database, no cache. Redirect lookups are the hot path — cache aggressively; the write path can be slower and safer.
- Counter without coordination. A single auto-increment source bottlenecks distributed creation; preallocate ranges per generator or use ordered UUIDs.
- Forgetting expiry and deletion. Short links accumulate forever; abuse reports and dead destinations need removal paths and retention policy.
- Analytics as an afterthought. Click tracking bolted onto the redirect path slows every redirect; count asynchronously (see [write-behind](/t/write-behind-cache)).

**Why it teaches:** id generation, caching, read/write asymmetry, redirects, abuse — the shortener compresses distributed-systems fundamentals into one afternoon. Scale the numbers up and the same decisions recur everywhere.
