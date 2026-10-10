---
title: "Fuzzy Search"
summary: "Matching despite typos and spelling variations."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["fuzzy search", "typo tolerance", "approximate string matching"]
prereqs: ["search-engine", "inverted-index"]
related: ["search-engine", "relevance-scoring", "search-analyzers"]
---

**Fuzzy search** finds results even when the query doesn't match exactly — misspellings, missing or extra letters, phonetic mistakes. "recieve" should find "receive"; "Jonhson" should find "Johnson". It's what makes search feel forgiving rather than pedantic.

The common techniques:

- Edit distance (Levenshtein) — measure how many insertions/deletions/substitutions turn one word into another; match within a small distance. "receive" vs "recieve" is distance 1.
- N-grams — index overlapping character chunks so near-matches share chunks; a classic way to make typo-tolerant indexes.
- Phonetic algorithms (e.g. Soundex/Metaphone) — index by sound so "Smith" and "Smyth" collide.
- Search-engine fuzziness — most engines offer a built-in "fuzzy" option that applies edit distance to the query terms (see [search engine](/t/search-engine)).

```text
receive  vs  recieve   → edit distance 1 → fuzzy match
```

The classic mistakes:

- Turning fuzziness on everywhere. Fuzzy matching broadens results and can surface irrelevant ones; on every query it hurts precision. Apply it where typo tolerance helps (user text) and not for exact identifiers.
- Distance too large. Allowing a big edit distance makes unrelated words match (short words especially: distance 2 turns a 3-letter word into almost anything). Keep it small, often 1–2, or scale with word length.
- Ignoring the performance cost. Fuzzy matching is more expensive than exact term lookup; on high-traffic search it can matter. Measure.
- Confusing it with relevance. Fuzzy matching finds *more* candidates; ranking still decides order (see [relevance scoring](/t/relevance-scoring)). A fuzzy hit isn't automatically a good hit.
- Not combining with exact. Best practice is often to prefer exact matches and fall back to fuzzy only when few results — so correct queries stay precise.
- Forgetting analysis. Fuzzy operates on analysed terms; stemming and normalisation change what's compared (see [search analyzers](/t/search-analyzers)).

**When to use it:** for user-entered search where typos are expected — product search, people search, general text search. It's a usability feature that trades some precision for recall and forgiveness. Tune the distance, combine with exact matching, and let relevance scoring sort the results.
