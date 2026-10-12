---
title: "Data Science Hierarchy of Needs"
summary: "Collect, move, store, clean, analyze, then learn: why reliable plumbing comes before AI."
levels: { data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["data science hierarchy of needs", "AI hierarchy of needs", "DIKW pyramid"]
prereqs: ["data-engineering"]
related: ["data-engineering", "data-engineering-lifecycle", "data-pipeline", "data-quality-dimensions", "machine-learning", "business-intelligence"]
---

The hierarchy of needs (an idea borrowed from Maslow's psychology pyramid and applied to data work) says that data capabilities build on each other from the bottom up. You can't do the fancy top layers well until the bottom ones are solid.

From the bottom to the top:

1. **Collect**: instrumentation, logs, sensors, user-facing events.
2. **Move / store**: reliable flow of data into storage, and storage that is easy to query.
3. **Transform / clean**: tidy, consistent, documented tables.
4. **Aggregate / analyze**: metrics, [dashboards](/t/bi-dashboard), reporting.
5. Learn / optimize: experiments, [machine learning](/t/machine-learning), AI.

Each layer depends on the one below.

## The classic mistake

A team hires data scientists to "do AI", but orders are missing from the warehouse, user IDs don't match between systems, and nobody knows what "active user" means. The scientists spend most of their time cleaning data by hand, and results are unreliable. Fixing layers 1 to 3 first usually gives more value than any model.

```
ML model for churn?           ← needs trustworthy history
  ← needs consistent user_id across product, billing and support
    ← needs those sources loaded daily and kept complete
```

## How to use the idea

- When someone asks for a sophisticated analysis, check what the layers below look like. Is the data complete? Is it defined the same way everywhere?
- Use it to explain why "boring" pipeline and quality work is not optional.
- Don't take it as a strict sequence: real teams work on several layers at once, and a small proof of concept at the top can show what the foundations must support.

It is a mental model, not a law. Treat it as a reminder that reliable plumbing comes before AI. See [data engineering](/t/data-engineering) for the layers a data engineer owns.
