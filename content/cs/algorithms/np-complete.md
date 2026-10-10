---
title: "P vs NP / NP-Complete"
summary: "Problems with no known efficient solution, and why some tasks stay hard."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["P vs NP", "NP-complete", "np complete"]
prereqs: ["classic-hard-problems", "algorithm"]
related: ["dynamic-programming", "greedy-algorithm", "backtracking"]
---

**P vs NP** is the question of whether every problem whose solution can be *checked* quickly can also be *solved* quickly. **P** is the class of problems solvable in polynomial time (efficiently). **NP** is the class of problems whose proposed solutions can be *verified* in polynomial time — which includes everything in P, plus harder ones. The famous open question: does P = NP? Almost everyone believes not, but nobody has proved it.

**NP-complete** problems are the hardest problems in NP: if you found an efficient algorithm for *any* one of them, it would give an efficient algorithm for *all* of them (via reductions). So they stand or fall together. Thousands of practical problems are NP-complete — the [traveling salesman](/t/classic-hard-problems), satisfiability (SAT), scheduling, graph colouring, packing.

```text
P:  solvable quickly
NP: solution checkable quickly   (P ⊆ NP)
NP-complete: the hardest NP problems; one fast solution ⇒ P = NP
```

The practical meaning: for an NP-complete problem you shouldn't expect an exact, efficient algorithm. Instead you choose a strategy:

- Exact with small bounds — dynamic programming or branch-and-bound when an input parameter is small enough.
- Approximation — an algorithm that provably gets within some factor of optimal.
- Heuristics — get a good answer fast, with no optimality guarantee (common for TSP in the real world).
- A solver — give it to a mature SAT/ILP/constraint solver.

The classic mistakes:

- Assuming a hard problem has a clever polynomial solution you're missing. If it's genuinely NP-complete, it doesn't (unless P = NP). Spending days hunting is wasted effort.
- Confusing "exponential worst case" with "always slow". Many hard problems are easy on real inputs; worst-case hardness and typical performance differ.
- Missing the tractable case. Small capacities, few items, or special structure (e.g. a metric) often make an otherwise-hard problem easy. Always check the parameters.
- Treating NP-complete as "impossible". You still need an answer — approximate, heuristic, or exact-with-small-bounds. The classification shapes your approach, it doesn't stop the work.
- Mixing up verification and solving. "I can check this quickly" doesn't mean "I can find it quickly"; that gap is the whole point.

Understanding P vs NP calibrates expectations: it tells you when to stop looking for a perfect algorithm and start engineering a good-enough one. It's the theory under [classic hard problems](/t/classic-hard-problems), and it's why approximation and heuristics are respected engineering tools, not admissions of defeat.
