---
title: "Notebooks (Jupyter)"
summary: "Interactive documents mixing code, output and notes."
levels: { data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["Jupyter", "Jupyter notebook", "JupyterLab", "Colab"]
prereqs: ["variable"]
related: ["pandas", "dataframe", "apache-spark", "data-profiling", "batch-processing"]
---

A notebook is an interactive document made of **cells**: some contain code, some text, and the output (tables, charts) appears right below the code that produced it. Jupyter is the best-known one; Google Colab and Databricks notebooks are similar.

```python
# cell 1
import pandas as pd
df = pd.read_csv("orders.csv")

# cell 2
df.groupby("country")["total"].sum().sort_values(ascending=False).head()
# output table appears here
```

You run cells one at a time and inspect results as you go, which makes notebooks ideal for exploring a new dataset, trying ideas, drawing quick charts, and sharing an analysis with notes.

## Where they cause trouble

- **Hidden state.** Cells can run out of order, and a variable from a deleted cell is still in memory. The notebook looks correct but can't be reproduced from top to bottom. Habit: restart the kernel and run all cells before trusting or sharing it.
- **Hard to review in Git.** The file stores outputs and metadata as JSON, so diffs are noisy. Clear outputs before committing, or use tools that pair a notebook with a plain text version.
- **Hard to test and reuse.** Logic buried in cells can't easily be imported or unit tested.
- Secrets. Don't paste credentials into cells; outputs and files get shared.
- Large outputs (huge tables) bloat the file.

## Notebooks and production pipelines

Notebooks are great for exploration but a poor basis for a scheduled production job. A common path is to explore in a notebook, then move the settled logic into normal Python modules or SQL models with tests, and have the orchestrator run those. Some platforms do run notebooks on a schedule; if you do, apply the same care about versioning and errors.
