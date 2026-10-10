---
title: "Relevance Scoring (BM25)"
summary: "Ranking search results by how well they match."
levels: { backend: senior, data-engineer: senior }
aliases: ["relevance scoring", "BM25", "search ranking"]
prereqs: ["search-engine", "inverted-index"]
related: ["search-engine", "inverted-index", "fuzzy-search", "sql-full-text-search"]
---

**Relevance scoring** decides the *order* of search results, not just which documents match. When many documents contain the query terms, ranking by how well each matches is what makes search useful — the best result comes first.

The classic algorithm is **BM25** (a refinement of TF-IDF), and it balances three intuitions:

- Term frequency (TF) — a document that contains the query term *more often* is more relevant — but with diminishing returns (the tenth mention adds little).
- Inverse document frequency (IDF) — a *rarer* term is more informative. Matching "photosynthesis" counts far more than matching "the".
- Document length — a match in a *shorter* document counts more than the same match in a long one, so long documents don't win by sheer size.

```text
score = IDF × term-frequency-saturation × length-normalisation
higher score → higher in results
```

Search engines apply this per field (title matches weigh more than body), combine fields, and let you tune boosts. Relevance is relative to the *index's* statistics, which is why result order can differ after reindexing.

The classic mistakes:

- Assuming matching is ranking. Which documents match and how they're *ordered* are separate concerns. A search that returns matches in arbitrary order is poor UX; ranking matters.
- Ignoring field weighting. A title or tag match is usually more meaningful than a body match. Weight fields to reflect that.
- Chasing one relevance score. Human relevance is fuzzy; measure with real queries and user behaviour, not by staring at scores. Tune against examples.
- Forgetting that scores are index-relative. Adding documents changes IDF, so scores and order shift over time. Don't hard-code expectations of exact scores.
- Using relevance for filtering. If a result *must* be included (an exact ID match), handle that with filters/boosts rather than relying on it ranking high naturally.
- Overlooking synonyms and analysers. What matches is decided by the [analysers](/t/search-analyzers); relevance can't fix a query that never matched.

**How to use it:** rely on the engine's BM25 as a strong default; boost important fields; combine with exact-match and [fuzzy](/t/fuzzy-search) behaviour; and validate with real search queries and click data. Relevance is what turns a list of containing documents into a ranked, useful result set — the payoff of the [inverted index](/t/inverted-index).
