---
title: "Big Omega and Big Theta"
summary: "Lower bounds and tight bounds, alongside Big O's upper bound."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["Omega notation", "Theta notation", "asymptotic bounds"]
prereqs: ["big-o-notation"]
related: ["big-o-notation", "amortized-analysis", "quicksort", "merge-sort"]
---

Big O describes an upper bound on how an algorithm's cost grows. Big Omega (Ω) gives a lower bound, the least growth the cost can have, and Big Theta (Θ) gives a tight bound, when the upper and lower bounds match. Together they describe how an algorithm grows from both sides.

For a linear search through an unsorted list of n items:

- The worst case is n comparisons, so it's O(n).
- The best case is 1 comparison, when the item is first, so the best case is Ω(1).
- Because the best case is constant and the worst is linear, a single tight Θ bound isn't available for every input. You'd state Θ for a specific case, such as the case where the item is absent and every element must be checked, which takes Θ(n).

Merge sort is different: every input takes Θ(n log n), because the algorithm always splits and merges the whole list.

```
merge sort:   O(n log n)   Ω(n log n)   Θ(n log n)
linear search: O(n)        Ω(1)          Θ(n) only when all items must be checked
```

The trade-off is that a bound on its own says little about typical behaviour. A lower bound describes the least work any input needs, and an upper bound describes the most. Average-case analysis needs assumptions about how inputs are distributed.

The classic mistake is writing Big O when you mean a tight bound, as though the algorithm always takes the worst-case time. Say which case you're describing, and use Θ when you have matching bounds. For the average and worst cases of a common sort, see [quicksort](/t/quicksort).
