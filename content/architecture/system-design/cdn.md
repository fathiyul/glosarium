---
title: "CDN"
summary: "A network of edge servers serving content close to users."
levels: { backend: junior, frontend: junior }
aliases: ["content delivery network", "edge cache"]
prereqs: ["http-caching"]
related: ["static-content-hosting", "cache-control", "cache-hit-miss", "static-assets"]
also: [web-performance, caching]
---

A content delivery network (CDN) is a set of servers spread across many locations, called edge servers. When a user requests a file, the request goes to the nearest edge. If that edge has a copy, it returns it right away. If not, it fetches the file from your origin server or storage, keeps a copy, and returns it.

The benefit is distance. A user far from your server waits for a round trip to a nearby edge instead of one across the world. Repeated requests for the same file don't reach your origin at all, which reduces its load.

Which responses get cached is controlled by the [cache headers](/t/cache-control) your server sends. For fingerprinted files, a long lifetime is safe:

```http
Cache-Control: public, max-age=31536000, immutable
```

The classic mistake is letting the CDN cache a response that's personalized, such as a logged-in user's account page. The next visitor could receive it. Mark private responses with `Cache-Control: private` or `no-store`, and check which headers your CDN respects before you trust them with user data.
