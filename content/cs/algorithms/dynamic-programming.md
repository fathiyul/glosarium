---
title: "Dynamic Programming"
summary: "Solving overlapping subproblems once and reusing the answers."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["DP", "memoized recursion", "tabulation"]
prereqs: ["recursion", "divide-and-conquer"]
related: ["memoization", "divide-and-conquer", "greedy-algorithm", "backtracking"]
---

Dynamic programming (DP) solves a problem by breaking it into overlapping subproblems and storing each answer so it's computed only once. It applies when a naive recursion keeps recomputing the same subproblems, and when an optimal answer can be built from optimal answers to smaller ones.

Making change with the fewest coins is a good example. The table fills in the best answer for each amount from 0 up to the target:

```python
def min_coins(coins, amount):
    best = [0] + [float("inf")] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                best[a] = min(best[a], best[a - c] + 1)
    return best[amount]

min_coins([1, 3, 4], 6)   # 2 (3 + 3), where the greedy approach uses 3
```

Each entry depends only on smaller amounts, so the table is computed bottom-up. Filling it takes O(amount × number of coins) time.

The trade-off is memory and set-up. The table stores answers for every subproblem, which can be large, and the state has to be chosen carefully so it captures everything the answer depends on. Getting the state wrong gives answers that look plausible and are sometimes slightly off.

The classic mistake is writing a plain recursive version and wondering why it's slow. Store the results of each subproblem, either by [memoization](/t/memoization) or by a table, and the same recursion becomes polynomial. For a problem where a locally best choice is always right, the simpler [greedy algorithm](/t/greedy-algorithm) may be enough, and it's worth checking before reaching for DP.
