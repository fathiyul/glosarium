---
title: "Documenting Datasets"
summary: "Writing what a table contains, its grain, owner and caveats."
levels: { data-engineer: junior , data-analyst: mid-level }
aliases: ["dataset documentation", "table documentation", "documenting tables", "dataset README", "data documentation"]
prereqs: ["data-dictionary", "grain"]
related: ["data-dictionary", "data-catalog", "data-contract", "data-ownership", "metric-definitions", "data-product"]
core: [data-engineer]
---

Someone will use your table without asking you, perhaps in six months, perhaps after you've left the team. **Documenting datasets** means
writing down enough that they can use it correctly.

## What to write

A good dataset page answers:

| Question | Example |
|---|---|
| **What is it?** | One row per paid order, with totals and status. Excludes test orders |
| **What's the grain and key?** | One row per `order_id`, unique ([grain](/t/grain)) |
| **Where does it come from?** | Built from `app_db.orders` and `payments`, by the `orders_daily` pipeline |
| **How fresh is it?** | Updated daily by 06:00 UTC; up to 24 hours behind ([data freshness](/t/data-freshness)) |
| **Who owns it?** | Payments data team, `#data-payments` ([data ownership](/t/data-ownership)) |
| **What do columns mean?** | See the [data dictionary](/t/data-dictionary): units, time zones, null rules |
| **What are the caveats?** | Refunds appear as separate rows. Orders before 2022 are missing `channel` |
| **How should I use it?** | An example query, and what *not* to use it for |
| **Is it sensitive?** | Contains emails; restricted ([data classification](/t/data-classification)) |
| **What are the guarantees?** | Tested for uniqueness and not-null; SLA and contract ([data contracts](/t/data-contract)) |

```markdown
# analytics.orders
One row per paid order. Grain: `order_id`. Owner: Payments data. Refreshed daily 06:00 UTC.

**Caveats**: `total_cents` is after discounts, before tax. Test accounts are excluded.

**Example**
SELECT DATE_TRUNC('month', created_at) AS month, SUM(total_cents)/100.0 AS revenue
FROM analytics.orders GROUP BY 1;
```

## Where to keep it

- **Next to the code** (model definitions or schema files in the same repo), so it changes in the same pull request as the table.
- **Surfaced in the [data catalog](/t/data-catalog)**, where users search.

## Habits

- **Write the "why" and the surprises**, not only names and types. A description that repeats the column name helps nobody.
- **Document as you build**, not after. It never gets done later.
- **Treat undocumented tables as unfinished.** Make it part of "done" and part of code review.
- **Keep it current.** Remove or update stale text, and mark deprecated tables ([deprecating tables](/t/deprecating-tables)).
- **Test your docs**: give them to someone new and see if they can answer a real question without asking you.
