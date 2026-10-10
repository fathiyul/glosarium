---
title: "Admin and Back-Office Tools"
summary: "Internal tools for support and operations to view and fix data."
levels: { backend: mid-level }
aliases: ["admin panel", "back-office", "admin tools"]
prereqs: ["request-lifecycle"]
related: ["rbac", "audit-columns", "feature-flags", "idempotency-key"]
---

An **admin panel** (or back-office tool) is an internal interface where staff — support, operations, finance — can inspect and change data and configuration without a developer or direct database access. It's the difference between "support can issue that refund themselves" and "support files a ticket for an engineer to run a script".

Typical jobs it does:

- Look up a customer or record and see its full state.
- Make bounded changes — reset a password, apply a credit, retry a stuck job, toggle a feature.
- Reconcile — find records that failed halfway and fix them.
- Gate risky actions behind roles and reason tracking (see [RBAC](/t/rbac) and [audit columns](/t/audit-columns)).

```text
support needs refund → admin panel (role-gated, logged) → no engineer, no prod DB
```

The classic mistakes:

- Bypassing the application's rules. An admin that writes directly to the database can set states the app considers impossible, corrupting invariants. Route changes through the same service layer the app uses.
- No permissions. Everyone with the admin URL can do everything, including deleting data. Gate by role, and require a reason for destructive actions.
- No audit trail. Who changed what, when and why is exactly what you need after a mistake. Log every mutation ([audit columns](/t/audit-columns)).
- Running it in production with no guardrails. An admin action that triggers a mass email or a big recompute can be a production incident. Preview, limit, and confirm the blast radius.
- Building the whole app twice. A hand-built admin duplicating all business logic drifts from the real app. Prefer reusing the service layer, or a framework that introspects your models.

**When to build one:** as soon as non-engineers need to operate on live data, which is almost always. It converts risky ad-hoc database work into reviewed, permissioned, logged actions — the same discipline as [fixing data in production](/t/production-data-fix), made routine and safe.
