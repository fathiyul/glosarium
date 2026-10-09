---
title: "Data Serving"
summary: "Making prepared data available for analysis, ML and applications."
levels: { data-engineer: junior }
aliases: ["serving layer", "data delivery", "consuming data"]
prereqs: ["data-pipeline"]
related: ["business-intelligence", "bi-dashboard", "data-api", "feature-store", "semantic-layer", "reverse-etl-use-cases", "aggregate-tables"]
---

Data serving is the last stage of the data lifecycle: making the prepared data available to the people and systems that use it. Everything before this (ingestion, storage, transformation) exists so that something useful can happen here.

Different consumers need different things:

| Consumer | Needs | Typical way to serve |
|---|---|---|
| Analysts, executives | Charts and ad hoc SQL | [BI tools](/t/business-intelligence) on the warehouse |
| ML models | Consistent training and live features | [Feature store](/t/feature-store), [training data](/t/training-data) |
| Applications | Fast lookups, low latency | [Data API](/t/data-api), cache or key-value store |
| Operational tools (CRM, ads) | Data pushed back into SaaS apps | [Reverse ETL](/t/reverse-etl-use-cases) |
| Other teams or partners | Shared datasets | Data sharing, exported files |

## Why it deserves attention

A warehouse full of excellent tables is worthless if people can't find or trust them. Serving is where usability counts: clear names and documentation, agreed metric definitions, acceptable speed, and the right access controls.

## Common mistakes

- **Serving from the wrong store.** A warehouse is built for large analytical scans, not for a web app needing responses in milliseconds. Copy the data to something suited to that access pattern.
- **Everyone computing metrics their own way.** Define them once in a [semantic layer](/t/semantic-layer) or a modelled table.
- **Ignoring freshness.** Consumers need to know how up to date the data is, and be told when it breaks.
- **Exposing raw tables.** Serve curated, tested ones, and keep sensitive columns restricted.
- No feedback loop. Find out who uses what; unused outputs cost money.

The best shape of output follows the consumer, so ask them what they need before choosing the tool.
