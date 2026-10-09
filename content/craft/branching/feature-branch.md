---
title: "Feature Branch"
summary: "A short-lived branch for one change."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["feature branches", "topic branch", "short-lived branch"]
prereqs: ["branch"]
related: ["branch", "github-flow", "pull-request", "branch-naming", "merge-conflict", "small-prs"]
---

A feature branch is a short-lived branch created to do one piece of work, such as a feature, a fix or an experiment, separate from the main line. When it's done and reviewed, it's merged back and deleted.

```sh
git switch main
git pull
git switch -c feat/export-csv      # start from an up-to-date main
# ...commit as you go...
git push -u origin feat/export-csv
# open a pull request, get review, merge, delete the branch
```

## Why use them

- **Isolation**: unfinished work doesn't break `main` or other people's work.
- **A natural unit for review.** One branch becomes one [pull request](/t/pull-request).
- **Easy to abandon or park**: delete the branch.
- **Parallel work** by several people.

## Keep them short

The longer a branch lives, the further it drifts from `main`, and the more painful merging becomes ([merge conflicts](/t/merge-conflict)). Aim for days, not weeks.

- **Make the change small** ([small PRs](/t/small-prs)), and split big features into pieces that can merge one at a time.
- **Merge or rebase `main` into your branch regularly** to stay current ([merge vs rebase](/t/merge-vs-rebase)).
- **Use feature flags** to merge unfinished work safely, hidden from users, when a feature can't be done in a few days ([feature flags](/t/feature-flags)).

## Habits

- **Name it clearly** ([branch naming](/t/branch-naming)).
- **One purpose per branch.**
- **Delete it after merging.** The commits are safe in `main`.
- **Don't build a branch on top of another unmerged branch** unless you mean to ([stacked PRs](/t/stacked-prs)).

Teams that merge to `main` many times a day sometimes skip long-lived feature branches entirely (trunk-based development). Feature branches are the common middle ground ([GitHub flow](/t/github-flow)).
