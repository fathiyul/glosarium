---
title: "Richardson Maturity Model"
summary: "Levels of REST maturity, from one endpoint to hypermedia."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["richardson maturity model", "rmm", "rest maturity"]
prereqs: ["rest", "rest-constraints"]
related: ["rest-constraints", "hateoas", "api-contract"]
---

The **Richardson Maturity Model** grades APIs by how much of HTTP they actually use: level 0 (one endpoint, everything POST — HTTP as a tunnel), level 1 (many URIs, still all POST), level 2 (proper verbs and status codes — where most good APIs live), level 3 (**hypermedia** controls: responses link to next actions, clients follow links rather than constructing URLs).

```text
L0: POST /api {action: "getOrder", id: 42}
L1: POST /orders/42/get
L2: GET /orders/42 → 200 {…}
L3: GET /orders/42 → 200 {…, links: {cancel: …, invoice: …}}
```

It's a diagnostic, not a mandate: each level buys properties (L2 buys caching, idempotency semantics and tooling; L3 buys evolvability and discoverability) at integration cost. Most successful APIs target solid L2 with hypermedia where it pays (pagination links, state-dependent actions) rather than full L3 purity.

The classic mistakes:

- L0/L1 by default. Single-endpoint POST APIs forfeit caching, safe retries, status-code semantics and intermediary understanding — paying HTTP's costs with none of its benefits.
- L3 purism. Fully hypermedia-driven clients are rare; demanding clients navigate only by links adds complexity both sides for theoretical evolvability. Apply links where clients actually follow them.
- Wrong statuses at L2. `200` with an error body, or `500` for client mistakes, breaks every intermediary and client assumption. Statuses are the L2 contract — honour them.
- Verbs without resource modelling. `PUT /doThing` is L1 with better spelling. Level 2 needs nouns with methods, not verbs with methods.
- Using the model as a cudgel. "Not RESTful unless L3" gatekeeps working APIs into rewrites. Judge by properties gained, not levels attained.
- Skipping L2 on the way to L3. Hypermedia without correct verbs and statuses is decoration. Solid L2 first, links second.

**How to use it:** reach solid level 2 everywhere (resources, verbs, statuses, caching), add hypermedia controls where clients navigate (pagination, workflows), and stop where the returns diminish. Maturity serves evolvability — not the other way round.
