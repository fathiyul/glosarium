---
title: "Greedy Algorithm"
summary: "Taking the locally best choice at each step."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["greedy", "greedy approach"]
prereqs: ["big-o-notation"]
related: ["dynamic-programming", "topological-sort", "priority-queue", "backtracking"]
---

A greedy algorithm makes the locally best choice at each step and never reconsiders it. It's simple and fast, and for some problems the local choices add up to the global best answer. Dijkstra's shortest path, Huffman coding and many scheduling problems are greedy and provably correct.

Making change with coins works when the coin system is well behaved. With the usual coins, taking the largest coin that fits gives the fewest coins:

```python
def greedy_change(coins, amount):
    used = []
    for c in sorted(coins, reverse=True):
        while amount >= c:
            used.append(c)
            amount -= c
    return used

greedy_change([1, 5, 10, 25], 30)   # [25, 5]: two coins, which is optimal here
```

The trade-off is that greedy gives no guarantee in general. Proving a greedy method correct takes an argument, and a single counterexample shows it's wrong.

It fails for coin denominations 1, 3 and 4 with amount 6. Greedy takes 4, then 1, then 1, which is three coins. The best answer is 3 and 3, which is two coins. The greedy result looks reasonable and is still not optimal.

```python
greedy_change([1, 3, 4], 6)   # [4, 1, 1]: three coins, but 3 + 3 uses two
```

The classic mistake is assuming a greedy rule is optimal because it works on the examples you tried. Check it against small cases you can solve exhaustively, or against a [dynamic programming](/t/dynamic-programming) solution, before relying on it. Both approaches share the idea that choices are made step by step, and [backtracking](/t/backtracking) explores the alternatives greedy throws away.
