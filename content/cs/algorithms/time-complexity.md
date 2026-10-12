---
title: "Time Complexity"
summary: "How the number of steps grows with input size."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["runtime complexity", "algorithm complexity", "running time"]
prereqs: ["big-o-notation"]
related: ["big-o-notation", "space-complexity", "complexity-classes", "best-worst-average-case", "algorithm"]
---

Time complexity describes how the number of steps an algorithm takes grows as the input gets bigger. It's expressed in [Big O notation](/t/big-o-notation), and it answers: if I double the data, what happens to the running time?

Count how the work scales with n, the input size:

```python
def first(items):              # O(1): one step, however long the list is
    return items[0]

def total(items):              # O(n): one step per item
    return sum(items)

def has_duplicates(items):     # O(n²): compare every pair
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if items[i] == items[j]:
                return True
    return False

def has_duplicates_fast(items):    # O(n): a set remembers what's been seen
    return len(set(items)) != len(items)
```

## How to work it out

- A single loop over n items: O(n).
- A loop inside a loop over the same data: O(n²).
- Halving the problem each step: O(log n).
- Steps one after another **add** (O(n) + O(n²) is O(n²)). Nesting **multiplies**.
- Drop constants and lower-order terms ([complexity classes](/t/complexity-classes)).
- Watch for hidden loops: `x in some_list`, `list.insert(0, x)`, string concatenation in a loop, a database query per item ([N+1 queries](/t/n-plus-one-query)).

## Which case?

Complexity is usually stated for the worst case, sometimes the average ([best, worst and average case](/t/best-worst-average-case)).

## What it's for

- **Predicting how code scales** before it meets real data.
- **Choosing between approaches**: a dictionary lookup or a list scan?
- **Spotting performance bugs.** "It was fast in testing and slow in production" often means a quadratic algorithm met large input.

Time complexity ignores constants and real hardware, so measure when it matters ([premature optimization](/t/premature-optimization)). Memory has its own version ([space complexity](/t/space-complexity)).
