---
title: "Minimal Reproducible Example"
summary: "The smallest code that still shows the bug."
levels: { backend: junior, frontend: junior }
aliases: ["MRE", "minimal reproducible example", "MCVE", "minimal repro", "reproducible example", "SSCCE"]
prereqs: ["reproduce-bug"]
related: ["debugging", "rubber-duck-debugging", "binary-search-debugging", "reproduce-bug"]
core: [backend, frontend]
---

A **minimal reproducible example** is the smallest piece of code that still shows your
problem, and that someone else can run as-is.

## Why bother

- **Making one often solves the bug.** When you strip everything unrelated away, the cause
  usually shows itself, or the bug disappears and you learn what was involved.
- **It's what helpers need.** Nobody can debug your 5,000-line app from a screenshot. A
  20-line example gets answers on forums and issue trackers, and it's what library
  maintainers ask for.

## How to make one

1. Start from the failing code and **remove things** until the problem goes away, then put back
   the last thing you removed. Delete features, pages, packages, config.
2. **Replace real stuff with fakes**: hard-coded data instead of a database; a stub instead of
   a network call.
3. **Make it self-contained**: includes the imports, the input data and the exact command to run.
4. State **expected vs actual**: "I expected `[1, 2]`, I get `[2, 1]`", plus language/library versions.

```python
# Example of a minimal repro for a surprising result
items = [3, 1, 2]
result = sorted(items, key=lambda x: -x)
print(result)    # expected [1, 2, 3], got [3, 2, 1]: the key negates the value
```

(That one's explained by the code itself, which is exactly the benefit of shrinking it.)

## A common mistake

Posting only the error line, or the whole project. Aim in between: complete enough to
run, small enough to read. Remove secrets and private data first. Also see
[binary search debugging](/t/binary-search-debugging) for halving the problem.
