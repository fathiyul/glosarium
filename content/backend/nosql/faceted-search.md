---
title: "Faceted Search"
summary: "Filtering search results by categories with counts."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["faceted search", "facets", "faceted navigation"]
prereqs: ["search-engine", "inverted-index"]
related: ["search-engine", "relevance-scoring", "inverted-index", "search-analyzers"]
---

**Faceted search** is the "narrow your results" panel you see on shopping and directory sites: categories, brands, price ranges, each with a count of matching items, clickable to refine the search. A **facet** is a dimension you can filter and count by; the counts tell users what's available before they filter.

```text
results: 1,240 items
Brand   ▸ Acme (300)  ▸ Bolt (120)  ...
Price   ▸ under $25 (400)  ▸ $25–50 (500)  ...
```

Mechanically, a search engine computes aggregations over the matched documents for each facet field: for the current query, count how many results fall into each category. The user clicks one, the query narrows, and the counts recompute. It relies on the engine maintaining fast per-field data, which an [inverted index](/t/inverted-index)-based engine does well.

The classic mistakes:

- Recomputing facets on every keystroke. Facet aggregation is extra work; doing it for autocomplete or on every input event is expensive. Debounce, or skip facets until results are shown.
- Inconsistent counts. Users notice when "Brand" counts don't add up to the total, which happens with multi-select semantics (do facets apply to the filtered set or each other?). Define the behaviour deliberately.
- Faceting on high-cardinality fields. Counts over a field with millions of distinct values are costly and useless. Facet on bounded categories (brand, colour, status), not IDs.
- Not filtering by facets in the same engine. If facet counts come from the search engine but filtering happens elsewhere, the two disagree. Do both consistently.
- Ignoring the update path. New fields or values need to be indexed/analyzable before facets work; schema and reindexing matter.
- Overloading the UI. Ten facets with fifty values each overwhelm users. Curate the dimensions.

**When to use it:** for any exploratory search where users refine interactively — e-commerce, directories, dashboards, log/observability UIs. It's a search-engine feature that turns a one-shot query into guided navigation, and it's one of the main reasons to adopt a dedicated [search engine](/t/search-engine) rather than basic database text search.
