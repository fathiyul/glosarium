---
title: "Atomic Commit"
summary: "One commit doing one logical thing, easy to review and revert."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["atomic commits", "small commits", "one logical change per commit"]
prereqs: ["commit", "commit-message"]
related: ["commit-message", "git-bisect", "interactive-rebase", "small-prs", "git-revert"]
---

An atomic commit contains one logical change, completely, and nothing else. It's the smallest piece of work that makes sense on its own, leaves the project in a working state, and can be described in one sentence.

```
Good history:
  Add email validation to signup form
  Fix off-by-one in pagination
  Rename UserService to AccountService

Hard-to-use history:
  Updates                      (a feature, two bug fixes and some reformatting)
```

## Why it matters

- **Easy to review.** Reviewers can understand one idea at a time ([code review](/t/code-review)).
- **Easy to revert.** `git revert` undoes one change without taking unrelated work with it ([git revert](/t/git-revert)).
- **Easy to find bugs.** [`git bisect`](/t/git-bisect) points at one small commit, instead of a huge mixed one.
- **A readable story**, with messages that can be specific ([commit messages](/t/commit-message)).
- **Easier cherry-picking** of one fix onto another branch.

## How to do it

- **Commit as you finish each small step**, not at the end of the day.
- **Stage selectively.** `git add -p` lets you pick individual hunks from a file, so a feature change and a formatting fix can go in separate commits.
- **Keep unrelated cleanups separate**, such as renames, formatting and refactors.
- **Make each commit build and pass tests**, if you can, so bisecting works.
- **Tidy before sharing.** Use [interactive rebase](/t/interactive-rebase) to split, combine and reword commits on your own branch.

## Balance

Atomic doesn't mean tiny. A change that needs five files to work belongs in one commit. A pull request is usually several atomic commits ([small PRs](/t/small-prs)).

Test: can you write a commit message without using "and" to join two unrelated things?
