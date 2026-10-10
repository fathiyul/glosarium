---
title: "Data Platform Team"
summary: "A team that builds infrastructure other data teams depend on."
levels: { data-engineer: staff }
aliases: ["platform team", "data infrastructure team", "central data platform team", "data platform engineering"]
prereqs: ["dataops", "data-engineering"]
related: ["self-serve-data-platform", "data-product", "data-mesh", "data-ownership", "build-vs-buy-data-tools", "data-roles"]
---

A data platform team builds and operates the shared infrastructure that other data teams depend on: ingestion, storage, transformation tooling, orchestration, the catalog, and the access and cost controls around them. The other teams, sometimes called domain or product teams, use that platform to build their own pipelines and data [products](/t/data-product).

The classic mistake is running the platform team as a **ticket queue**. Domain teams ask for a new source or a schema change, the platform team does the work, and the backlog grows without limit. The platform becomes a bottleneck and a source of resentment, and the domain teams know their data best but cannot act on it. A related mistake is the opposite: the platform team builds what it finds interesting, without users, and adoption never happens.

## Treat the platform as a product

Its customers are internal. That means:

- Talk to users and prioritize by their problems, not by technology fashion.
- Offer **golden paths**: opinionated, well-supported ways to do common tasks (add a source, build a pipeline, publish a table) that are easier to follow than to work around.
- Make the safe path the default: version control, tests, [CI/CD](/t/data-ci-cd), separate dev and prod, and access control come built in ([DataOps](/t/dataops)).
- Measure adoption: how many teams use the platform, how much self-serve, how many tickets, how often it breaks.
- Provide **escape hatches** for teams whose needs fall outside the path, rather than forcing every case through one tool.

## Central standards, local ownership

The healthy split is: the platform owns shared capabilities and guardrails; domain teams own their data and its quality ([data ownership](/t/data-ownership), [data mesh](/t/data-mesh)). The platform defines the interfaces and the [data contracts](/t/data-contract) that let teams work independently, and provides the [self-serve platform](/t/self-serve-data-platform) they run on. This is closer to a product-and-platform organisation than a central data warehouse team that does everyone's work.

## Staff-level judgement

Decide deliberately what stays central and what moves to domains, using [build vs buy](/t/build-vs-buy-data-tools) for tooling and the same reasoning for services. Staff the team for reliability, since other teams' pipelines depend on it, and borrow practices from [SRE](/t/sre). A platform that is slow, opaque or frequently down makes every dependent team slower; a good one lets them move without asking permission.
