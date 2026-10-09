---
title: "Recursion"
summary: "A function solving a problem by calling itself on smaller inputs."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["recursive function"]
prereqs: ["function"]
related: ["base-case", "tail-recursion", "stack-overflow", "loop", "divide-and-conquer"]
---

Recursion is a function solving a problem by calling itself on a smaller version of that problem, until it reaches a case simple enough to answer directly.

```python
def count_down(n):
    if n == 0:                 # base case
        print("liftoff")
        return
    print(n)
    count_down(n - 1)          # smaller problem
```

Every recursive function needs two parts: a [base case](/t/base-case) that stops it, and a recursive case that moves toward it.

## Where it fits

Recursion suits data that is itself nested: folders inside folders, comments with replies, JSON trees, expression parsers.

```python
def total_size(folder):
    return sum(f.size for f in folder.files) + sum(total_size(sub) for sub in folder.folders)
```

Writing that with a loop means managing your own stack of folders to visit.

## How it runs

Each call waits on the stack for the one it made. Deep recursion uses a lot of stack and can crash with a [stack overflow](/t/stack-overflow). Python caps depth at about a thousand calls by default.

## Pitfalls

- **Missing or unreachable base case**: it never stops.
- **Repeated work.** A naive Fibonacci recomputes the same values exponentially many times. Cache results ([memoization](/t/memoization)) or use a loop.
- **Too deep**: for long chains, use a [loop](/t/loop) instead. Some languages optimize [tail recursion](/t/tail-recursion), but Python and JavaScript generally don't.

A good test: if you can say "the answer for this equals something simple plus the answer for a smaller one", recursion fits.
