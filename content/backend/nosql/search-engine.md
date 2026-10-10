---
title: "Search Engine"
summary: "Elasticsearch, OpenSearch and others for full-text search."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["search engine", "text search engine", "search service"]
prereqs: ["sql-full-text-search", "inverted-index"]
related: ["inverted-index", "relevance-scoring", "search-analyzers", "faceted-search", "fuzzy-search"]
---

A **search engine** is a dedicated system for text search — Elasticsearch, OpenSearch, Meilisearch and similar — built around an [inverted index](/t/inverted-index), which maps words to the documents containing them. It offers what a database's basic full-text search often lacks: sophisticated analysis, relevance ranking, fuzzy matching, faceting and scale.

Its distinguishing features:

- Analysers — tokenise and normalise text (lowercase, stemming, synonyms) at index and query time (see [search analyzers](/t/search-analyzers)).
- Relevance scoring — rank results by how well they match, not just whether (see [relevance scoring](/t/relevance-scoring)).
- Fuzzy and typo-tolerant matching — find results despite misspellings (see [fuzzy search](/t/fuzzy-search)).
- Facets — counts and filters across dimensions (brand, price range) for the UI (see [faceted search](/t/faceted-search)).

```text
source DB ──index/sync──▶ search engine ──query──▶ ranked results
```

The engine is usually a *secondary* store: your database remains the source of truth, and you sync data into the search index (on write, or via change data capture). Search queries go to the engine.

The classic mistakes:

- Treating the search index as the source of truth. Editing only the engine (or only the DB) causes drift. Decide the source of truth (usually the database) and keep the index synchronized.
- Index sync lag and staleness. If you sync asynchronously, a just-created document may not be searchable yet. Know the lag and whether it matters (e.g. "search my new order").
- Letting the index drift. Missed updates, deleted documents lingering, schema changes not reindexed — all make search wrong in subtle ways. Monitor and periodically reindex.
- Using a search engine as a general database. It's optimised for text search, not transactions or relational integrity. Don't move your primary data into it.
- Ignoring operational weight. A cluster to run, memory-hungry, upgrade-sensitive. For simple needs, the database's built-in [full-text search](/t/sql-full-text-search) may be enough.
- Overlooking relevance tuning. Default scoring often disappoints; expect to tune analysers, boosts and synonyms.

**When to use it:** when search is a real feature — user-facing search with ranking, filters, typo tolerance, or large text volumes. For modest search, the database can handle it (see [full-text search in SQL](/t/sql-full-text-search)); graduate to a dedicated engine when search quality and scale demand it.
