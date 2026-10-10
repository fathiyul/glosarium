---
title: "Data Circuit Breaker"
summary: "Stopping downstream jobs when upstream data fails checks."
levels: { data-engineer: senior }
aliases: ["data circuit breaker", "data quality gate", "pipeline circuit breaker", "fail-closed pipeline"]
prereqs: ["circuit-breaker", "data-tests"]
related: ["circuit-breaker", "data-tests", "write-audit-publish", "data-incident", "data-observability", "data-contract"]
---

A data circuit breaker stops work when upstream data is known to be bad, instead of letting the problem flow downstream. It borrows the idea from the software [circuit breaker](/t/circuit-breaker): when something keeps failing, stop calling it, fail fast, and probe occasionally until it recovers. Here the "something" is a dataset or a source, and "stop calling it" means pause the jobs that consume it or block publication of its output.

The problem it solves is the pipeline that logs a failed quality check and continues anyway. A source table is 30% short, the test prints a warning, the transformation runs, and the wrong numbers reach a dashboard, a model and an exported file. By the time anyone notices, the bad data has spread and you cannot easily tell which decisions used it.

## Where the break goes

- Before publish: build into a staging table, run checks, and swap into production only if they pass ([write-audit-publish](/t/write-audit-publish)). A failed check leaves the previous good data in place.
- At the boundary: reject or quarantine incoming data that violates its [contract](/t/data-contract) rather than loading it.
- Between jobs: when an upstream dataset is marked unhealthy, pause its downstream consumers instead of running them on bad input.

The states mirror the software pattern. Closed is normal. Open means the breaker has tripped and consumers are held. Half-open means a probe run is allowed to test whether the upstream has recovered.

## Design questions

**Fail-open or fail-closed?** Blocking publication protects consumers but can halt reporting or a customer-facing feature. For a finance table you may prefer to block; for an experimental dashboard, publishing with a clear "suspect" flag may be better. Decide per dataset, by tier.

**How does it reset?** A breaker that never reopens leaves the pipeline stuck, and one that resets too eagerly flaps. Require a human to clear it, or a fresh passing run, depending on how much you trust the check.

**What trips it?** Usually a failed [data test](/t/data-tests) or a [freshness](/t/data-freshness) or volume breach. Several small failures should not trip it as readily as one severe one.

## Limits

A circuit breaker contains the blast radius; it does not fix the data. It also adds a failure mode of its own, since a stuck-open breaker can delay good data. Give it clear ownership, alert when it trips, and document how to inspect and reopen it. Like the software version, it works best alongside retries and timeouts rather than instead of them.
