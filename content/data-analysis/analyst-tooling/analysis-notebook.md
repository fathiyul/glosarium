---
title: "Analysis Notebooks"
summary: "Cells of code, output and notes run in order, and the out-of-order execution that ruins them."
levels: { data-analyst: junior }
aliases: ["analysis notebook", "notebooks", "computational notebook", "notebook analysis"]
prereqs: ["exploratory-data-analysis", "reproducible-analysis"]
related: ["reproducible-analysis", "query-version-control", "exploratory-data-analysis", "ad-hoc-analysis", "data-storytelling"]
---

An analysis notebook is a document made of cells: some hold code, some hold text, some hold the output of the last run. You run a cell, see the result, edit, run again. That loop is why notebooks are the default tool for exploring a dataset and for showing how a conclusion was reached, with the code sitting next to the explanation.

Notebooks are also the default tool for one particular kind of bug. Cells run in whatever order you run them, and each run **leaves state behind**: variables, imported tables, a filtered frame. Change a cell near the top after running everything below it and the results no longer follow from the code above them. Nothing in the document says so. The numbers look reproducible while the run order that produced them exists nowhere in the file.

The fix is **restart and run all cells, from the top, in order**. Then read the notebook top to bottom and confirm that every number you are about to quote appears in that fresh run. If a cell takes ten minutes, that is a reason to move the expensive work somewhere it can be cached, not a reason to skip the step.

Habits that keep a notebook honest:

- Clear the output and re-run before sharing, so what people see is what the code produces.
- Keep data loading in one cell at the top, so a re-run is cheap.
- Anything that must be repeatable — a metric definition, a cleaning rule — belongs in versioned code, not in a cell ([reproducible analysis](/t/reproducible-analysis), [query version control](/t/query-version-control)).
- State the inputs and the date. A notebook pointed at a live table is a statement about a moving target ([data extract](/t/data-extract)).

Notebooks are for exploring and for explaining. Work that has to run on a schedule is not a notebook, it is a job — and an analysis you only need once is better served by something simpler ([ad hoc analysis](/t/ad-hoc-analysis)).
