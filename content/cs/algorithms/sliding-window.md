---
title: "Sliding Window"
summary: "Maintaining a moving range over a sequence."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["window technique", "sliding window algorithm"]
prereqs: ["two-pointers"]
related: ["two-pointers", "amortized-analysis", "dynamic-programming", "array"]
---

A sliding window keeps a contiguous range of a sequence, and moves it across the data instead of recomputing from scratch. As the window moves right, one item enters on the right and one leaves on the left, so each step updates a running result in constant time.

Finding the largest sum of any three consecutive numbers shows the pattern:

```python
def max_window_sum(a, k):
    s = sum(a[:k])                  # the first window
    best = s
    for i in range(k, len(a)):
        s += a[i] - a[i - k]        # add the entering item, drop the leaving one
        best = max(best, s)
    return best

max_window_sum([2, 1, 5, 1, 3, 2], 3)   # 9: the best window is [5, 1, 3]
```

The window `[5, 1, 3]` sums to 9, which is the largest. A naive version recomputes each window's sum, which takes O(n·k) time. The sliding version takes O(n), because each item enters and leaves the window once.

The trade-off is that the technique needs a rule for what the window must satisfy, and the update step has to be correct for both ends. Variable-size windows, such as the shortest window containing a target, need a second pointer and careful bookkeeping.

The classic mistake is recomputing the whole window each time, which keeps the code simple but makes the work proportional to the window size. The other mistake is forgetting to update the result or the state when an item leaves the window. Check both ends on each step. For the pointer movement itself, see [two pointers](/t/two-pointers).
