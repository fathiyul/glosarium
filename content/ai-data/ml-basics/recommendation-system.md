---
title: "Recommendation System"
summary: "Suggesting items based on behavior and similarity."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["recommendation system", "recommender", "recommendations"]
prereqs: ["supervised-learning", "unsupervised-learning"]
related: ["unsupervised-learning", "ab-testing", "embeddings"]
---
A **recommendation system** predicts which items a user is likely to engage with and orders candidates accordingly: products, videos, articles, connections. It works from signals about users and items — past interactions, attributes, and similarity between either — and typically runs as a pipeline that narrows a large catalogue to a short, ranked list.

```text
catalogue (millions) → candidate retrieval (hundreds) → ranking model → top-N shown
```

Two families of signal drive most systems. **Collaborative** approaches infer relevance from what similar users did; **content-based** approaches match item attributes to a user's history. Real systems blend them, and most of the engineering effort goes into the candidate and ranking stages, data freshness and evaluation.

The classic mistakes:

- Optimising offline accuracy alone. A model that predicts past clicks well can still produce a dull or repetitive experience. Measure the outcome users and the business care about, online.
- Feedback loops. Showing only what the model already favours starves the system of data about everything else. Reserve exploration on purpose.
- Popularity bias. Popular items dominate every list, and new or niche items never get a chance. Account for it in both ranking and evaluation.
- Ignoring cold start. New users and new items have no history. Plan a fallback based on attributes, context or editorial choices.
- Evaluating on random splits. Recommendations depend on time; split by time to avoid training on the future.

**Where to start:** a simple popularity or recency baseline, then a candidate generator, then a ranker, with an online experiment to confirm that offline gains are real.
