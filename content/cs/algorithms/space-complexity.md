---
title: "Space Complexity"
summary: "How memory use grows with input size."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["memory complexity", "auxiliary space"]
prereqs: ["big-o-notation"]
related: ["time-complexity", "big-o-notation", "recursion", "dynamic-array", "stack-overflow"]
---

Space complexity describes how an algorithm's memory use grows with the size of its input, using the same notation as [time complexity](/t/time-complexity).

```python
def total(numbers):          # O(1) extra space: one accumulator
    t = 0
    for n in numbers:
        t += n
    return t

def doubled(numbers):        # O(n) extra space: builds a new list the same size
    return [n * 2 for n in numbers]

def pairs(numbers):          # O(n²) space if you store every pair
    return [(a, b) for a in numbers for b in numbers]
```

Usually we count the **extra** memory the algorithm needs, not the input itself (auxiliary space).

## Hidden costs

- **Recursion uses stack space**: a recursive function that goes n levels deep needs O(n) memory for the call stack, and can overflow ([recursion](/t/recursion), [stack overflow](/t/stack-overflow)).
- **Copies**: slicing or concatenating in a loop creates new objects each time.
- **Data structures**: a [hash table](/t/hash-table) or cache trades memory for speed.
- **Intermediate results** (loading everything into a list instead of streaming).

## The trade-off with time

Often you can spend memory to save time:

- A dictionary of seen values turns an O(n²) search into O(n), using O(n) space.
- Caching results ([memoization](/t/memoization)) avoids recomputation, at the price of storing them.

And the reverse: streaming through data one item at a time uses constant memory, but you can't revisit earlier items.

## In practice

- **Memory limits are real.** A million-row list of objects can take gigabytes in some languages.
- **Prefer streaming and generators** for big data ([generators](/t/generator)).
- Measure actual use with a profiler instead of guessing.
- Know whether you're constrained by time, memory or both.
