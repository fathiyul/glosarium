---
title: "Transaction, Snapshot and Accumulating Facts"
summary: "Three kinds of fact table for events, periodic states and processes."
levels: { data-engineer: senior }
aliases: ["fact table types", "transaction fact table", "periodic snapshot fact table", "accumulating snapshot fact table"]
prereqs: ["fact-table", "grain"]
related: ["dimensional-modeling", "factless-fact-table", "slowly-changing-dimension", "date-dimension", "star-schema", "surrogate-key-dw"]
---

Kimball's dimensional modeling describes three main kinds of [fact table](/t/fact-table). They differ in what one row represents and whether rows change after they are written. Choosing the wrong one is a common reason a model can't answer the questions it was built for.

| Type | One row is | Written once? | Answers |
|---|---|---|---|
| **Transaction** | one event: a sale, a click, a payment | yes, insert-only | "what happened?" |
| **Periodic snapshot** | one entity's state for one period: an account balance per day | yes, one row per period | "what was the state each period?" |
| **Accumulating snapshot** | one process instance: an order moving through stages | no, updated as stages finish | "how long did each stage take?" |

## Transaction fact tables

The most common kind, and usually the finest grain. Each event is a row with its dimensions and measures. They are insert-only, so they're simple to load and flexible to query. Most facts in a warehouse are transaction facts.

## Periodic snapshot fact tables

A row per entity per period, whether or not anything happened: daily account balances, month-end inventory, weekly subscription counts. They give dense history, so trends and period-to-period comparisons are easy, but they duplicate state and grow with the number of entities times the number of periods. Their measures are often semi-additive — you can add balances across accounts but not across time ([measures](/t/fact-table)).

## Accumulating snapshot fact tables

One row per process instance, with a date key for each milestone (order date, ship date, delivery date) and often lag columns (days to ship, days to deliver). The row is **updated** as the process advances. This makes lifecycle and duration analysis straightforward — "average days from order to delivery by warehouse" — at the cost of updating rows, which is unusual for fact tables.

## Choosing

- Default to a transaction fact: it's the most flexible, and you can derive most snapshots from it.
- Build a periodic snapshot when you need regular state over time and don't want to recompute it from events each time, and when events may be missing.
- Build an accumulating snapshot when you track a process with defined stages and care about durations.

Don't mix types in one table; a row that is sometimes an event and sometimes a state has no single grain. Milestone dates in an accumulating snapshot are usually different roles of one [date dimension](/t/date-dimension). A table with no measures at all is a [factless fact table](/t/factless-fact-table).
