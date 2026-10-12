---
title: "Semantic Search"
summary: "Searching by meaning instead of keywords."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["semantic search", "meaning-based search", "vector search"]
prereqs: ["embeddings", "inverted-index"]
related: ["embeddings", "inverted-index", "reranking"]
---
**Semantic search** finds content by meaning rather than exact words. The query and the documents are both converted into embeddings, and results are the items whose vectors are nearest to the query's. A search for "cancel my plan" can surface a page titled "ending your subscription" with no shared keywords.

```text
query → embedding → nearest-neighbour lookup in vector index → ranked results
```

It complements keyword search rather than replacing it. Keyword matching is precise for identifiers, names and exact phrases; semantic matching is forgiving of paraphrase. Many production systems run both and combine the results.

The classic mistakes:

- Replacing keyword search entirely. Product codes, error messages and names often need exact matching. Use a hybrid approach.
- Trusting nearest neighbours blindly. Vectors can cluster loosely related items together. Evaluate on real queries with known good answers.
- Ignoring the index approximation. Approximate nearest-neighbour indexes trade a little recall for speed. Measure how much you lose.
- Mismatched query and document treatment. Queries and documents may need different preparation; using the wrong one lowers relevance.
- No feedback loop. Clicks and reformulations reveal what users wanted. Use them to tune the system.

**The practice:** hybrid retrieval, a labelled set of queries for evaluation, and reranking for the final order.

Expect the first version to surprise you in both directions. Read the top results for twenty real queries, note where meaning matched but intent did not, and let those failures guide chunking, filtering and reranking decisions. Keep the evaluation queries in version control next to the index configuration, so a change in either can be judged against the same questions.
