---
title: "REST"
summary: "An API style built on resources, URLs and HTTP methods."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior }
aliases: ["RESTful", "REST API", "Representational State Transfer", "RESTful API"]
prereqs: ["http-methods", "endpoint"]
related: ["rest-constraints", "restful-resource-naming", "richardson-maturity-model", "rest-vs-graphql-vs-grpc", "openapi", "http-status-codes"]
core: [backend, frontend]
---

**REST** is a style for designing web APIs around **resources** (things like users and orders),
identified by URLs, and manipulated with the standard [HTTP methods](/t/http-methods). Most
"REST APIs" you'll meet send and receive [JSON](/t/json).

```
GET    /users          list users
POST   /users          create a user
GET    /users/42       get one user
PUT    /users/42       replace it
PATCH  /users/42       change some fields
DELETE /users/42       remove it
GET    /users/42/orders   a user's orders (a related collection)
```

## The core ideas

- **Resources are nouns** in the URL (`/orders`), and the **method is the verb**
  (not `/getOrders` or `/deleteOrder`).
- **Stateless.** Each request carries everything needed to handle it (such as a token). The
  server doesn't keep per-client conversation state between requests.
- **Standard status codes** report the outcome ([status codes](/t/http-status-codes)).
- **Representations.** The client gets a representation (usually JSON) of a resource, not the resource itself.
- Use **consistent conventions** for naming, pagination, filtering and errors.

## In practice

Strictly following all of the original REST constraints (such as hypermedia links) is rare, and
many APIs called "RESTful" are really "JSON over HTTP with resource-style URLs". That's fine.
See the [REST constraints](/t/rest-constraints) and the
[Richardson maturity model](/t/richardson-maturity-model) for the spectrum.

## Choosing it

REST is simple, cacheable, and works with any HTTP client, which is why it's the default. For
very flexible queries, [GraphQL](/t/graphql) may fit better; for internal service-to-service
calls, [gRPC](/t/grpc). See
[REST vs GraphQL vs gRPC](/t/rest-vs-graphql-vs-grpc).

Describe your API with [OpenAPI](/t/openapi) so clients and docs stay in sync, and follow
[resource naming](/t/restful-resource-naming) conventions so URLs are guessable.
