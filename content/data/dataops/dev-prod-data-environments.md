---
title: "Development and Production Data Environments"
summary: "Separate schemas or warehouses so development never touches production data."
levels: { data-engineer: mid-level }
aliases: ["dev and prod data environments", "data environments", "separate dev and prod", "development warehouse", "staging data"]
prereqs: ["environments", "dataops"]
related: ["data-ci-cd", "data-masking", "dataops", "environments", "sampling-data", "query-cost"]
core: [data-engineer]
---

Software teams keep development separate from production ([environments](/t/environments)). **Data teams need the same separation**, so that someone testing a new model doesn't overwrite a table that the CFO's dashboard reads.

## Common ways to separate

| Approach | How | Notes |
|---|---|---|
| **Separate schemas** in one warehouse | `analytics_dev_ana` vs `analytics` | Cheap and common. Each developer gets a personal schema |
| **Separate databases or projects** | `dev` vs `prod` | Stronger isolation and permissions |
| **Separate warehouses/accounts** | A fully separate environment | Strongest isolation, more setup and cost |
| **Zero-copy clones or branches** | Instantly clone production data for a test | Cheap realism, where the platform supports it |

A typical flow: develop in your own schema against sample or cloned data, open a pull request, run [CI](/t/data-ci-cd) in an isolated schema, then deploy to production through automation.

## The data question

Realistic testing needs realistic data, which creates tension:

- **Production data is sensitive.** Don't copy raw personal data into development, where more people have access and controls are weaker. Use **masked or synthetic data** ([data masking](/t/data-masking)), or restrict access tightly.
- **Full production volume is expensive.** Use **samples** or limited date ranges for development ([sampling data](/t/sampling-data)), and full-scale runs only where needed (staging, performance tests).
- **Small samples miss real edge cases** (skew, nulls, odd values). Include known problem cases, and test on realistic volume before release.
- **Cloned or read-only access to production sources** can let dev models read real source data safely, while writing only to dev schemas.

## Rules that prevent accidents

- **Developers write only to dev.** Production write permissions belong to the deployment process, not to individuals ([least privilege](/t/least-privilege)).
- **Make the target environment obvious** (names, prompts, banners). Running a destructive command on the wrong environment is a classic mistake.
- **Parametrize the environment** in code (the schema name comes from configuration), with no hard-coded production names ([configuration](/t/app-configuration)).
- **Clean up** old development schemas and clones, which accumulate cost and clutter.
- **Keep dev and prod structure aligned**: same tools, same code, same versions.
- **Control costs**: dev warehouses can be small and auto-suspend ([warehouse cost management](/t/warehouse-cost-management)).
- Don't let consumers depend on dev data.

Environments are part of [DataOps](/t/dataops) and make safe, frequent change possible.
