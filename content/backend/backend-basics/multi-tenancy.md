---
title: "Multi-Tenancy"
summary: "Serving many customers from one system while keeping their data apart."
levels: { backend: senior , tech-entrepreneur: mvp }
also: [product-features, architecture-styles]
aliases: ["multi-tenancy", "multitenancy", "tenants"]
prereqs: ["database", "rbac"]
related: ["organizations-teams", "row-level-security", "connection-pooling", "audit-columns"]
---

**Multi-tenancy** is running one system for many separate customers (tenants) — many organisations sharing your app and, usually, your database, while seeing only their own data. It's how SaaS apps serve thousands of customers without deploying the app thousands of times.

The main isolation models, from most shared to most separate:

- Shared schema, `tenant_id` column — all tenants in the same tables, every query filters by tenant. Cheapest and easiest to operate; the isolation is a discipline you must enforce.
- Schema per tenant — each tenant gets its own set of tables in one database. More separation, more migration overhead.
- Database (or instance) per tenant — strongest isolation and noisy-neighbour protection, highest cost and operational burden.

```text
shared schema:   rows carry tenant_id → every query MUST filter by it
db per tenant:   hard wall between tenants → more cost to run
```

The classic mistakes:

- Forgetting the tenant filter. The signature multi-tenant bug: a query without `tenant_id` returns another customer's data. It's a serious data leak. Enforce tenant scoping centrally — a base scope, [row-level security](/t/row-level-security), or a data-access layer that can't query unscoped.
- Enumerable identifiers across tenants. If IDs are global and guessable, one tenant can probe another's records. Use unguessable ids or always scope by tenant.
- Noisy neighbours. One heavy tenant can slow the shared system for everyone. Add per-tenant limits, quotas and monitoring (see [backpressure](/t/backpressure)).
- Migration pain at scale. With schema- or db-per-tenant, a change means touching every tenant. Automate migrations and rehearse them.
- Tenant confusion in caches and connections. Cached data or pooled connections mixing tenants leaks state. Key caches by tenant and verify scoping.
- Treating tenant as just a filter. Tenant should be a first-class part of the [request context](/t/request-context), threaded everywhere data is touched.

**How to choose:** start with shared schema and a strict, centralised tenant scope; move to stronger isolation only when a customer, compliance or noisy-neighbour problem demands it. Multi-tenancy is mostly about *enforcing* isolation consistently — see [organisations and teams](/t/organizations-teams) and [RBAC](/t/rbac) for the access side.
