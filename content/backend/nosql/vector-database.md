---
title: "Vector Database"
summary: "Storing embeddings for similarity search."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
also: [llm-engineering]
aliases: ["vector database", "vector db", "similarity search database"]
prereqs: ["database", "linear-algebra-basics"]
related: ["search-engine", "inverted-index", "linear-algebra-basics"]
---

A **vector database** stores **embeddings** — lists of numbers representing the meaning of text, images or other data — and finds the items whose vectors are **nearest neighbours** to a query vector. Where a normal index matches exact words or values, a vector index matches by *similarity*, which is what makes semantic search and recommendation possible.

```text
"running shoes" → [0.12, -0.44, ...]  (an embedding)
query vector   → find the closest stored vectors → similar items
```

The distances (cosine, Euclidean) come from [linear algebra basics](/t/linear-algebra-basics): the closer two vectors, the more similar they're treated. Because scanning millions of vectors for exact nearest neighbours is too slow, vector databases use approximate indexes (commonly HNSW or IVF) that trade a little accuracy for large speed gains.

It underpins semantic search, retrieval-augmented generation (finding relevant context for a model), recommendations, image similarity and deduplication.

The classic mistakes:

- Expecting exact results. Most vector indexes are *approximate* nearest-neighbour; they may miss the true closest item. Usually acceptable, but know the trade-off (recall vs speed).
- Ignoring embedding quality. The database only finds what the embeddings encode. Poor or inconsistent embeddings make results meaningless — the model that produced them matters as much as the store.
- Mixing models. Embeddings from different models aren't comparable; querying with one model's vector against another's index is nonsense. Keep the model consistent across indexing and querying.
- Treating it as a normal database. Vector databases are specialised; use a regular database for your structured data and combine results yourself, unless the store supports both well.
- Forgetting metadata filtering. Real queries need "similar *and* in this category"; filter by metadata alongside vector search, and check the store supports it efficiently.
- Assuming it replaces a search engine. Keyword search and vector search solve different problems; hybrid search (both) is often the best result — a vector store is a complement to a [search engine](/t/search-engine), not a replacement.

**When to use it:** when you need similarity over meaning rather than exact matching — semantic search, recommendations, RAG. For exact keyword search, an [inverted index](/t/inverted-index) in a [search engine](/t/search-engine) is the right tool. Many stacks use both.
