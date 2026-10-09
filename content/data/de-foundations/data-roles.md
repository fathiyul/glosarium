---
title: "Data Engineer vs Analyst vs Scientist vs ML Engineer"
summary: "Who builds pipelines, who answers questions, who models, and who ships models."
levels: { data-engineer: junior, backend: junior }
aliases: ["data engineer vs data scientist", "data analyst", "analytics engineer", "ML engineer", "data team roles"]
prereqs: ["data-engineering"]
related: ["data-engineering", "data-engineering-lifecycle", "data-hierarchy-of-needs", "dataset", "data-product"]
core: [data-engineer]
---

"Data person" covers several jobs that overlap. Roles and titles differ between companies, but the usual split looks like this.

| Role | Main question | Typical work |
|---|---|---|
| **Data engineer** | "How does reliable data get where it's needed?" | Builds and runs pipelines, storage, models for analysis, data quality and infrastructure |
| **Data analyst** | "What happened, and why?" | SQL, dashboards, reports and answering business questions |
| **Data scientist** | "What will happen, or what drives it?" | Statistics, experiments, predictive models, deeper investigations |
| **ML engineer** | "How do we run this model in production?" | Deploys, serves and monitors models; builds the systems around them |
| **Analytics engineer** | "How do we make analysis-ready data trustworthy?" | Transforms raw data into clean, tested, documented tables, mostly with SQL |

```
sources → [ data engineer: ingest, store, transform ] → analysis-ready data
                                                           ├→ analyst: dashboards, reports
                                                           ├→ scientist: experiments, models
                                                           └→ ML engineer: production ML systems
```

## How they depend on each other

Analysts and scientists can only be as good as their data. Models trained on missing, duplicated or late data
produce wrong answers confidently. Data engineers provide the foundation: freshness, quality, consistent definitions
and access ([hierarchy of needs](/t/data-hierarchy-of-needs)).

## Overlap and variation

- In **small companies**, one person often does several of these jobs.
- In **large companies**, they're split into separate specialties and teams.
- Tools overlap: everyone uses SQL, and many use Python.
- The data engineer's work is closest to **software engineering**: reliability, testing, version control and operations.

## For backend developers

Backend engineers produce the data (application databases, events and logs) that data teams build on. Collaborating well
matters: stable event formats, announced schema changes, and the awareness that "just changing a column" can silently break a dashboard
somewhere ([source systems](/t/source-systems)).

When you choose where to start, data engineering suits people who like systems, reliability and building things others depend
on, and analysis suits people who like asking questions of data. See [what data engineering is](/t/data-engineering).
