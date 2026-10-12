---
title: "Data APIs"
summary: "Serving data to applications through an API instead of direct database access."
levels: { data-engineer: mid-level, backend: mid-level , data-scientist: mid-level }
aliases: ["data API", "analytics API", "query API", "data access API"]
prereqs: ["rest", "data-serving"]
related: ["rest-vs-graphql-vs-grpc", "graphql", "api-gateway", "pagination", "caching", "data-contract"]
---

A data API is a service that exposes prepared data to applications over HTTP or another protocol, so apps read from a curated endpoint instead of connecting straight to the database or warehouse. It is part of the [serving layer](/t/data-serving), sitting between the data platform and the product.

The classic mistake is pointing an application at the analytics warehouse. A web page asking the warehouse for "orders for the logged-in user" puts small, frequent, low-latency queries onto a system built for large scans, and lets application code run whatever SQL it likes. A bug or an unescaped parameter can then expose another customer's rows. A data API instead offers **named endpoints** with fixed, reviewed queries, such as `GET /customers/{id}/orders?limit=50`.

## What a data API handles

- Access control: authenticate the caller and filter rows by who they are ([row-level security](/t/row-level-security), [column-level security](/t/column-level-security)).
- Shape and size: return JSON shaped for the client, and page large results ([pagination](/t/pagination), [offset vs cursor](/t/offset-vs-cursor-pagination)).
- Performance: cache hot responses and cap requests per client ([caching](/t/caching), [rate limiting](/t/rate-limiting)).
- A stable contract: version the response and treat the schema as a [data contract](/t/data-contract), so client changes don't break silently.
- Safety: use [parameterized queries](/t/parameterized-query) so input can't change the SQL ([SQL injection](/t/sql-injection)).

Common styles are [REST](/t/rest) and [GraphQL](/t/graphql), chosen to fit the clients ([REST vs GraphQL vs gRPC](/t/rest-vs-graphql-vs-grpc)). A general [API gateway](/t/api-gateway) often sits in front for auth, routing and limits.

## The trade-off

A data API **adds a service to run, monitor and version**, plus a network hop. If one screen needs to read the app's own operational tables, querying the application database directly is simpler and often appropriate. Reach for a data API when the data comes from a warehouse or several sources, when many clients need the same curated shape, or when access rules and query cost must be enforced in one place. At very high request rates, precompute or cache results rather than hitting the warehouse on every call.

For data engineers, the work is producing a clean, well-modelled dataset and keeping the API's queries fast. For backend engineers, it is authentication, tenancy, pagination and running the service reliably. Agree the response contract before clients depend on it.
