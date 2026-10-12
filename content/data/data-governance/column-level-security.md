---
title: "Column-Level Security"
summary: "Restricting access to specific sensitive columns."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["column level access control", "column security", "per-column access", "column permissions"]
prereqs: ["data-classification", "rbac"]
related: ["row-level-security", "data-masking", "data-classification", "rbac", "pii", "access-control-models"]
---

Column-level security restricts access to specific columns, so a user can query a table but not read the sensitive parts of it. An analyst might see an orders table with `order_id`, `amount` and `region` but get an error or a masked value for `customer_email`. The database or warehouse enforces this; it is not a convention people are asked to follow.

The alternative is table-level grants, which are all or nothing. To let analysts read orders you would also expose every personal column in it, or you would have to build a separate view for each audience. The classic mistake is a broad `GRANT SELECT ON users` that quietly hands out emails, phone numbers and national IDs to everyone in the role.

## How it is done, by engine

Support and syntax differ a lot, so check your platform:

- Some relational databases support column-level grants, close to `GRANT SELECT (order_id, amount) ON orders TO analyst_role`. PostgreSQL, for example, allows privileges on individual columns.
- Warehouses often use a policy layer instead: a masking policy or a policy tag attached to a column, evaluated per role or per user. Snowflake masking policies and BigQuery policy tags are examples of this approach.
- A common fallback is a view that selects only the safe columns and grants access to the view, not the base table.

This is a different axis from [row-level security](/t/row-level-security), which filters which rows a user sees. Many systems let you combine both.

## Trade-offs

**It breaks `SELECT *`.** Queries, ORMs and BI tools that select every column may fail or return masked values, so adding it to a live table can surprise people. Test with the real consumers.

**It multiplies.** Columns times roles times tables grows fast. Prefer roles and reusable policy tags over one-off grants.

**Denial is coarse.** Sometimes you want a value hidden from some users but still usable in aggregate; [data masking](/t/data-masking) hides the value while keeping the data usable, and may fit better.

**You must know which columns are sensitive first**, which is what [data classification](/t/data-classification) is for.

Column-level security is one control among several; it works with classification, masking and least-privilege roles, not instead of them.
