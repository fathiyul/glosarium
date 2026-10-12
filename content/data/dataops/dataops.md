---
title: "DataOps"
summary: "Applying DevOps practices like CI, testing and monitoring to data."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["Data Ops", "data operations", "DataOps practices", "data engineering operations"]
prereqs: ["data-ci-cd", "data-observability"]
related: ["data-ci-cd", "data-observability", "dev-prod-data-environments", "data-tests", "data-platform-team"]
core: [data-engineer]
---

**DataOps** is applying the ideas of **DevOps** (automation, version control, testing, continuous delivery, monitoring and collaboration) to the **creation and operation of data pipelines and analytics**. The goal: deliver trustworthy data **faster and more reliably**, with fewer firefights.

It's more a way of working than a tool, and one of the "undercurrents" of the data engineering lifecycle ([data engineering lifecycle](/t/data-engineering-lifecycle)).

## The practices

| Practice | What it means for data |
|---|---|
| **Version control** | SQL, pipeline code, tests, schemas and docs all live in Git, with code review |
| **Automated testing** | Data tests, unit tests for logic, schema checks, run on every change ([data tests](/t/data-tests)) |
| **CI/CD** | Changes are built, tested and deployed automatically ([CI/CD for data](/t/data-ci-cd)) |
| **Environments** | Development and production are separate, so experiments never touch real consumers ([dev and prod environments](/t/dev-prod-data-environments)) |
| **Monitoring and observability** | Freshness, volume, quality and costs are watched, with alerts ([data observability](/t/data-observability)) |
| **Reproducibility** | Anything can be rebuilt from code and raw data. Pipelines are idempotent ([idempotent pipelines](/t/idempotent-pipeline)) |
| **Infrastructure as code** | Warehouses, pipelines and permissions are defined in code ([infrastructure as code](/t/infrastructure-as-code)) |
| **Collaboration and feedback** | Short cycles with the people who use the data, and clear ownership ([data ownership](/t/data-ownership)) |
| **Incident practice** | On-call, runbooks and blameless reviews for data failures ([data incidents](/t/data-incident)) |
| **Cost awareness** | Query and warehouse spend is monitored and managed ([warehouse cost management](/t/warehouse-cost-management)) |

## The problems it responds to

- Pipelines changed by hand in production, with no history of who changed what.
- "It works on my laptop" analytics with no tests.
- Breakages found by angry stakeholders.
- Slow, risky releases, so change is avoided and the data goes stale.
- Nobody sure who owns a table or whether it's still used.

## Starting small

You don't adopt it all at once:

1. Put everything in version control and require reviews.
2. Add a few critical tests, and run them automatically.
3. Separate dev and prod.
4. Automate deploys.
5. Add monitoring and alerts for the important tables.
6. Review failures, and fix causes.

The measure of success is outcomes: **fewer data incidents, faster safe changes, and more trust** in the numbers. Compare with how software teams measure delivery performance ([DORA metrics](/t/dora-metrics)).
