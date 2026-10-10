---
title: "Roles and Privileges (GRANT, REVOKE)"
summary: "Controlling who can read and change which data."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["roles and privileges", "grant revoke", "database privileges"]
prereqs: ["database", "least-privilege"]
related: ["rbac", "least-privilege", "row-level-security", "db-connection-auth"]
---

**Roles and privileges** decide what a database user can do: which schemas and tables it may read or write, whether it can create objects, and so on. Privileges are granted with **GRANT** and taken away with **REVOKE**; a **role** is a named set of privileges that can be granted to users (or to other roles), which makes managing permissions for many users manageable.

```sql
GRANT SELECT, INSERT ON orders TO app_user;
GRANT reporting_role TO analyst;
REVOKE DELETE ON orders FROM app_user;   -- undo a too-broad grant
```

The core principle is [least privilege](/t/least-privilege): give each user or application exactly the rights it needs, no more. An application that only reads reports shouldn't hold `DELETE` on everything; that's how a read-only bug becomes data loss.

The classic mistakes:

- Giving applications superuser. A single over-privileged account means one compromise or bug can do anything — drop tables, read all data. Grant only the needed operations on the needed tables.
- One shared account for many apps/services. You can't attribute actions, and privileges sprawl to satisfy everyone. Give each service its own role.
- **Granting on `*` or the whole schema when a table is enough.** Broad grants accumulate and widen risk. Scope grants to specific objects.
- Never revoking. Privileges added for a one-off task stay forever. Review and `REVOKE` what's no longer needed.
- Relying on privilege checks in the app only. The database's privileges are the real boundary; app-level checks can be bypassed by a bug or a direct connection. Enforce at the database.
- Ignoring default privileges and public. Some databases grant public roles default access; audit what "everyone" can already do.
- Confusing roles with [row-level security](/t/row-level-security). Privileges control *which operations on which tables*; RLS filters *which rows*. Multi-tenant systems often use both.

How to manage it: define roles per responsibility (read-only reporting, app read/write, migration), grant the minimum, revoke aggressively, avoid superuser for apps, and review periodically. It's the database-level counterpart to application [RBAC](/t/rbac), and the last line of defence for your data — see [database authentication](/t/db-connection-auth).
