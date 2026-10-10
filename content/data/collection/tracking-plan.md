---
title: "Tracking Plan"
summary: "A shared spec of which events to track, their names and their properties."
levels: { data-engineer: mid-level, backend: mid-level , data-analyst: mid-level }
aliases: ["tracking plans", "event spec", "analytics spec"]
prereqs: ["instrumentation"]
related: ["instrumentation", "event-naming-conventions", "analytics-event-tracking", "client-vs-server-tracking", "data-contract", "event-schema-versioning"]
---

A tracking plan is a shared specification of the events you collect: for each event, its name, when it fires, its properties with types, and who owns it. It is the agreement between the people who add instrumentation and the people who analyze the data.

The classic mistake is letting engineers add events ad hoc. Six months later nobody knows whether `signup_done` includes failed attempts, whether `revenue` is in cents or dollars, or why two teams send `purchase` and `order_completed` for the same action. Analytics debt builds silently, and every report built on the confusion is suspect.

## What it contains

| Field | Example |
|---|---|
| Event name | `order_completed` |
| Description | Fired once when an order is paid |
| Trigger | After payment succeeds, server-side |
| Properties | `order_id` (string, required), `total_cents` (integer, required), `currency` (string, required) |
| Owner | Payments team |

## Why it pays off

- Consistent [event names](/t/event-naming-conventions) and property types make events comparable and findable.
- Tools can generate code and types from the plan and validate events against it.
- It is a [contract](/t/data-contract) with consumers, so changes can be reviewed and communicated like an API change ([event schema versioning](/t/event-schema-versioning)).
- It records where each event fires, which keeps [client and server tracking](/t/client-vs-server-tracking) straight.

## Trade-offs

A tracking plan adds process, and keeping it in sync with the code is ongoing work. For a tiny team it can feel heavy, but even a single maintained table beats none. Keep it versioned, review changes, and treat it as living documentation. Tools exist to host and enforce plans; a spreadsheet in the repo works for many teams. See [instrumentation](/t/instrumentation) and [data dictionaries](/t/data-dictionary).
