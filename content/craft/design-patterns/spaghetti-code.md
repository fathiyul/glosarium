---
title: "Spaghetti Code"
summary: "Tangled control flow that's impossible to follow."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["tangled code", "big ball of mud"]
prereqs: ["control-flow"]
related: ["structured-programming", "long-method", "coupling", "refactoring", "technical-debt"]
---

Spaghetti code is code whose control flow is so tangled that you can't follow it: logic jumps between places, functions depend on each other in every direction, and a change in one spot breaks something far away. Like a plate of spaghetti, you can't pull one strand out without moving the rest.

```python
def process(data):
    global state
    if state == 1:
        helper_a(data)       # modifies state, calls helper_b, which calls process again
    ...
```

## How it happens

Nobody sets out to write it. It accumulates:

- Quick fixes added on top of quick fixes, without restructuring.
- No clear structure or boundaries between parts ([coupling](/t/coupling)).
- Shared global state and hidden dependencies ([global variables](/t/global-variable)).
- Huge functions with many exits ([long method](/t/long-method), [deep nesting](/t/nesting-depth)).
- Deadlines, turnover and no tests.

The name dates from the `goto` era ([structured programming](/t/structured-programming)), but it applies to any tangled design.

## Why it hurts

Every change is risky and slow. Bugs hide in unexpected interactions, new people take months to be productive, and nobody dares to refactor. It's [technical debt](/t/technical-debt) with high interest.

## What to do about it

- **Don't rewrite it all.** Big rewrites usually fail ([big-bang rewrite](/t/big-bang-rewrite)).
- **Add tests first** around the part you must change, even rough ones that capture current behavior ([characterization tests](/t/characterization-test)).
- **Make small, safe improvements** as you touch it: rename, extract, flatten ([refactoring](/t/refactoring)).
- **Draw boundaries** and move toward clear modules with limited connections.
- **Replace pieces gradually** ([strangler fig](/t/strangler-fig)).
- **Prevent more**: code review, conventions, and a habit of leaving things cleaner ([boy scout rule](/t/boy-scout-rule)).
