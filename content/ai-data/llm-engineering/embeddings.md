---
title: "Embeddings"
summary: "Numeric vectors representing meaning, used for similarity search."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["embeddings", "embedding", "vector representation"]
prereqs: ["neural-network", "vector-database"]
related: ["semantic-search", "vector-database", "chunking"]
---
An **embedding** is a fixed-length list of numbers that represents a piece of content — a sentence, an image, a product — so that items with similar meaning end up close together in the vector space. A model trained for the purpose turns the content into a vector; similarity between vectors then stands in for similarity in meaning.

```text
"refund my order" → [0.12, -0.84, 0.33, …]   "return an item" → nearby vector
```

Embeddings are the bridge that lets ordinary software compare meaning. They power semantic search, clustering, deduplication and retrieval for language-model applications, and they are usually stored in a vector index for fast nearest-neighbour lookup.

The classic mistakes:

- Mixing embedding models. Vectors from different models live in different spaces and cannot be compared. Store the model identity with every vector and re-embed everything when you change models.
- Assuming closeness means relevance. Two texts can be close in topic and still answer different questions. Evaluate retrieval with real queries.
- Embedding the wrong unit. A whole document embedded as one vector averages away detail; embedding fragments too small loses context. Choose the unit to match how users search (see [chunking](/t/chunking)).
- Ignoring normalisation and distance choice. Cosine versus dot product versus Euclidean changes rankings; match the metric the model was trained for.
- Forgetting staleness. When source content changes, its embedding must be regenerated, or search returns outdated matches.

**The practice:** pin the embedding model, record its version, evaluate retrieval on your own queries, and plan re-embedding as a routine operation.
