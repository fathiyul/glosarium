---
title: "Preflight Request"
summary: "The OPTIONS request a browser sends before certain cross-origin calls."
levels: { backend: mid-level, frontend: mid-level , data-scientist: junior }
aliases: ["preflight", "cors preflight", "options request"]
prereqs: ["cors", "http"]
related: ["cors", "safe-idempotent-methods", "api-gateway"]
---

Before a browser sends a cross-origin request that could change things — a `POST` with JSON, any `PUT`/`DELETE`, custom headers — it first sends an **OPTIONS** request asking permission: *may I send method X with headers Y to this URL?* Only if the server's CORS headers approve does the real request go out. That permission check is the **preflight**.

```text
OPTIONS /data  (Origin, Access-Control-Request-Method: POST …)
  → 200 (Access-Control-Allow-Origin, Allow-Methods, Allow-Headers, Max-Age)
POST /data     (only now does the real request fly)
```

Simple requests (plain GETs, form-style POSTs) skip preflight; everything else pays one extra round trip, cacheable via `Access-Control-Max-Age`. Servers must handle OPTIONS on CORS-enabled routes — including auth-exempt handling, since the preflight carries no credentials by design.

The classic mistakes:

- No OPTIONS handler. The API works in curl and dies in browsers because nothing answers the preflight. Every CORS route needs an OPTIONS response.
- Requiring auth on OPTIONS. The preflight is anonymous by spec; demanding tokens there fails every cross-origin call. Exempt OPTIONS from auth, validate the real request.
- Wildcard with credentials. `Access-Control-Allow-Origin: *` combined with `Allow-Credentials: true` is rejected by browsers — echo the specific origin when credentials are involved.
- Missing allowed headers. Sending `Authorization` or `Content-Type: application/json` without listing them in `Allow-Headers` fails the check. Mirror what clients actually send.
- Zero max-age in production. Without caching, every call pays a preflight round trip — doubling request latency on chatty APIs. Cache approvals for hours.
- Debugging the real request first. CORS failures happen *before* your handler runs; the error is in the OPTIONS exchange, visible in the network tab as the failed preflight.

**The rule:** if browsers call your API cross-origin with anything beyond simple requests, implement OPTIONS properly — open where safe, specific where credentials flow, and cached so it doesn't tax every call.
