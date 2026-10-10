---
title: "User-Defined Function (UDF)"
summary: "Custom code called from SQL or DataFrame operations, and its performance cost."
levels: { data-engineer: mid-level }
aliases: ["UDF", "user defined function", "custom function", "scalar UDF"]
prereqs: ["sql-functions", "dataframe"]
related: ["sql-functions", "stored-procedure", "apache-spark", "query-optimization", "dataframe"]
---

A user-defined function (UDF) is custom code you register with an engine so queries can call it like a built-in function. You reach for one when the logic you need isn't in the standard function set — parsing an odd format, calling your own library, or reusing a rule across many queries.

**The classic mistake is using a UDF for something the engine already does.** A Python UDF that computes `a + b` row by row can be far slower than the built-in `+`, because the engine can't see inside it.

## Why UDFs are slow

A UDF is a black box to the optimizer. It can't be vectorized, constant-folded, or pushed into the storage layer, and the engine can't estimate its cost. Row-at-a-time UDFs in an interpreted language also pay a per-row boundary cost between the engine and the interpreter, which is how a few million rows turn a fast query slow. Built-in [SQL functions](/t/sql-functions) avoid all of this; check for one first.

## Kinds of UDF

- Scalar: one output per input row, used in `SELECT` or `WHERE`.
- Aggregate: combines many rows into one, like a custom `SUM`.
- Table / vectorized: takes a batch of rows (often via Arrow or pandas) and returns a batch, which is much faster than per-row calls.

Names and availability differ by engine. Spark distinguishes Java/Scala UDFs from Python UDFs and from vectorized pandas UDFs; warehouses offer their own JavaScript, SQL, Java or Python variants. Don't assume one engine's UDF API or performance applies to another.

## When to use one

- Logic that SQL genuinely can't express, such as a custom parser or hashing scheme.
- A rule reused across many queries that you want versioned in one place.
- Prototyping: a UDF is fine to get an answer, then rewrite it as built-in expressions once you know it matters.

Keep UDFs small, pure, and free of per-row network or database calls. For database-resident logic, a [stored procedure](/t/stored-procedure) is the related but different tool: it runs a whole routine inside the database rather than a per-value function in a query. See [query optimization](/t/query-optimization).
