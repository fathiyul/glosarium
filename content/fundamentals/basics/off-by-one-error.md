---
title: "Off-by-One Error"
summary: "A loop or index that runs one step too many or too few."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior }
aliases: ["OBOE", "fencepost error", "off by one"]
prereqs: ["loop", "list"]
related: ["loop", "iteration", "indexing", "slicing", "base-case"]
---

An off-by-one error is a loop or index that runs one step too many or one too few. It's among the most common bugs in programming.

```python
items = ["a", "b", "c"]          # indexes 0, 1, 2

for i in range(1, len(items)):   # skips items[0]
    ...
items[len(items)]                # IndexError: the last index is len - 1
```

## Where they hide

- **Zero-based vs one-based.** A list of length 3 has indexes 0 to 2.
- **Inclusive vs exclusive ends.** `range(0, 3)` and `items[0:3]` stop **before** 3. SQL `BETWEEN` and some APIs include the end.
- **`<` vs `<=`** in loop conditions.
- **Counting items vs gaps** (the fencepost problem): 10 fence segments need 11 posts.
- **Date ranges.** "From June 1 to June 30" is 30 days if both ends count, 29 if you subtract.
- **Pagination.** Page 1 starts at offset 0, not 1.

## How to prevent them

- **Loop over items, not indexes**, when you can: `for item in items`.
- **Check the edges by hand**: run through the empty list, one item, and the first and last items.
- **Write tests for boundaries**, such as an empty input, a single element, and exactly at the limit.
- **Be consistent** about whether ranges are half-open (start included, end excluded). That convention makes `end - start` equal the length and adjacent ranges not overlap.

When a result is "almost right but one off", suspect a boundary ([slicing](/t/slicing), [indexing](/t/indexing)).
