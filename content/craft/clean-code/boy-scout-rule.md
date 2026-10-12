---
title: "Boy Scout Rule"
summary: "Leave the code a little cleaner than you found it."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["campsite rule", "leave it cleaner"]
prereqs: ["refactoring", "clean-code"]
related: ["refactoring", "technical-debt", "managing-technical-debt", "code-review", "small-prs"]
---

The boy scout rule says: leave the code a little cleaner than you found it. The name comes from the scouts' habit of leaving a campsite tidier than they arrived. It was popularized for software by Robert C. Martin.

You don't have to fix everything. Whenever you work in a file, make one small improvement along the way:

- Rename a confusing variable.
- Delete a dead function or a stale comment.
- Extract a few lines into a well-named helper.
- Add a missing test for the code you're touching.
- Fix a typo or an obvious small mess.

```python
# you came to fix a bug in this function, and you also...
def calc(d, r):           →      def price_after_discount(price, rate):
```

## Why it works

Large cleanups never get scheduled. Small improvements made continuously keep quality from decaying, and spread the effort so no one has to ask for "refactoring week" ([technical debt](/t/technical-debt)). Every visit makes the next one easier.

## Keep it safe and small

- **Stay close to what you're changing.** Clean the area you're already working on, so you understand it and can test it.
- **Don't mix big refactors into a feature PR.** Reviewers need to see the real change. Put larger cleanups in separate commits or PRs ([small PRs](/t/small-prs)).
- **Make sure tests pass**, before and after ([refactoring](/t/refactoring)).
- **Don't reformat whole files** in the same change, which buries real edits. Let a [formatter](/t/formatter) handle style separately.
- **Follow team conventions** ([following conventions](/t/following-conventions)).
- **Don't gold-plate.** The rule says a little cleaner, not perfect.

For problems too large for a quick fix, record them and plan them ([managing technical debt](/t/managing-technical-debt)).
