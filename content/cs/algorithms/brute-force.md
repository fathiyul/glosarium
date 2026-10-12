---
title: "Brute Force"
summary: "Trying every possibility; the baseline before optimizing."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["exhaustive search", "naive solution"]
prereqs: ["algorithm"]
related: ["algorithm", "time-complexity", "premature-optimization", "backtracking", "binary-search"]
---

A brute-force solution tries every possibility until it finds the answer. It's the simplest approach, often the obvious one, and a good starting point.

```python
def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return i, j
```

It checks every pair, so the cost is O(n²). For ten items that's fine. For a million, it's a trillion comparisons.

A smarter version uses a dictionary to remember what it has seen:

```python
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return seen[target - n], i
        seen[n] = i
```

One pass, O(n).

## Why start with it

- **It's usually correct and easy to write.** Correctness comes first.
- **It's a baseline.** You can compare the clever version's results against it in tests.
- **It might be good enough.** If the input is small, don't over-engineer ([premature optimization](/t/premature-optimization)).
- **It reveals the structure of the problem**, which points to the optimization.

## When it stops working

Brute force grows fast with input size, and some problems explode: trying every ordering of 20 items is more than 2 × 10¹⁸ possibilities. Then you need pruning ([backtracking](/t/backtracking)), better data structures, or smarter algorithms such as dynamic programming and greedy methods ([dynamic programming](/t/dynamic-programming)).

## Practical tip

When you get stuck on a problem (or in an interview), say the brute-force answer out loud first. Then find what's wasted: repeated work, or a search that could use a sorted order or a hash table.
