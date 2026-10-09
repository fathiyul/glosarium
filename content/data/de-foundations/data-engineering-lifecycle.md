---
title: "Data Engineering Lifecycle"
summary: "Generation, ingestion, storage, transformation and serving, plus the undercurrents beneath them."
levels: { data-engineer: junior }
aliases: ["data engineering lifecycle", "DE lifecycle", "data lifecycle", "undercurrents"]
prereqs: ["data-engineering", "source-systems"]
related: ["undercurrents", "data-ingestion", "data-hierarchy-of-needs", "data-roles", "modern-data-stack", "data-product"]
core: [data-engineer]
---

The **data engineering lifecycle** is a way to organize the whole job: the stages data passes through from being created to being
used, and the cross-cutting concerns that apply to every stage. The framing comes from the book *Fundamentals of Data
Engineering* (Reis and Housley), and is widely used to talk about the field.

```
 Generation → Ingestion → Storage → Transformation → Serving
 (source          ↑                                    (analytics, ML,
  systems)        └──── Storage underpins every stage ─    reverse ETL)

 ─────────────── Undercurrents (cross-cutting) ───────────────
 Security · Data management · DataOps · Data architecture · Orchestration · Software engineering
```

## The stages

| Stage | What happens |
|---|---|
| **Generation** | Data is created in [source systems](/t/source-systems): databases, apps, devices. Data engineers usually don't own these, but depend on them |
| **Ingestion** | Data is moved from sources into your systems ([data ingestion](/t/data-ingestion)) |
| **Storage** | Data is kept in warehouses, lakes or other stores. It's involved in every other stage |
| **Transformation** | Raw data is cleaned, joined and modeled into useful shapes |
| **Serving** | Data is delivered for use: dashboards, analyses, machine learning, feeding back into products |

## The undercurrents

The **undercurrents** are concerns that cut across every stage ([undercurrents](/t/undercurrents)):

- **Security**: access control, encryption, least privilege.
- **Data management**: governance, quality, lineage, metadata, privacy.
- **DataOps**: automation, monitoring and the practices of reliable delivery.
- **Data architecture**: how the pieces fit together, and trade-offs.
- **Orchestration**: scheduling and coordinating the pipeline's steps.
- **Software engineering**: code quality, version control, testing and deployment of data code.

## Why it's useful

- **A map of where problems are.** "Numbers don't match" might be a generation issue (a source changed), ingestion
  (duplicates), transformation (a wrong join) or serving (a stale cache).
- **A shared vocabulary** for teams and for choosing tools: tools sit at a stage, and most stacks cover each stage with something.
- **A reminder that the stages aren't the whole job.** Security, quality and reliability are as important as moving data.

The stages are logical, not strictly sequential. Real pipelines loop (serve results back into source systems) and overlap. See
[data engineering](/t/data-engineering) and the [modern data stack](/t/modern-data-stack).
