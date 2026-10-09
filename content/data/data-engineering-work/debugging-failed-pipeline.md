---
title: "Debugging a Failed Pipeline"
summary: "Finding which task broke, why, and what data it affected."
levels: { data-engineer: junior }
aliases: ["pipeline failure debugging", "troubleshooting data pipelines", "pipeline broke", "debugging data jobs"]
prereqs: ["pipeline-dag", "reading-production-logs"]
related: ["pipeline-retries", "data-incident", "data-lineage", "reprocessing-history", "handling-schema-changes", "data-on-call"]
core: [data-engineer]
---

An alert says a pipeline failed, or someone says a dashboard looks wrong. A systematic approach beats guessing.

## 1. Find out what broke, and since when

- **Which task failed**, in which run, for which data interval? The orchestrator's graph shows it.
- **When did it last succeed?** What changed since? (a code deploy, a config or credential change, an upstream release, a schema change).
- **Is it new, or has it been failing quietly?**

## 2. Read the error

Open the task logs and read the first real error, not the cascade after it ([reading error messages](/t/reading-error-messages),
[reading production logs](/t/reading-production-logs)). Then classify:

| Type | Typical signs |
|---|---|
| **Infrastructure** | Timeout, out of memory, worker lost, disk full, no capacity |
| **Access** | Permission denied, expired token or password, rotated key |
| **Source problem** | Source down, API error or rate limit, file missing or empty |
| **Schema / data change** | Column not found, type mismatch, new value that breaks a parse ([schema changes](/t/handling-schema-changes)) |
| **Code bug** | Exception from your logic, a bad join or an unhandled null |
| **Data volume / skew** | The job suddenly runs far longer or out of memory after a spike |

## 3. Judge the impact

- **What data is affected**, and what is downstream of it? Use [lineage](/t/data-lineage) to find consumers.
- **Is bad data already published?** A failure that stops the pipeline is annoying. Wrong numbers served silently are worse.
- Tell the affected people early, with what you know and when you'll update them ([data incidents](/t/data-incident)).

## 4. Fix and recover

- **Fix the cause**, not just retry. If it was transient, retry and note why.
- **Rerun safely.** This requires [idempotent](/t/idempotent-pipeline) tasks, so that rerunning doesn't duplicate.
- **Backfill** any missed intervals ([reprocessing history](/t/reprocessing-history)).
- **Verify the result**: row counts, spot checks, the original failing check now passing.

## 5. Prevent a repeat

- Add a [test](/t/data-tests) or alert that would have caught it earlier.
- Update the runbook, and fix the root cause (a contract with the source team, better retry settings).
- For serious incidents, write a short blameless review.

Habits that help: keep logs and run history accessible, include run IDs and row counts in log messages, and write down what you tried. When on call,
see [data on-call](/t/data-on-call).
