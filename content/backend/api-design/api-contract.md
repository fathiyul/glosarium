---
title: "API Contract"
summary: "The agreed shape and behavior of an API."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["api contract", "interface contract", "api specification"]
prereqs: ["rest", "api-documentation"]
related: ["backward-compatibility", "breaking-change", "api-first", "api-lifecycle"]
---

An **API contract** is the agreed interface between an API and the clients that consume it: the endpoints, request and response shapes, status codes, error formats, and auth expectations. It's the promise your API makes. Once consumers depend on it, changing it carelessly breaks them (see [backward compatibility](/t/backward-compatibility)).

A contract is usually written down — an OpenAPI/JSON-Schema document, a proto file, or detailed docs — so provider and consumer share one definition. That definition drives code generation, validation, mocks and [contract tests](/t/contract-testing).

```text
GET /orders/{id} → 200 { id, status, total, currency } | 404 { error }
```

The essential property is that the *shape*, not just the endpoint, is agreed. Response field names, types, nullability and error structure are all part of the contract.

The classic mistakes:

- Accidental contracts. Whatever your API returns *is* the contract, whether documented or not. An undocumented field consumers rely on is still a promise you'll break by removing it.
- Leaking internals. Shipping your database schema as the response ties consumers to internal columns. Design the shape deliberately.
- Ignoring the error contract. Consumers need to handle failures. A consistent error body and status codes are part of the contract, not an afterthought.
- Changing it without a plan. Renames and removals are [breaking changes](/t/breaking-change); additive changes usually aren't. Know which you're making (see [deprecation](/t/deprecation)).
- No single source of truth. If docs, code and reality disagree, consumers trust the wrong one. Keep the definition authoritative and test it.

**How to treat it:** design the contract before you build ([API-first](/t/api-first)), document it precisely, and change it deliberately with compatibility in mind. The contract is the product your API *is* — everything else is implementation.
