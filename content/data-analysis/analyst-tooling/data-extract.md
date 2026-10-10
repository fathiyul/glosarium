---
title: "Data Extract"
summary: "A point-in-time copy of data pulled for one question, and how it drifts from the source."
levels: { data-analyst: junior }
aliases: ["data extract", "data pull", "data snapshot", "exported data"]
prereqs: ["sql", "data-warehouse"]
related: ["data-freshness", "data-reconciliation", "metric-definitions", "spreadsheets-vs-sql", "reproducible-analysis"]
---

A **data extract** is a copy of data pulled out of a system at one moment, usually into a file, to answer one question. You export a table to a spreadsheet or a CSV, or pull a month of events onto your machine, and work on the copy.

Extracts exist because they are easy. No access request, no waiting on a slow query, no risk of hammering the live system, and the file is yours to slice offline with tools you already have. They also have one useful property: an extract is frozen, so a result computed from it can be reproduced exactly — as long as you still have the file and the date you pulled it.

The trap is **drift**. The source keeps moving. A week-old extract is an accurate description of last week and of nothing else. Rows have appeared, rows have been corrected, statuses have changed, and a "discrepancy" between it and a fresh query is often just time ([data freshness](/t/data-freshness)).

What to do about it:

- Record with the file: when it was pulled, the query or filters that produced it, and the row count. Without those, an extract becomes a number nobody can trace ([metric definitions](/t/metric-definitions)).
- Date-stamp the finding: "as of the 5th", not "currently".
- Reconcile before comparing: check the row count and a total against the source ([data reconciliation](/t/data-reconciliation)).
- Anything that has to be produced again belongs in a query against the source ([spreadsheets vs SQL](/t/spreadsheets-vs-sql)).

An extract is a good answer to "what was true when I looked?". It is a poor answer to "what is true now?".
