---
title: "Organizations, Teams and Memberships"
summary: "Modeling accounts that many users share, with roles per membership."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["organizations and teams", "organizations", "teams and memberships"]
prereqs: ["multi-tenancy", "rbac"]
related: ["multi-tenancy", "rbac", "invitations", "service-account"]
---

**Organisations, teams and memberships** model how users group together: an organisation (a customer/tenant) contains teams or projects, and users join as **members** with roles. This is the structure almost every B2B product needs — a company account with several people, some with admin rights, some with limited access.

```text
Organization "Acme" ──contains──▶ Teams (Engineering, Sales)
        │
        └── Memberships: alice(admin), bob(member), ...
```

Key concepts:

- Membership — the link between a user and an org (or team), carrying their role. A user can belong to several orgs.
- Roles — what a member may do (owner, admin, member), enforced via [RBAC](/t/rbac).
- Tenant isolation — the org is usually the [multi-tenancy](/t/multi-tenancy) boundary; data is scoped to the org.

The classic mistakes:

- User-owned data instead of org-owned. A resource belonging to a *user* breaks when they leave or when the company owns it; typically data belongs to the *organisation*. Model ownership deliberately.
- Forgetting the cross-org case. Users are often in multiple organisations (a contractor, an agency). Design for a user ↔ many orgs, with an active org per session/request.
- Leaky tenant scoping. Every query and cache must scope to the org, or one org sees another's data (see [multi-tenancy](/t/multi-tenancy) and [row-level security](/t/row-level-security)).
- Roles too coarse or too fine. A single "admin" everywhere is limiting; per-resource roles are complex. Find a workable middle and enforce it.
- Membership lifecycle gaps. Joining (see [invitations](/t/invitations)), removing, transferring ownership, and what happens to a departing user's data all need handling.
- Deleting an org carelessly. Removing an org must remove or archive all its data across services — a big cascade. Treat it like [account deletion](/t/account-deletion) at org scale.
- Confusing users with memberships. The same person in two orgs has two memberships with potentially different roles; the user is not the membership.

**How to design it:** model organisations as the tenant and ownership unit, memberships as the user↔org link with a role, and teams as optional sub-groupings; scope all data and enforcement to the org; and handle the membership lifecycle carefully. It's the backbone of multi-user products and the foundation [RBAC](/t/rbac) and [invitations](/t/invitations) build on. See [service accounts](/t/service-account) for non-human members.
