---
title: "Versioning Analysis Code"
summary: "Putting queries and models in source control so a number can be re-run and diffed."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["versioning analysis code", "SQL in git", "source control for queries", "version control for analysis"]
prereqs: ["git", "sql"]
related: ["reproducible-analysis", "version-control", "metric-definitions", "data-lineage", "data-governance"]
---

Versioning analysis code means keeping the queries, notebooks and model definitions that produced a number in a [git](/t/git) repository, next to the documentation, so they can be re-run, reviewed and compared. It is the difference between a number and an auditable number ([version control](/t/version-control)).

Why it is worth the overhead: a stakeholder asks, six weeks later, how a figure was calculated. If the query is in a repo, you check out the commit from that week and run it. If it is a local file, you rebuild it from memory and hope you get the same answer. The same repository lets a colleague review the logic before it becomes a dashboard, and lets you see exactly which change moved a number when it moves.

The classic mistake is **the local file**. A query in `~/analysis/final_v3.sql` runs on one machine, depends on one person's database access, and dies with that laptop. The second classic mistake is **the query pasted into a ticket** or a chat message: no history, no review, and no way to tell which version produced which number.

Practical version:

- One repository per project or team, with folders that mirror the subject rather than the author.
- Commit the query together with the finding it produced, so every number has a commit behind it.
- Use branches and pull requests for anything that changes a published number, so the change is visible before it ships ([metric definitions](/t/metric-definitions)).
- Keep credentials, connection strings and environment config out of the query, so it runs on someone else's machine and in CI ([reproducible analysis](/t/reproducible-analysis)).
- Record which database and which snapshot the query ran against. The same query against a different database is a different answer.
- Put the query where it will be found when someone asks where a number came from ([data lineage](/t/data-lineage)).

Source control will not make an analysis correct. It makes it possible to ask, later, what was actually run.
