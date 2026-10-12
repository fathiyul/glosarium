---
title: "Stack"
summary: "A last-in, first-out collection."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["LIFO", "stack data structure", "call stack"]
prereqs: ["list"]
related: ["queue", "recursion", "stack-overflow", "stack-vs-heap", "linked-list"]
---

A stack is a collection where the last item added is the first one removed (LIFO: last in, first out). Like a pile of plates, you add to the top and take from the top.

```python
stack = []
stack.append("a")        # push
stack.append("b")
stack[-1]                # peek the top → "b"
stack.pop()              # pop → "b"
```

Operations: **push**, **pop**, **peek**, **is empty**. All take constant time when built on a [dynamic array](/t/dynamic-array) or a [linked list](/t/linked-list).

## Where stacks appear

- **The call stack**: each function call pushes a frame, and returning pops it. That's why runaway recursion causes a [stack overflow](/t/stack-overflow) ([recursion](/t/recursion)).
- **Undo and redo**: each action is pushed, and undo pops the latest.
- **Browser back button**: history behaves like a stack.
- **Matching brackets and parsing**: push on `(`, pop on `)`.
- **Depth-first search**: a stack (or recursion) holds the nodes still to visit.
- **Evaluating expressions** and compilers.

```python
def balanced(text):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in text:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack
```

## Don't confuse

- **The data structure** (LIFO) and **stack memory**, the region where function frames live, compared with the heap ([stack vs heap](/t/stack-vs-heap)).
- **Stack vs [queue](/t/queue)**: last-out first, versus first-out first.

A stack trace is the list of active calls, printed when an error occurs ([stack trace](/t/stack-trace)).
