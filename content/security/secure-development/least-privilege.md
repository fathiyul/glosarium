---
title: "Principle of Least Privilege"
summary: "Give every user and service only the access it needs."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["principle of least privilege", "PoLP", "minimal permissions", "least access"]
prereqs: ["authentication-vs-authorization"]
related: ["rbac", "iam-policy", "service-account", "break-glass-access", "defense-in-depth", "api-scopes"]
core: [backend]
---

The **principle of least privilege** says every person, program and service should have **only the access it needs to do its job, and no
more**, for only as long as it's needed.

The reason: mistakes and attacks happen. When something with broad access is compromised or just buggy, the damage is
as wide as its permissions. Narrow permissions shrink the blast radius.

## Everyday examples

| Instead of | Do this |
|---|---|
| The app connects to the database as an admin | A user that can only read and write the tables it needs, and can't drop them |
| A reporting tool with write access | A **read-only** role, ideally on a replica |
| One shared API key for everything | Separate keys per service, **scoped** to specific actions ([API scopes](/t/api-scopes)) |
| Everyone is an admin "to avoid friction" | Roles with the permissions each job needs ([RBAC](/t/rbac)) |
| A cloud role with `*` (all actions on all resources) | A policy that lists exact actions and resources ([IAM policies](/t/iam-policy)) |
| A container running as root | A [non-root user](/t/non-root-containers) |
| Developers with standing production access | Access granted when needed and time-limited ([break-glass access](/t/break-glass-access)) |

```sql
CREATE ROLE app_user LOGIN PASSWORD '...';
GRANT SELECT, INSERT, UPDATE ON orders, customers TO app_user;   -- not DROP, not other tables
```

## Putting it into practice

- **Start from nothing and add** what's needed, instead of starting from everything and removing.
- **Separate duties and identities**: don't let a service use a human's credentials, and give each service its own
  ([service accounts](/t/service-account)).
- **Time-limit powerful access**, and log its use.
- **Review permissions regularly.** Access accumulates when people change teams and projects end. Remove what isn't used.
- **Don't solve "permission denied" by granting admin.** Find the specific missing permission.

There's a cost: it takes some effort to work out what's needed, and sometimes things break the first time. That cost is small
compared with a breach through an over-privileged key. It's one layer in [defense in depth](/t/defense-in-depth).
