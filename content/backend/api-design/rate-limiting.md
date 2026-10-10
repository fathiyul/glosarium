---
title: "Rate Limiting"
summary: "Limiting how many requests a client can make."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-analyst: mid-level }
aliases: ["throttling", "request limits", "API rate limits", "rate limiter", "usage limits"]
prereqs: ["api-design", "http-status-codes"]
related: ["rate-limit-algorithms", "http-429", "api-gateway", "login-rate-limiting", "retry-with-backoff", "ddos"]
core: [backend]
also: [web-security, reliability]
---

**Rate limiting** caps how many requests a client can make in a time window, for example 100 requests per minute per API key. It protects your service from overload, abuse and accidental floods, and keeps one noisy client from degrading everyone else's experience.

When a client exceeds the limit, the server responds with **`429 Too Many Requests`**, and tells the client when to try again:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 30
Content-Type: application/problem+json

{ "title": "Rate limit exceeded", "status": 429, "detail": "Limit is 100 requests per minute." }
```

Many APIs also report the budget on every response (commonly `X-RateLimit-Limit`, `X-RateLimit-Remaining` and a reset time. Header names vary and standardization is ongoing), so clients can pace themselves ([HTTP 429](/t/http-429)).

## Why you need it

- **Protect capacity**: a bug or a loop in a client can overwhelm your service.
- **Fairness**: shared resources shouldn't be monopolized.
- **Security**: slow down credential stuffing, scraping and brute force ([login rate limiting](/t/login-rate-limiting)).
- **Cost control**: expensive endpoints (search, exports, AI calls) cost real money.
- **Business tiers**: free plans get a lower limit than paid ones.

## Design choices

| Question | Options |
|---|---|
| **Who is limited?** | An API key or account, a user, an IP address (careful with shared NAT), or a combination |
| **What is counted?** | Requests, or weighted by cost (a heavy endpoint costs 10) |
| **What window?** | Fixed, sliding, or token-based ([rate limit algorithms](/t/rate-limit-algorithms)) |
| **Where is it enforced?** | At an [API gateway](/t/api-gateway), a reverse proxy, or in the application, using shared state such as Redis so all servers agree |
| **Per endpoint?** | Stricter limits for expensive or sensitive endpoints (login, password reset) |

## Practical points

- **Counters must be shared** across instances, or each server enforces its own limit and the total is multiplied.
- **Choose limits from real usage**, with headroom, and allow bursts.
- **Fail open or closed?** If the limiter's store is down, decide whether to allow traffic (safer for availability) or block (safer for abuse), per endpoint.
- **Document the limits.**
- **For clients**: honor `Retry-After`, back off with jitter instead of retrying immediately, and spread requests out ([retry with backoff](/t/retry-with-backoff)).
- Rate limiting isn't a complete defense against distributed attacks ([DDoS](/t/ddos)). It's one layer.
