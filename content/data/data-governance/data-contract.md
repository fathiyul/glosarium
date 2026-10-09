---
title: "Data Contract"
summary: "An agreed, enforced schema and quality promise between data producers and consumers."
levels: { data-engineer: senior }
aliases: ["data contracts", "producer consumer data agreement", "dataset contract", "schema contract", "data interface agreement"]
prereqs: ["schema-evolution", "data-ownership"]
related: ["schema-drift", "data-product", "data-sla", "data-ownership", "data-tests", "source-systems"]
core: [data-engineer]
---

A **data contract** is an **explicit, enforced agreement between the producer of data and its consumers** about what the data looks like and what's guaranteed: its schema, meaning, quality expectations, delivery schedule and how changes will be handled. It turns an unwritten assumption ("the orders table has these columns, always") into a documented, testable interface.

The problem it solves is painfully common: an application team renames a column or changes a field's meaning, **without knowing** that three pipelines, a dashboard and a model depend on it. The data team finds out when something breaks, or worse, **silently** produces wrong numbers ([schema drift](/t/schema-drift)).

## What it typically contains

```yaml
# illustrative contract
dataset: orders.order_events
owner: payments-team            # who is accountable
description: "One event per order status change. Source of truth for order lifecycle."
schema:
  - name: order_id      type: string   required: true   unique_with: [event_ts]
  - name: status        type: string   allowed: [created, paid, shipped, cancelled]
  - name: total_cents   type: integer  min: 0
  - name: event_ts      type: timestamp (UTC)
quality:
  freshness: "events available within 15 minutes"
  completeness: "no gaps in order sequence"
sla: "99.5% on time"
changes: "breaking changes announced 30 days ahead; additive changes allowed"
pii: [customer_email]           # classification
```

Typical parts: **schema and types**, **semantics** (what fields mean, units, time zones), **constraints and quality rules**, **service levels** ([data SLAs](/t/data-sla)), **ownership and contact**, **sensitivity classification**, and a **change and versioning process** ([schema evolution](/t/schema-evolution)).

## Making it more than a document

A contract that lives only in a wiki gets ignored. Value comes from **enforcement**:

- **At the producer**: validate against the contract in CI. A pull request that breaks a published schema fails the build, **before** it ships (a "shift-left" approach).
- **At the boundary**: validate data on write or on ingestion, rejecting or quarantining violations ([data tests](/t/data-tests)).
- **In the pipeline**: contract checks gate publication ([write-audit-publish](/t/write-audit-publish)).
- **With notifications**: consumers subscribe to changes, so they hear before it breaks.

## Why it matters

- **Fewer surprise breakages** and clearer accountability.
- **Faster, safer change**: producers know what they can modify freely, and what needs coordination.
- **Trust in data** as a product ([data products](/t/data-product)).
- **Lower cost of data quality problems**: fixing them at the source is cheaper than downstream patches.
- **Decoupling**: the contract, not the producer's internal tables, defines the interface (don't expose raw application tables directly, publish a deliberate model).

## Starting small

1. Pick **one critical interface** (a table or event stream with painful incidents).
2. **Write down** schema, meaning, owner and expectations together with producer and consumers.
3. **Automate one check** in the producer's CI or at ingestion.
4. **Agree a change process**: notice periods, deprecation ([deprecating tables](/t/deprecating-tables)).
5. Expand gradually.

## Cautions

- **It's organizational as much as technical.** Producers must accept responsibility for downstream users, which needs buy-in and incentives.
- **Don't over-specify.** Rigid contracts on everything slow teams down. Focus on interfaces that matter.
- **Contracts need versioning and an owner** to avoid becoming stale.
- Tools and formats (including open specifications) exist, but the practice matters more than the tool.
