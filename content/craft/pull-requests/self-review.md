---
title: "Self-Review"
summary: "Reading your own diff before asking others to."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["reviewing your own PR", "self review"]
prereqs: ["git-diff", "pull-request"]
related: ["code-review", "pr-description", "small-prs", "pull-request", "git-diff"]
core: [backend, frontend, data-engineer]
---

**Self-review** means reading your own change as if someone else wrote it, before you ask
anyone else to. It's the cheapest bug-catching you can do.

Open the pull request (or run `git diff main...HEAD`) and read the full diff, line by line.
Seeing the change in diff form, not in your editor, makes different problems stand out.

## What to look for

- **Leftovers**: debug prints, commented-out code, `TODO`s, stray files, accidental
  formatting changes.
- **Secrets**: keys, passwords, tokens in code or config.
- **Unrelated changes** that belong in a separate PR.
- **Missing pieces**: tests, error handling, docs, a migration.
- **Clarity**: any line you'd have to explain? Add a comment or rename something.
- **Edge cases**: empty input, null values, large inputs, failures.
- **The description**: does it explain *why*, and how to test it?

```sh
git diff --staged        # before committing
git diff main...HEAD     # whole branch vs where it started from main
```

## Add your own comments

If something non-obvious needs context ("moved this function unchanged, only the import
changed"), comment on the PR yourself. It saves the reviewer a question.

## Why it pays

Reviewers' time is limited and shared. Every typo and forgotten `console.log` they catch is
attention not spent on logic and design. Self-review also builds the habit of seeing your
code the way readers do, which makes you a better reviewer too. See
[code review](/t/code-review) and [small PRs](/t/small-prs).
