---
title: "Branch"
summary: "A movable pointer to a line of commits, for isolated work."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior }
aliases: ["git branch", "branches", "feature branch"]
prereqs: ["commit", "repository"]
related: ["head", "merge", "rebase", "branch-naming", "pull-request", "remote"]
core: [backend, frontend, data-engineer]
---

A **branch** is a movable label that points to a commit. As you commit, the label moves
forward with you. That makes it cheap to start a separate line of work without touching
anyone else's.

```
main:     A --- B --- C
                       \
feature:                D --- E
```

`main` still ends at `C`, while `feature` has two extra commits. Nothing on `main` changes
until you [merge](/t/merge) (or [rebase](/t/rebase)).

```sh
git switch -c add-search      # create a branch and move onto it
# ...edit, commit...
git branch                    # list branches; * marks the current one
git switch main               # go back
git branch -d add-search      # delete it once merged
```

Older guides use `git checkout` for switching; it still works.

## Why branches matter

- You can work on a feature or fix without breaking the main line.
- Each branch becomes a [pull request](/t/pull-request) for review.
- Unfinished work stays out of production.

## Habits

- **Branch from an up-to-date main**: `git switch main && git pull`, then create your branch.
- **Keep branches short-lived.** The longer one lives, the more it drifts from `main` and the
  harder the merge. See [merge conflicts](/t/merge-conflict).
- **Give them descriptive names**: see [branch naming](/t/branch-naming).
- **Delete merged branches.** The commits remain in history; only the label goes away.

The name of the default branch (`main`, `master`) is just a convention you can configure.
