---
title: "Small Pull Requests"
summary: "Keeping changes small so they're reviewed faster and better."
levels: { backend: junior, frontend: junior }
aliases: ["small pull requests", "small changes", "PR size"]
prereqs: ["pull-request"]
related: ["code-review", "atomic-commit", "stacked-prs", "self-review", "pr-description"]
core: [backend, frontend]
---

A small pull request is easier to review, quicker to merge and less risky to ship. There's
no exact size, but a common rule of thumb is a change a reviewer can read in about
15 minutes, often a few hundred lines at most, excluding generated files.

## Why small wins

- **Better reviews.** People read a 60-line change carefully. A 2,000-line one gets "looks
  good to me".
- **Faster feedback.** Small PRs get picked up quickly, and the waiting time is shorter.
- **Fewer conflicts**, because the branch lives for hours or a day, not weeks.
- **Easier to undo.** If it causes a problem, reverting is simple and the cause is easy
  to find.
- **Clearer history.** One purpose per change.

## How to make a big task small

- **Split by step**: refactor first, then change behavior, then add the UI.
- **Separate mechanical from meaningful**: renaming and formatting go in their own PR so
  reviewers can skim them.
- **Ship behind a flag**: merge unfinished work that's switched off, in pieces.
- **Add the foundation first**: schema or helper functions in one PR, users of them in the next.
- When later pieces depend on earlier ones that are still in review, use
  [stacked PRs](/t/stacked-prs).

```
PR 1: Add orders.status column (migration only)
PR 2: Write status on checkout
PR 3: Show status in the admin list
```

## What small does not mean

Not "so small it can't stand alone". Each PR should leave the project working and make sense
by itself, and tests should go with the code they test. If a change *must* be big (a big
deletion, a generated file, a rename), say so in the [description](/t/pr-description) so
reviewers know where to focus.
