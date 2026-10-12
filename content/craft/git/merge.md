---
title: "Merge"
summary: "Combining the histories of two branches."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["git merge", "merge commit", "merging branches"]
prereqs: ["branch", "commit"]
related: ["merge-vs-rebase", "merge-conflict", "fast-forward-merge", "rebase", "pull-request", "squash"]
---

Merging combines the work from one branch into another. You switch to the branch that should receive the changes and merge the other one in.

```sh
git switch main
git merge feature/login
```

## What Git does

- **Fast-forward**: if `main` hasn't moved since you branched, Git just slides `main` forward to your latest commit. No new commit is made ([fast-forward merge](/t/fast-forward-merge)).

```
Before:  A ─ B (main)            After:  A ─ B ─ C ─ D (main, feature)
                \ C ─ D (feature)
```

- **True merge**: if both branches have new commits, Git creates a **merge commit** with two parents, tying the histories together.

```
A ─ B ─ E ─────── M (main)
     \           /
      C ─── D ───  (feature)
```

## When changes overlap

If both sides changed the same lines, Git stops and asks you to resolve the [merge conflict](/t/merge-conflict), then finish with a commit. `git merge --abort` returns to how things were.

## In practice

Merges usually happen when a [pull request](/t/pull-request) is accepted, and the host offers different styles: a merge commit, a [squash](/t/squash) into one commit, or a rebase ([merge strategies](/t/merge-strategies)).

To bring the latest `main` into your feature branch while you work, you can merge `main` in, or [rebase](/t/rebase) onto it ([merge vs rebase](/t/merge-vs-rebase)).

## Tips

- **Commit or stash first**, so your uncommitted work isn't mixed into a conflict.
- **Pull before merging** so you merge the latest `main`.
- **Test after merging**, since clean merges can still produce code that doesn't work together.
- Merging doesn't delete the branch. Remove it afterwards if it's done.
