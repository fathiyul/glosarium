---
title: "Pivot Table"
summary: "Dragging fields into rows, columns and values to rebuild a table any way the question needs."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["pivot table", "pivoting data", "crosstab", "cross tabulation"]
prereqs: ["group-by", "sql"]
related: ["spreadsheet-formulas", "group-by", "segmentation", "metric-discrepancy", "spreadsheets-vs-sql"]
---

A **pivot table** takes a flat table and re-summarizes it on the fly. You pick which fields become rows, which become columns, which hold the values and which act as filters; the tool groups the rows and computes the numbers. Change any field and the whole table recalculates. It is the quickest way to get from "here are a few hundred thousand order rows" to "revenue by region and month".

The same result in SQL is a `GROUP BY`:

```sql
SELECT region,
       DATE_TRUNC('month', order_date) AS month,
       SUM(total_cents) / 100.0        AS revenue_usd
FROM orders
WHERE NOT is_test_account
GROUP BY region, month
ORDER BY region, month;
```

Two traps come with pivots.

The first is **the filters**. Every field can carry its own filter, and a filter is easy to set and easy to forget. Excluding test accounts on one field, or a filter left behind on a field you have since dragged out of the layout, silently changes every number in the table. This is the usual reason two pivots of the same data disagree, which is a [metric discrepancy](/t/metric-discrepancy) even though nobody changed a definition.

The second is **the default aggregation**. The tool chooses a summary for each value field — typically a sum for numbers and a count for text, though the default varies by product and by data type — and the label is easy to skim past. A column that sums where you meant to count, or that averages an average, produces a confident wrong number.

Habits that help: state the layout — which field is in rows, columns, values and filters — in whatever you publish, and check one total by hand. When the grouping gets complicated or the data gets large, do the same thing as a query instead, so it can be reviewed and re-run ([spreadsheets vs SQL](/t/spreadsheets-vs-sql)). A pivot is a way of writing a [group by](/t/group-by); it is not a record of how you got it.
