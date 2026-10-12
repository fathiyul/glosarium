---
title: "Descriptive Statistics"
summary: "Summarising a dataset with counts, averages, spread and shape."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["summary statistics", "descriptive stats", "summary stats"]
prereqs: ["central-tendency", "group-by"]
related: ["distribution-shapes", "standard-deviation", "quartiles-and-iqr", "exploratory-data-analysis", "data-profiling", "histogram"]
---

Descriptive statistics are the numbers you compute to say what is in a dataset: how many rows there
are, what a typical value looks like, how much the values vary, and what shape they form. They
**describe the data you have** and make no claim about anything beyond it.

A first pass over a table usually covers the same four things:

```sql
SELECT COUNT(*)                AS row_count,
       COUNT(DISTINCT user_id) AS distinct_users,
       AVG(order_value)        AS mean_order,
       MIN(order_value), MAX(order_value)
FROM orders;
```

```text
| What          | Common measures                | Why you need it                  |
|---------------|--------------------------------|----------------------------------|
| Count         | row count, distinct counts,    | "the average is 5" means little  |
|               | how many are missing           | without knowing how many rows    |
| Typical value | mean, median, mode             | see central tendency             |
| Spread        | range, standard deviation, IQR | two datasets can share a mean    |
|               |                                | and nothing else                 |
| Shape         | histogram, skew, number of     | tells you which of the above     |
|               | peaks                          | to trust                         |
```

The classic mistake is reporting the mean on its own. Two checkout flows can both average four
minutes — one tight around four, one mostly one minute with a slow tail. Same average, completely
different [distribution shape](/t/distribution-shapes), and a
[histogram](/t/histogram) settles it in seconds.

Two habits that keep summary numbers honest.

First, **report the count next to the number**. A percentage from twelve rows and a percentage from
twelve thousand should not be quoted the same way.

Second, know what a blank means before you trust the row count. Most tools skip blanks inside
`AVERAGE` but include them in a "count all" function, and spreadsheets and SQL disagree about text
and blank handling. Check what your tool does rather than assuming — the spreadsheet is the usual
place where this bites ([spreadsheet formulas](/t/spreadsheet-formulas)).

For a fuller first look at a table, see [exploratory data analysis](/t/exploratory-data-analysis)
and [data profiling](/t/data-profiling).
