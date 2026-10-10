---
title: "dbt"
summary: "Transforming warehouse data with versioned SQL."
levels: { backend: senior, data-engineer: junior , data-analyst: mid-level }
aliases: ["data build tool", "dbt Core", "dbt Cloud", "dbt models"]
prereqs: ["sql-transformation-models"]
related: ["sql-transformation-models", "incremental-models", "staging-intermediate-marts", "data-tests", "semantic-layer", "data-ci-cd"]
core: [data-engineer, data-analyst]
also: [transformation]
---

**dbt** ("data build tool") is a tool for the **T** in ELT: it transforms data that's already in your warehouse, using **SQL
SELECT statements** organized as a versioned, tested project. It doesn't extract or load data, and it doesn't schedule itself.
It builds tables in the right order and tests them.

A dbt project is a folder of files in Git:

```
models/
  staging/stg_orders.sql          -- SELECT ... FROM {{ source('shop', 'orders') }}
  marts/customer_revenue.sql      -- SELECT ... FROM {{ ref('stg_orders') }} ...
  schema.yml                      -- descriptions and tests for the models
```

```yaml
# schema.yml
models:
  - name: stg_orders
    columns:
      - name: order_id
        tests: [not_null, unique]
      - name: status
        tests:
          - accepted_values: { values: [new, paid, shipped, cancelled] }
```

```sh
dbt run     # build the models
dbt test    # run the tests
dbt build   # models + tests together, in dependency order
```

## The key ideas

- **`ref()`** links models, and builds the dependency graph and correct execution order.
- **`source()`** declares the raw tables you read, so lineage starts there.
- **Materializations**: view, table or [incremental](/t/incremental-models).
- **Tests and documentation** live next to the code ([data tests](/t/data-tests)).
- **Macros and packages** (templated SQL, shared code) reduce repetition.
- **Environments**: develop in your own schema, deploy to production through CI ([data CI/CD](/t/data-ci-cd)).

## Where it sits

Something else ingests the raw data, an orchestrator or scheduler runs `dbt build`, and dbt handles the SQL modeling in between
([pipeline orchestration](/t/pipeline-orchestration)). Other tools offer similar workflows, and the ideas (SQL models, dependency graphs, tests) are the portable part
(see [SQL transformation models](/t/sql-transformation-models)).

## Cautions

- Keep models small and layered ([staging, intermediate, marts](/t/staging-intermediate-marts)).
- Watch run time and warehouse cost as projects grow.
- It's SQL: complex procedural logic or machine learning belongs elsewhere.
