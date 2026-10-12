---
title: "Understand Before You Change"
summary: "Knowing why code exists before you modify it."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["understand before you change", "Chesterton's fence for code", "know why code exists", "don't change what you don't understand"]
prereqs: ["reading-a-codebase"]
related: ["chestertons-fence", "reading-a-codebase", "characterization-test", "git-log", "git-blame", "legacy-code"]
core: [backend, frontend, data-engineer]
---

When you see strange code, such as an odd check, a weird workaround or a comment saying "do not remove", the temptation is to clean it up. **First find out why it's
there.** Code that looks pointless is often handling a real situation you haven't met yet.

This is [Chesterton's fence](/t/chestertons-fence): don't remove a fence until you know why it was built.

```python
# looks redundant...
if order.total_cents == 0 and order.coupon is None:
    return skip_payment(order)     # why? maybe free-trial signups with no card
```

Deleting that check may break free trials. The cost shows up in production, not in your tests.

## How to find out

1. **Read the surrounding code and comments.**
2. **Check history.** `git log -p -- file` and `git blame` tell you when the line was added and in which commit and ticket
   ([Git log](/t/git-log), [git blame](/t/git-blame)). The commit message and linked ticket often explain it directly.
3. **Look at the tests.** What behavior do they lock in? Which would fail if you removed it?
4. **Search for usages**: who calls this, and what do they expect?
5. **Run it and observe**: add a log or use the debugger to see when this path executes in practice.
6. **Ask someone who knows**, such as the author or the person who owns the area. Ask what it's for, not whether you can delete it.

## If you still don't know

- **Add tests first** that capture current behavior, even the weird parts ([characterization tests](/t/characterization-test)), then change the code
  and see what differs.
- **Make the change small and reversible**, and watch it carefully after releasing.
- **Leave a comment** with what you learned, so the next person doesn't repeat the investigation.

## Not an excuse for fear

You do not need to understand everything. You need to understand the part you're changing, and what depends on it. And sometimes the code really is dead or wrong. The point is to **check**
before you change, not to leave it forever. See also [reading a codebase](/t/reading-a-codebase) and [legacy code](/t/legacy-code).
