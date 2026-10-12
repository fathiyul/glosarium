---
title: "Reranking"
summary: "Re-ordering retrieved results with a stronger model."
levels: { backend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["reranking", "re-ranking", "result reranking"]
prereqs: ["semantic-search", "rag"]
related: ["rag", "semantic-search", "relevance-scoring"]
---
**Reranking** is a second pass over the candidates a retriever returned. A first stage is fast but approximate, pulling in a few hundred possibly relevant passages; a reranker then scores each candidate against the query more carefully and reorders them, so the best few reach the model or the user.

```text
query → fast retrieval (many candidates) → reranker scores each (query, candidate) → top few
```

The two stages trade speed for precision. Retrieval is cheap enough to run over a large index; reranking is more expensive per item but only sees a short list. Separating them keeps latency acceptable while improving what ends up in context.

The classic mistakes:

- Reranking too many candidates. Scoring thousands of items per query erases the latency gain. Keep the candidate list short and bounded.
- Skipping evaluation. A reranker that looks sophisticated can still hurt results on your queries. Compare with and without it.
- Assuming it fixes bad retrieval. If the relevant passage is absent from candidates, reranking cannot recover it. Measure recall at the first stage.
- Ignoring the cost budget. Reranking adds per-query compute or calls. Account for it in latency and price.
- Using it everywhere. Simple lookups with exact identifiers often need no reranker.

**Practice:** retrieve broadly, rerank a short list, and confirm the gain on a labelled query set.

Watch latency at the tail, not just the average. A reranker that adds a modest median cost can still produce slow outliers on large candidate lists, and those outliers are what users complain about first.
