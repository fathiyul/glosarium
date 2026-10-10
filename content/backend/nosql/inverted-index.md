---
title: "Inverted Index"
summary: "A map from words to the documents that contain them."
levels: { backend: senior, data-engineer: senior }
aliases: ["inverted index", "inverted indexes", "postings list"]
prereqs: ["db-index", "sql-full-text-search"]
related: ["search-engine", "sql-full-text-search", "search-analyzers", "relevance-scoring"]
---

An **inverted index** maps each *term* to the list of documents containing it — the **postings** list. It's the "inverse" of a document→terms mapping, and it's what makes full-text search fast: instead of scanning every document for a word, you look up the word and get the documents directly. It's the core data structure of every search engine.

```text
term "database" → [doc1, doc7, doc42, ...]   (postings)
query "database index" → intersect postings for "database" and "index"
```

Search engines build it at index time, often with extra data per posting (term frequency, positions) that supports ranking and phrase queries (see [relevance scoring](/t/relevance-scoring)). Query time becomes an intersection of postings lists rather than a scan.

The classic mistakes:

- Expecting it to be free to maintain. Every insert/update must update postings, which is expensive for write-heavy data — a big reason search engines are secondary stores kept in sync, not primary ones.
- Ignoring analysis. What counts as a "term" is decided by the [analysers](/t/search-analyzers) (lowercasing, stemming, tokenisation). The same text indexed two ways gives different results.
- Forgetting it's not a normal database index. A B-tree index finds rows by an exact/range value; an inverted index finds documents by *containing terms*. Different structure, different queries.
- Assuming exact positions or phrases come free. Phrase and proximity queries need positional data in the postings, which enlarges the index. Plan for it.
- Treating it as the source of truth. The index is derived; the documents live in your database. Rebuild it from the source when needed.
- Ignoring update and deletion strategy. Updating a document usually means reindex; deletions leave tombstones or require merges. Know how your engine handles churn.

**Why it matters:** the inverted index is the mechanism that turns text search from a scan into a lookup, and it explains search engines' strengths (fast term queries, ranking) and weaknesses (write cost, eventual sync). It sits alongside the [specialised index types](/t/specialized-indexes) as a structure built for a specific kind of query — here, "which documents contain this term". See [full-text search](/t/sql-full-text-search) and [search engine](/t/search-engine).
