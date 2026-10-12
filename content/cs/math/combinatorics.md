---
title: "Combinatorics"
summary: "Counting arrangements and combinations, e.g. how many IDs a format allows."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["counting", "permutations and combinations"]
prereqs: ["set-theory"]
related: ["probability-basics", "discrete-math", "backtracking", "set-theory"]
---

Combinatorics is the branch of mathematics that counts arrangements and selections. It answers questions such as how many passwords a format allows, how many ways to pick a team, or how many orderings a list has. Those counts matter when you size a key space, estimate how long a brute-force search would take, or check the range of an ID.

The two basic counts are permutations, where order matters, and combinations, where it doesn't:

```python
import math

math.perm(3)     # 6: orderings of 3 items, 3!
math.comb(5, 2)  # 10: ways to choose 2 of 5 items, order ignored
```

A four-character code using only lowercase letters and digits has 36 choices per position, so 36⁴ = 1,679,616 possible codes. Counting this way tells you whether a format has enough room for the values you need.

The trade-off is that counts grow quickly. Permutations of n items are n!, and a count that looks small on paper can be far too large to enumerate. A count tells you the size of a space, not whether a particular arrangement is valid.

The classic mistake is mixing up permutations and combinations, which gives a count that is too large or too small by a factor of several. Ask whether the order of the choices changes the result, and pick the formula that matches. For searching such spaces, see [backtracking](/t/backtracking).
