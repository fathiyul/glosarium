---
title: "Designing Autocomplete"
summary: "Tries, ranking and caching for type-ahead search."
levels: { backend: senior, frontend: senior }
aliases: ["autocomplete design", "typeahead", "search suggestions"]
prereqs: ["trie", "cache-hit-miss"]
related: ["trie", "search-engine", "cache-hit-miss"]
---
**Designing autocomplete** serves prefix suggestions in milliseconds as users type: a trie (or finite-state transducer) over popular queries, ranked by frequency and recency, cached aggressively at the edge, with per-keystroke lookups that must feel instant. The exercise compresses ranking, caching and latency budgeting into one feature.

```text
"t" → trie lookup (top-k by score) → edge cache → <50ms suggestions
data: query logs → aggregate frequencies → build trie → replicate
```

Key decisions: data source (aggregated real queries, not dictionaries), ranking (frequency × recency × personalisation), update cadence (hourly/daily rebuilds vs streaming), latency (edge-cached prefix results; debounced requests), and scale (shard by prefix; replicate hot prefixes).

The classic mistakes:

- Dictionary instead of behaviour. Static word lists suggest nonsense users never type. Mine real query logs; rank by what people actually search.
- Uncached per-keystroke origin hits. Every keystroke to the database collapses under load. Cache prefix results at the edge; debounce client requests.
- No debouncing. Firing on every keystroke (including pastes and holds) multiplies traffic pointlessly. Debounce ~100–200ms; cancel in-flight.
- Ignoring the tail. Obscure prefixes miss the cache and hit cold paths; bound tail latency separately or accept slower rare prefixes explicitly.
- Personalisation without privacy. Per-user suggestions need consent and data minimisation; global popularity serves most needs without personal data.
- Stale suggestions. Trending queries demand fresh rebuilds; daily batches lag events. Match rebuild cadence to volatility (streaming for news, daily for catalogues).
- Offensive suggestions unfiltered. Real query logs contain slurs and abuse; filter and review suggestion candidates before serving them to everyone.

**Why it teaches:** tries, ranking, edge caching, debouncing, log mining — autocomplete is information retrieval at interactive latency. Get the hot path cached and the data behavioural.
