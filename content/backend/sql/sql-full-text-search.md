---
title: "Full-Text Search in SQL"
summary: "Searching words in text columns with built-in indexes."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["sql full-text search", "full-text search in sql", "database full text search"]
prereqs: ["sql", "db-index"]
related: ["inverted-index", "search-engine", "db-index"]
---

**Full-text search in SQL** lets the database find rows whose text matches a query — not exact equality, but words and relevance. Databases provide this via a special index (PostgreSQL's `tsvector` with a GIN index, MySQL's `FULLTEXT`, similar in others). It handles the basics that `LIKE '%term%'` cannot: multiple words, stemming ("running" matches "run"), ranking and stop words.

```sql
SELECT id, title
FROM docs
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'database & index');
```

The `LIKE '%foo%'` approach can't use a normal [index](/t/db-index) (a leading wildcard forces a scan) and doesn't understand words. A full-text index, by contrast, is an [inverted index](/t/inverted-index): words mapped to the rows containing them, which makes word queries fast.

The classic mistakes:

- Using `LIKE '%term%'` for search. It can't use an index, doesn't stem, and doesn't rank. Fine for a small admin filter, wrong for user-facing search.
- Forgetting language and stemming. Full-text search is language-aware; configuring the wrong language (or none) changes what matches. Set it deliberately.
- Skipping the index. The full-text functions are cheap only with the matching index; without it you scan everything.
- Expecting search-engine features. SQL full-text search lacks the analysers, fuzzy matching, facets, relevance tuning and horizontal scale of a dedicated [search engine](/t/search-engine). Relevance scoring is basic.
- Ignoring keep-in-sync. The full-text index (or a search engine's copy) must be updated as data changes. Triggers/queues keep it current; forget and search goes stale.

**When to use it:** for modest search needs — filtering, a site's basic search, internal tools — where adding a search engine is overkill. When you need fuzzy matching, faceting, custom ranking, synonyms or scale, use a dedicated engine (see [search engine](/t/search-engine) and [relevance scoring](/t/relevance-scoring)). Start with the database's full-text search; graduate when it isn't enough.
