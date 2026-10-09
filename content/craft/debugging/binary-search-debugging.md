---
title: "Divide and Conquer Debugging"
summary: "Halving the search space until the cause is isolated."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["bisecting", "divide and conquer debugging", "wolf fence algorithm"]
prereqs: ["debugging"]
related: ["git-bisect", "debugging", "reproduce-bug", "print-debugging", "root-cause-analysis"]
---

Divide-and-conquer debugging means narrowing a problem by repeatedly cutting the search space in half, until the cause is isolated. It's the same idea as binary search: check the middle, decide which half contains the bug, and repeat.

## In code

You know that the input is fine and the output is wrong, with a long pipeline between them. Check the value in the middle:

```python
def process(order):
    a = step1(order)
    b = step2(a)
    print("after step2:", b)      # is this already wrong?
    c = step3(b)
    d = step4(c)
    return d
```

- If `b` is already wrong, the bug is in steps 1 or 2. Check between them next.
- If `b` is right, the bug is in steps 3 or 4.

Each check halves what's left. A hundred lines becomes about seven checks.

## In history

[`git bisect`](/t/git-bisect) does it across commits: it checks out a commit halfway between "good" and "bad", you test it, and repeat to find the commit that introduced the bug.

## In other places

- **Inputs**: remove half of the data, or half the configuration, and see if it still fails ([minimal reproducible example](/t/minimal-reproducible-example)).
- **Code**: comment out half the feature, or disable half the plugins.
- **Systems**: is the request correct at the gateway, at the service, at the database?
- **Time**: it worked yesterday. What changed since?

## Rules

1. **Reproduce the bug reliably first** ([reproducing a bug](/t/reproduce-bug)). You need a clear pass or fail check.
2. **Pick a good midpoint**, a place where you can observe the state.
3. **Don't change two things at once.**
4. **Write down what you've ruled out.**

When the bug is intermittent, or the check is unreliable, the halves mislead you, so improve the reproduction first. See [debugging](/t/debugging).
