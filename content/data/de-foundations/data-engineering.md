---
title: "Data Engineering"
summary: "Building the systems that collect, move, store and prepare data for analysis and ML."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["DE", "data engineer", "data platform engineering"]
prereqs: ["data-pipeline"]
related: ["data-engineering-lifecycle", "data-hierarchy-of-needs", "data-pipeline", "etl", "data-warehouse", "data-lake", "data-roles"]
---

Data engineering is building and running the systems that **collect, move, store and prepare data** so that analysts, data scientists, ML models and applications can use it reliably. Data engineers rarely produce the final chart or model; they make sure the right data arrives, in the right shape, on time, and can be trusted.

A typical example: orders live in a production database, ad clicks in a third-party API, and app events in log files. A data engineer builds [pipelines](/t/data-pipeline) that copy these into a [warehouse](/t/data-warehouse), clean and combine them, and keep that running every day, so an analyst can ask "revenue by region last week" with one query.

## What the work looks like

- **Ingest** data from databases, APIs, files and event streams. See [data ingestion](/t/data-ingestion).
- **Store** it where it can be queried cheaply: a warehouse, a [data lake](/t/data-lake), or both.
- **Transform** it from raw and messy into clean, documented tables. See [data transformation](/t/data-transformation).
- Schedule and monitor the pipelines, and fix them when they break at 3 a.m.
- Protect and document the data: access, quality checks, ownership.

Most of it is plain software engineering: SQL, Python, version control, testing, and operating systems in production.

## How it differs from nearby roles

Software engineers build applications; data engineers build the plumbing that moves the data those applications produce. Analysts and data scientists consume the output. See [data roles](/t/data-roles).

## What goes wrong

The classic mistake is jumping to dashboards or machine learning on top of unreliable, inconsistent data. The model is only as good as what feeds it. That is the idea behind the [hierarchy of needs](/t/data-hierarchy-of-needs): reliable collection and storage come first. Another common problem is building a pipeline that works once but can't be re-run safely, which turns each failure into manual cleanup.
