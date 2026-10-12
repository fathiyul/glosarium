---
title: "Discrete Math"
summary: "Logic, sets, graphs and combinatorics: the math of computing."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["discrete mathematics"]
prereqs: ["set-theory"]
related: ["set-theory", "combinatorics", "probability-basics", "graph"]
---

Discrete math is the branch of mathematics that deals with countable, separate values rather than continuous ones. It covers logic, sets, relations, graphs, counting and proof techniques. Most of computing rests on it, because programs manipulate discrete values such as integers, strings and records.

Logic is the everyday part. A condition like "the user is an admin or the order belongs to them" is a logical expression, and a truth table checks every combination of inputs:

```
a      b      a or b
False  False  False
False  True   True
True   False  True
True   True   True
```

The same tools describe a graph's edges, a database's relations and the number of states a program can be in.

The trade-off is that discrete math gives exact answers, but applying it needs a precise model of the problem. A rule that is vague in English can't be checked until it's written as a precise statement, and that rewrite is often where bugs get caught.

The classic mistake is treating discrete math as a school subject separate from programming. The skills show up in conditions, data models and complexity analysis. Write conditions as logical expressions and check them with a table when they are complicated. For the parts most used in practice, see [set theory](/t/set-theory), [combinatorics](/t/combinatorics) and [graphs](/t/graph).
