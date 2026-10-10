---
title: "Backtracking"
summary: "Trying choices and undoing them when they lead nowhere."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["backtrack search", "exhaustive search with pruning"]
prereqs: ["depth-first-search"]
related: ["depth-first-search", "dynamic-programming", "greedy-algorithm", "recursion"]
---

Backtracking builds a solution one choice at a time, depth first. At each step it tries a choice, continues, and if that path leads to a dead end, it undoes the choice and tries the next one. It's a systematic way to search a space of candidate solutions that is too large to list but can be pruned.

Generating all permutations of a list is the simplest example:

```python
def permutations(items):
    if not items:
        return [[]]
    result = []
    for i, item in enumerate(items):          # choose one item for this position
        rest = items[:i] + items[i + 1:]      # the choices that remain
        for tail in permutations(rest):
            result.append([item] + tail)
    return result

permutations([1, 2, 3])
# [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
```

This version builds new lists instead of undoing choices, which is simpler but uses more memory. A classic backtracking version reuses one list, adds an item, recurses, and removes it again.

The trade-off is that the search space often grows exponentially. Permutations of n items number n!, so exhaustive search is practical only for small inputs. Pruning, which abandons a branch as soon as it can't lead to a valid answer, is what makes backtracking useful in practice.

The classic mistake is forgetting to prune, so the search explores branches that were already impossible. Check the constraint as early as possible, and stop when a partial solution already breaks it. When the subproblems repeat, [dynamic programming](/t/dynamic-programming) can avoid redoing the same work.
