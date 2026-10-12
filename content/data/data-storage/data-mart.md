---
title: "Data Mart"
summary: "A subset of the warehouse focused on one team or subject."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["data marts", "mart", "subject area"]
prereqs: ["data-warehouse", "dimensional-modeling"]
related: ["star-schema", "fact-table", "dimension-table", "semantic-layer", "staging-intermediate-marts"]
---

A data mart is a focused subset of a [data warehouse](/t/data-warehouse) built for one team or one subject — sales, marketing, finance. Instead of querying raw tables and joining them by hand, a team queries a small set of clean, modeled tables that already answer their questions.

The classic mistake is letting every analyst query the whole warehouse directly. They each re-implement the same joins and metric logic, get slightly different numbers, and hammer the biggest tables. A mart gives them a governed starting point: for example, a marketing mart with a `campaign_performance` table rather than six raw event tables.

A mart usually follows [dimensional modeling](/t/dimensional-modeling): a [fact table](/t/fact-table) of measures joined to [dimension tables](/t/dimension-table), often in a [star schema](/t/star-schema).

## Dependent vs independent

- A **dependent** mart is built from the warehouse's curated data. It inherits consistent definitions and is the common modern pattern.
- An **independent** mart is fed straight from source systems. It is faster to stand up but tends to duplicate logic and drift from the warehouse.

## Trade-offs

Marts make queries simpler and faster, but each new mart adds another place where definitions live. Too many marts, built by different teams, recreate the original problem — conflicting numbers. Keep shared metrics in one place (see the [semantic layer](/t/semantic-layer)) and organize transformation layers deliberately; see [staging, intermediate and mart layers](/t/staging-intermediate-marts).

When not to use a mart: if a single team's questions are still exploratory, a well-documented set of staging tables may be enough. Build a mart once the access pattern is stable and shared.
