---
title: "Reproducible Analysis"
summary: "Producing the same number again from the same inputs, months later, on someone else's machine."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["reproducible analysis", "reproducibility", "reproducible research", "rerunning an analysis"]
prereqs: ["query-version-control", "sql"]
related: ["query-version-control", "data-extract", "metric-definitions", "analysis-notebook", "data-lineage"]
---

Reproducible analysis means someone else — or you, in six months — can take the same inputs, run the same steps and get the same number. Not the same story: the same figure.

What that takes in practice:

- The inputs are pinned. The query or extract file, with the date it was taken. A live query against a moving table is not an input ([data extract](/t/data-extract)).
- The code is in version control at a specific commit ([query version control](/t/query-version-control)).
- The environment is pinned. The tool versions and packages the code needs are declared in a file rather than remembered by one person, because products and versions disagree about defaults, so the environment is part of the answer.
- Randomness is seeded. If any step samples or shuffles, an unseeded run is not the same run.
- The output is recorded — the number, the date, the inputs and the commit — so a later run can be compared rather than merely repeated.

The classic mistake is **the analysis that runs on exactly one machine**: a notebook whose kernel was already warm, a query referencing a local CSV, a spreadsheet linked to a drive nobody else can mount. It works perfectly, once, for one person.

The useful middle ground for exploratory work is **auditability rather than full reproducibility**. Write down enough that the result can be checked: the query, the filters, the row counts, and the definition of the metric ([metric definitions](/t/metric-definitions)). When a number starts steering decisions, invest in the rest.

There is a real trade-off. Pinning everything is overhead, and it pays off most for numbers that get reused or challenged. A one-off answer to a question asked once does not need it, and pretending otherwise is how analysis gets slow.
