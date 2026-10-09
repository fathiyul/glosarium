---
title: "Algorithm"
summary: "A step-by-step procedure for solving a problem."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["algorithms"]
prereqs: ["function", "loop"]
related: ["big-o-notation", "data-structure", "sorting-algorithms", "binary-search", "brute-force"]
---

An algorithm is a step-by-step procedure for solving a problem. A recipe is one: clear steps, in order, that anyone can follow to get the result.

```python
def find_max(numbers):
    best = numbers[0]
    for n in numbers[1:]:
        if n > best:
            best = n
    return best
```

That's an algorithm for finding the largest number: start with the first, compare each of the rest, keep the biggest.

## What makes a good one

- **Correct**: it gives the right answer for every valid input, including the edge cases (empty, one item, duplicates).
- **Finite**: it ends.
- **Efficient**: it doesn't take more time or memory than needed ([time complexity](/t/time-complexity), [space complexity](/t/space-complexity)).
- **Clear**: others can understand it.

## Same problem, different algorithms

Searching a sorted list of a million items: [linear search](/t/linear-search) might check up to a million; [binary search](/t/binary-search) needs about twenty. The choice changes the speed by orders of magnitude, which is why algorithms matter.

## Everyday algorithms

Sorting, searching, finding the shortest route, matching text, compressing files, ranking results, scheduling. Most of the time you use the ones in your language's library and databases instead of writing your own. What matters is knowing which operations are cheap and which are expensive ([data structures](/t/data-structure)).

## How to approach one

1. Understand the problem and examples.
2. Try the simple approach first ([brute force](/t/brute-force)).
3. Work out its cost ([Big O](/t/big-o-notation)).
4. Improve only if it's too slow, usually by choosing a better data structure.
5. Test the edge cases.

You don't need to memorize algorithms. Knowing the categories and trade-offs lets you pick and use the right tool.
