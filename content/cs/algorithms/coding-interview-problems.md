---
title: "Coding Interview Problems"
summary: "Algorithm puzzles used in hiring, and how they relate to real work."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["leetcode", "algorithm interviews", "whiteboard interview"]
prereqs: ["algorithm", "data-structure"]
related: ["big-o-notation", "technical-interview", "data-structure", "brute-force", "binary-search"]
---

Many companies screen engineers with algorithm puzzles: given an array or a string, write a function that does X, within time and space limits, while talking through your thinking. Practice sites (LeetCode, HackerRank and others) are full of them.

## What they actually test

- Whether you can **break down a problem** and reason about it aloud.
- Familiarity with **common data structures** and their costs ([data structures](/t/data-structure), [Big O](/t/big-o-notation)).
- **Basic algorithm patterns.**
- **Clean, correct code** under mild pressure, with edge cases handled.
- **Communication**: do you ask clarifying questions, and take hints well?

How well they predict real job performance is debated. Day-to-day work is mostly reading code, design, debugging and collaboration. But the format is common, so it's worth preparing.

## Patterns that cover most problems

| Pattern | Typical hint |
|---|---|
| Hash map or set for lookups | "have I seen this?", counting, duplicates |
| Two pointers | sorted arrays, pairs, palindromes |
| Sliding window | longest or shortest subarray with a property |
| [Binary search](/t/binary-search) | sorted data, or a monotonic answer |
| Stack | matching brackets, "next greater element" |
| Breadth-first and depth-first search | trees, grids, graphs |
| Recursion and backtracking | combinations, permutations |
| Dynamic programming | overlapping subproblems, optimal choices |
| Sorting first | intervals, grouping |

## How to approach one

1. **Restate the problem and ask questions**: input sizes, duplicates, empty input, negative numbers.
2. **Work an example by hand.**
3. **State the brute-force solution** and its cost ([brute force](/t/brute-force)).
4. **Improve it** with a better structure or pattern, and explain why.
5. **Write the code carefully**, naming things clearly.
6. **Test with edge cases**, out loud.
7. **State the time and space complexity.**

## Preparing

Practice regularly in your own language, learn the patterns instead of memorizing solutions, practice speaking while solving, and review what you got wrong. See [technical interviews](/t/technical-interview).
