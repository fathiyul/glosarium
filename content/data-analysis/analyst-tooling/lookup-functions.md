---
title: "Lookup Functions"
summary: "Pulling a value from another table by key, in a spreadsheet or in SQL."
levels: { data-analyst: junior }
aliases: ["lookup", "lookup table", "table lookup", "approximate match lookup"]
prereqs: ["join", "spreadsheet-formulas"]
related: ["join", "join-types", "data-cleaning", "spreadsheet-formulas", "data-quality-check"]
---

A **lookup** answers "what value goes with this key?" from a second table: a product name from an ID, a plan tier from a plan code, a country name from a country code. In SQL the same job is a [join](/t/join), which is worth knowing because it makes the failure modes obvious.

```sql
SELECT o.order_id, p.product_name, p.price_cents
FROM orders o
JOIN products p ON p.product_id = o.product_id;
```

Two modes, and the difference matters more than any function name:

- Exact match returns a row only when the key is found. Unmatched keys produce whatever the tool does when nothing is found — **an error, a zero or a blank**, depending on the product and its settings.
- Approximate match returns the closest row it can find, typically the largest value that is less than or equal to what you asked for. That is what you want when mapping a number into a band: which pricing tier does 1,240 units fall into? **The lookup column must be sorted**, or you get a plausible wrong answer rather than an error.

Spreadsheet programs name these functions differently and differ about which behaviour is the default, so do not carry a habit from one product into another. Check which mode you are in and what an unmatched key produces before you trust a column of them.

The other common failure is a key that does not match because of type or format: a number stored as text will not meet the same number stored as a number, and a trailing space is enough to break a match. So count the misses. A lookup where most keys return nothing is telling you the data is wrong ([data cleaning](/t/data-cleaning)), not giving you an answer, and blanks where you expected values belong in a quality report ([data quality checks](/t/data-quality-check)).
