---
title: "Debugging"
summary: "Systematically finding why code doesn't do what you expect."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["debug", "bug fixing", "troubleshooting code"]
prereqs: ["reading-error-messages"]
related: ["reproduce-bug", "minimal-reproducible-example", "debugger", "print-debugging", "rubber-duck-debugging", "root-cause-analysis"]
core: [backend, frontend, data-engineer]
---

Debugging is finding out *why* your program doesn't do what you expect, and then fixing the
actual cause. It's a skill, and it's mostly method, not talent.

## A reliable loop

1. **Reproduce it.** If you can't make it happen on demand, you can't tell when you fixed it
   (see [reproducing a bug](/t/reproduce-bug)).
2. **Read the error.** The message and [stack trace](/t/stack-trace) often point straight at
   it ([reading error messages](/t/reading-error-messages)).
3. **Form a hypothesis**: "I think `user` is null here because the lookup failed."
4. **Test it**: add a log, set a [breakpoint](/t/breakpoint), or write a small test. Check the
   *actual* value rather than assuming.
5. **Narrow it down.** Cut the problem in half: is the data wrong *before* this function or
   *after*? ([binary search debugging](/t/binary-search-debugging))
6. **Fix the cause, not the symptom.** Wrapping a crash in `try/except` hides it.
7. **Confirm and prevent.** Check the original scenario now works, and add a test so it
   doesn't come back.

## Habits that save hours

- **Change one thing at a time.** Otherwise you won't know which change mattered.
- **Question assumptions.** The bug is usually in something you were *sure* was fine.
- **Check what changed recently**: `git log`, `git diff`, a deploy, a config edit.
- **Take a break or explain it** to someone, even a [rubber duck](/t/rubber-duck-debugging).
- **Write down what you've tried**, so you stop repeating it.
- **Don't guess-and-patch.** Random edits until it works leave you with code you don't understand.

Tools help (the [debugger](/t/debugger), logs, [DevTools](/t/browser-devtools)), but the
thinking is the work: observe, hypothesize, test.
