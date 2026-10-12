---
title: "CI/CD for Data Pipelines"
summary: "Testing and deploying pipeline and model changes automatically."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["CI/CD for data", "data pipeline CI", "dbt CI", "testing data pipelines in CI", "analytics CI/CD"]
prereqs: ["continuous-integration", "data-tests"]
related: ["dataops", "dev-prod-data-environments", "data-tests", "dbt", "pipeline-orchestration", "continuous-delivery"]
core: [data-engineer]
---

**CI/CD for data** applies [continuous integration and delivery](/t/continuous-delivery) practices to **data code**: SQL models, pipeline definitions, schemas and transformations. Changes are tested automatically before merging, and deployed in a controlled, repeatable way, instead of someone running scripts by hand against production.

## What CI usually does on a pull request

1. **Lint and format** SQL and Python.
2. **Build the changed models in an isolated environment**, such as a dedicated schema or a clone of production, using development or sample data ([dev and prod environments](/t/dev-prod-data-environments)).
3. **Run data tests** on the results: uniqueness, not-null, accepted values, relationships, row-count sanity ([data tests](/t/data-tests)).
4. **Run unit tests** on transformation logic with small fixed inputs.
5. **Compare outputs** to production (a "data diff"): did row counts or values change unexpectedly because of this change?
6. **Check impact**: which downstream tables and dashboards depend on what changed ([lineage](/t/data-lineage)).
7. **Validate** configuration, orchestrator definitions (DAGs import cleanly) and schema migrations.

```yaml
# illustrative CI job
steps:
  - run: sqlfluff lint models/
  - run: dbt build --select state:modified+ --target ci     # build and test only changed models and their dependents
  - run: pytest tests/                                      # unit tests for Python code
```

## What CD does

- **Deploys merged changes** to production automatically: updates models and pipeline definitions.
- **Promotes through environments** (dev → staging → production) where relevant.
- **Runs migrations** for schemas and applies infrastructure changes through code ([infrastructure as code](/t/infrastructure-as-code)).
- **Has a rollback or revert path.** Reverting the code, then rerunning or restoring ([rollback](/t/rollback)).

## What's different from application CI/CD

- **Data is part of the system.** Code can be correct and the result wrong because of the data. You need data-level tests, not just code tests.
- **State and cost.** Building models on large data in CI can be slow and expensive. Use **sampled or limited data**, clone techniques, and only build what changed.
- **Production data in CI is sensitive.** Use masked or synthetic data in lower environments ([data masking](/t/data-masking)).
- **Backfills**: a logic change may need historical data reprocessed, which isn't a normal "deploy" step ([backfill](/t/backfill)).
- **Consumers downstream** (dashboards, ML) need warning about breaking changes ([data contracts](/t/data-contract)).

## Habits

- **Everything in version control**: models, tests, orchestration code, documentation.
- **Require passing CI to merge.**
- **Keep deployments small and frequent.**
- **Monitor after deploy**: freshness, volume and test results ([data observability](/t/data-observability)).
- Treat it as part of [DataOps](/t/dataops).
