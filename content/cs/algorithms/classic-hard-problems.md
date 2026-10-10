---
title: "Classic Hard Problems"
summary: "Knapsack, traveling salesman and others, and how to recognize them in disguise."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["classic hard problems", "NP-hard problems", "knapsack TSP"]
prereqs: ["np-complete", "dynamic-programming"]
related: ["greedy-algorithm", "backtracking"]
---

A handful of problems come up again and again in disguise, and recognising them saves you from either inventing a bad solution or wasting time on one that can't exist. The famous ones:

- **Knapsack** — choose items of given weight and value to maximise value under a capacity. Solvable by [dynamic programming](/t/dynamic-programming) when capacities are small, but NP-hard in general.
- Traveling salesman (TSP) — visit every city once with minimum total travel. Exact solutions blow up with size; real use relies on heuristics and approximations.
- Vertex cover / set cover / clique — pick a smallest set satisfying a constraint; the essence of many scheduling and selection problems.
- Bin packing / scheduling — fit items into bins or machines efficiently. Greedy gets close; optimal is hard.

```text
looks like: "choose a subset to maximize X under limit Y"
            "visit/cover everything with minimum cost"
            "assign items to limited capacity"
usually is: a hard (NP-hard) problem in disguise
```

The practical skill is **pattern recognition**. If a problem smells like choosing a subset under constraints, covering or visiting everything, or packing under limits, assume it's hard until you find a reason it's easy (small bounds, special structure, a DP formulation). Then choose accordingly: exact DP if the parameters are small, a [greedy](/t/greedy-algorithm) heuristic or an approximation if you only need "good enough", or a solver library for the hard cases.

The classic mistakes:

- Searching for a polynomial exact algorithm. If the problem is NP-hard, you won't find one (and if you do, you'd be famous). Accept approximation or exponential-with-small-bounds.
- Assuming a greedy approach is optimal. It often is *close* but not optimal; sometimes that's fine, sometimes it's a correctness bug.
- Missing the small parameter. Knapsack by capacity, or by number of items, can be DP-solvable when the value is small — recognising this turns "impossible" into "easy".
- Reaching for brute force on realistic sizes. Exhaustive search is fine for tiny inputs and hopeless beyond; estimate the size before committing.
- Reinventing a solver. For genuine TSP or SAT-like problems, mature solvers and libraries exist; use them rather than writing one.

These problems are landmarks on the map of computational difficulty. Learning to spot them — and to see which parameter makes them tractable — is more valuable than memorising any single algorithm. They connect to [NP-completeness](/t/np-complete) and to the algorithmic toolbox of DP, greedy and [backtracking](/t/backtracking).
