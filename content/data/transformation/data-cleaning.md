---
title: "Data Cleaning"
summary: "Fixing types, formats, missing values and duplicates."
levels: { data-engineer: junior }
aliases: ["data cleansing", "data scrubbing", "cleaning data", "data wrangling", "data preparation"]
prereqs: ["data-profiling"]
related: ["data-transformation", "deduplication", "null-in-sql", "case-expression", "data-normalization-values", "landing-zone"]
core: [data-engineer]
---

**Data cleaning** is fixing problems in raw data so it's usable: wrong types, inconsistent formats, missing values, duplicates, stray
whitespace and impossible values. It typically takes up a large share of the work in any data project.

## Common problems and fixes

| Problem | Example | Fix |
|---|---|---|
| **Wrong types** | `"42"` stored as text, dates as strings | Cast to proper types; reject what can't be parsed |
| **Inconsistent formats** | `2024-06-01`, `06/01/2024`, `1 Jun 2024` | Standardize on one format ([ISO 8601](/t/iso-8601)) |
| **Inconsistent categories** | `US`, `USA`, `United States`, `us` | Map to one canonical value ([normalizing values](/t/data-normalization-values)) |
| **Whitespace and case** | `" Ana "`, `"ANA"` | Trim; standardize case where meaning allows |
| **Missing values** | `NULL`, `""`, `"N/A"`, `-1`, `9999` | Decide what each means; convert placeholders to real nulls ([NULL in SQL](/t/null-in-sql)) |
| **Duplicates** | Same order loaded twice | [Deduplicate](/t/deduplication) |
| **Outliers / impossible values** | Age 400, negative quantity, a date in 1970 | Investigate: error or real? Flag, fix or exclude, with a record of what you did |
| **Units and currencies** | Amounts in cents vs dollars, mixed currencies | Convert to a standard |
| **Time zones** | Local times without zones | Normalize to UTC ([time zones](/t/timezone)) |

```sql
SELECT
  CAST(order_id AS BIGINT)                                  AS order_id,
  LOWER(TRIM(email))                                        AS email,
  NULLIF(TRIM(phone), '')                                   AS phone,
  CASE WHEN UPPER(country) IN ('US', 'USA') THEN 'US' ELSE UPPER(country) END AS country,
  CAST(created_at AS TIMESTAMP)                             AS created_at
FROM raw_orders;
```

## Principles

- **Profile first** ([data profiling](/t/data-profiling)). You can't clean what you haven't looked at.
- **Never overwrite the raw data.** Clean into a new layer, keeping the original in the [landing zone](/t/landing-zone), so mistakes are
  fixable.
- **Write rules as code**, versioned and repeatable, not as manual spreadsheet edits.
- **Don't silently drop rows.** Quarantine rejects with the reason, count them and report the numbers.
- **Don't guess.** Filling a missing value with an average or zero changes the analysis. Do it deliberately and say so.
- **Be careful with "fixing" the data to look right.** Sometimes an odd value is the finding.
- **Add tests** that the cleaned output meets expectations (no nulls in key columns, valid ranges), so regressions get noticed.
- **Fix at the source** when you can. Cleaning downstream is a workaround for upstream problems.

Cleaning is one part of [data transformation](/t/data-transformation).
