---
title: "Self Join"
summary: "Joining a table to itself, e.g. employees and their managers."
levels: { backend: mid-level, data-engineer: junior }
aliases: ["self-join", "recursive relationship"]
prereqs: ["crud"]
related: ["relationship-types", "null", "coalesce-nullif", "table-row-column"]
---

A self join joins a table to itself. It's useful when rows in a table refer to other rows in the same table, such as an employee who has a manager who is also an employee.

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees AS e
LEFT JOIN employees AS m ON e.manager_id = m.id;
```

The table appears twice, so each copy needs its own alias (`e` and `m`). Each employee row is matched against the row for their manager. A `LEFT JOIN` keeps employees with no manager, such as the top of the hierarchy, whose `manager_id` is [NULL](/t/null). Their `manager` column comes back as NULL rather than the row being dropped.

The classic mistake is using an inner join here. An inner join silently drops everyone without a manager, so the top of the hierarchy disappears from the results. Forgetting the aliases is also common, and the database will reject the ambiguous column names.

Self joins only go one level deep. To walk a whole chain of managers, you need a recursive query, which is supported by most major databases but written differently in each. Before you rely on the data, check that no row points at itself or forms a loop, since a loop will confuse both the query and the people reading it. See [relationship types](/t/relationship-types) for the general pattern.
