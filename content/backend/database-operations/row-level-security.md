---
title: "Row-Level Security"
summary: "The database itself filtering rows per user or tenant."
levels: { backend: senior, data-engineer: mid-level }
also: [data-governance]
aliases: ["row-level security", "RLS", "row level security"]
prereqs: ["rbac", "db-roles-privileges"]
related: ["multi-tenancy", "least-privilege", "database"]
---

**Row-level security (RLS)** lets the database enforce which *rows* a query may return or change, based on the current user or session. You define a **policy** (`WHERE tenant_id = current_tenant()`), and the database automatically appends it to every query against that table. Even a query written without a tenant filter returns only the allowed rows.

```sql
CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.tenant_id')::int);
```

Where column privileges say *which operations on which tables* are allowed, RLS says *which rows*. It's a strong defence in depth: even if application code forgets a `WHERE tenant_id = ?`, the database applies it.

It's used most in **multi-tenancy** and for per-user access rules, where the alternative is trusting every query in the codebase to include the right filter.

The classic mistakes:

- Treating it as a replacement for application checks. RLS is defence in depth, not the only line. Application logic should still scope queries correctly; RLS catches the inevitable miss.
- Forgetting to set the session context. A policy based on `current_setting('app.tenant_id')` needs the application to set that value per request/connection. If it's unset, the policy may allow or deny unexpectedly. Set it reliably (and reset on connection reuse).
- Ignoring pooled connections. With [connection pooling](/t/connection-pooling), a session setting can leak between requests if not reset. Set the tenant per transaction/request and clear it.
- Not covering all operations. Policies can differ for SELECT, INSERT, UPDATE, DELETE; a policy that only filters reads may leave writes unscoped. Define policies for each relevant command.
- Performance. The policy predicate is applied to every query; index the columns it uses (often the tenant id) so it doesn't slow things down.
- Assuming it applies to table owners. Owners and superusers often bypass RLS by default — so a connection using a powerful role sees everything. Use a restricted role for the application.
- Overlooking complex policies. Multiple overlapping policies (permissive vs restrictive) combine in ways that surprise; test what each role actually sees.

**How to use it:** define policies per table for the tenant/user dimension, set session context per request on a restricted role, index the policy columns, and treat it as a safety net behind correct application scoping. It's the database enforcing isolation that [multi-tenancy](/t/multi-tenancy) demands, and a good example of [least privilege](/t/least-privilege) applied to rows.
