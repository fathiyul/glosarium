---
title: "API Client / SDK"
summary: "A library wrapping an API so callers don't hand-write HTTP."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["api client", "sdk", "client library"]
prereqs: ["rest", "openapi"]
related: ["openapi", "api-contract", "api-versioning"]
---

An **API client** (SDK) wraps raw HTTP in typed functions: `client.orders.create(...)` instead of hand-built requests, manual auth headers and bespoke retry loops. Good clients handle authentication, pagination, retries, timeouts and error mapping once, so every consumer doesn't reinvent them badly.

```text
hand-rolled:  fetch(url, {headers…}) → parse → paginate → retry… (every consumer)
SDK:          client.orders.list()   (auth, paging, retries built in)
```

Clients are usually generated from a spec ([OpenAPI](/t/openapi), protobuf) or handwritten for flagship languages. Generation keeps them in sync with the API; handwriting allows idiomatic design. Either way they're a product surface: versioned, documented, and changed compatibly.

The classic mistakes:

- No client, everyone hand-rolls. Ten consumers implement auth and pagination ten ways, half wrong. Ship at least a thin client for your main languages.
- Generated but never reviewed. Raw generator output is often unidiomatic (leaked HTTP details, ugly names). Post-process or template it into something humans enjoy.
- Client and API drifting. A client pinned to v1 shapes while the API serves v2 produces subtle breakage. Version clients with the API and test them in CI.
- Hiding errors. Swallowing status codes into generic exceptions blinds consumers to rate limits and validation failures. Map errors faithfully, including retry signals.
- No timeouts or retries by default. A client without sane defaults exports every failure mode to its users. Set both, and make them configurable.
- Auth as an afterthought. Token refresh, scopes and credential storage belong in the client — otherwise each app leaks or mishandles keys.
- Breaking the client casually. Renaming a method breaks consumers exactly like renaming an endpoint. The client is a contract too.

**How to ship one:** generate from the spec where possible, refine for ergonomics, bake in auth/timeouts/retries/pagination, version it with the API, and treat it as a first-class product. The SDK is how most developers *experience* your API.
