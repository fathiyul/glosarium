---
title: "String Searching"
summary: "Algorithms like KMP and Rabin-Karp for finding substrings."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["string searching", "substring search", "KMP algorithm", "Rabin-Karp"]
prereqs: ["string", "algorithm"]
related: ["suffix-array", "regular-expression", "diffing-algorithm"]
---

**String searching** is finding where a pattern occurs within a larger text. The naive approach tries the pattern at every position, which is O(n·m) and does redundant work when a partial match fails. Smarter algorithms preprocess to skip ahead:

- **KMP (Knuth-Morris-Pratt)** — precomputes, from the pattern itself, how far to "fall back" on a mismatch, so it never rechecks characters it already matched. O(n + m), and it doesn't backtrack through the text.
- Rabin-Karp — hashes the pattern and each text window, comparing hashes first and only verifying on a hash match. Great for searching *many* patterns at once or for plagiarism-style matching.
- Boyer-Moore — compares the pattern from the end and can skip several characters at a time; often the fastest in practice for plain substring search, which is why many tools use variants of it.

```text
naive: "AAAAAB" in "AAAAAAAAAAAA" → checks and rechecks, slow
KMP:   on mismatch, jump using the pattern's prefix table → linear
```

These algorithms are inside everyday tools: `grep`, editors' find, search engines, and bioinformatics pipelines scanning genomes. Which one to use depends on the situation — KMP for guaranteed linear time, Rabin-Karp for multiple patterns, Boyer-Moore for typical fast single-pattern search.

The classic mistakes:

- Assuming the naive loop is fine for big inputs. On large texts and large alphabets it degrades badly; a linear algorithm is dramatically faster. For small inputs, though, naive is fine.
- Reinventing them without tests. The prefix tables and skipping logic are easy to get subtly wrong — off-by-one bugs abound. Use a proven library unless you're implementing for learning.
- Confusing substring search with regex. Regular expressions are more expressive but heavier; for a literal substring, a dedicated algorithm is simpler and faster. See [regular expressions](/t/regular-expression).
- Ignoring repeated queries. Searching the same large text many times? Build an index — a [suffix array](/t/suffix-array) — instead of rescanning.
- Forgetting encoding. Bytes vs characters matters for Unicode text; "position 5" can mean different things depending on the encoding.

String searching is a small, well-studied corner of algorithms where preprocessing the pattern (or the text) turns a quadratic scan into a linear one. It's a great illustration of how understanding the *structure* of the problem — here, the pattern's own overlaps — yields a much better algorithm than brute force.
