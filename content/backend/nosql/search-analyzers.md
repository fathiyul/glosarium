---
title: "Tokenizers and Analyzers"
summary: "How search engines split and normalize text before indexing."
levels: { backend: senior, data-engineer: senior }
aliases: ["analyzers", "tokenizers", "text analysis"]
prereqs: ["search-engine", "inverted-index"]
---

**Analyzers** decide how raw text becomes searchable terms. Before a document is indexed (and again when a query runs), an analyzer **tokenises** the text — splits it into words — and applies filters: lowercasing, stemming, removing stop words, expanding synonyms, stripping accents. What the analyzer produces becomes the terms in the [inverted index](/t/inverted-index), and only those terms are matchable.

```text
"The Quick Brown Foxes!"  → tokenize → [the, quick, brown, foxes]
                          → lowercase, stem, stop-words → [quick, brown, fox]
query "fox"               → analyzed the same way → matches "foxes"
```

The key is that **index-time and query-time analysis must agree**. If "Foxes" is indexed as "fox" but the query "foxes" isn't stemmed, they won't match — a classic source of "why doesn't search find this?".

The classic mistakes:

- Mismatched index and query analyzers. The most common search bug: documents are analyzed one way, queries another, and they don't meet. Keep the analyzers consistent per field (or use the engine's default for both).
- Ignoring language. English stemming won't help German text; the wrong language analyzer silently under-matches. Set the analyzer per field for the content's language.
- Over-stemming. Aggressive stemming can merge distinct words ("universe" and "university"); tune if precision matters.
- Forgetting analysis kills exact matching. If you stem and lowercase, you can't easily do exact-case or exact-term queries on that field. Use a separate keyword (un-analyzed) field for those — the common "text + keyword" pattern.
- Not reindexing after changing analyzers. Analysis is baked into the index; changing an analyzer requires reindexing existing documents, or old data matches the old way.
- Treating stop-word removal as universal. Dropping "the", "and" is fine for relevance but breaks exact phrase queries for them. Decide per field.

**How to use it:** choose analyzers deliberately per field — a text analyzer for searchable prose, a keyword analyzer for exact values (IDs, tags, sorting) — and keep index and query analysis aligned. Analysis is invisible until search under-matches; understanding it is what turns "search doesn't find X" into a fix. See [search engine](/t/search-engine) and [full-text search](/t/sql-full-text-search).
