---
title: "Merge vs Rebase"
summary: "Preserving history as it happened vs rewriting it to be linear."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["merge vs rebase", "rebase vs merge", "git merge or rebase", "linear history vs merge commits"]
prereqs: ["merge", "rebase"]
related: ["fast-forward-merge", "merge-strategies", "squash", "interactive-rebase", "force-push", "rewriting-history"]
core: [backend, frontend]
---

Two ways to bring one branch's changes into another. They end up with the same code, and a different **history**.

```
Start:        A ─ B ─ C         (main)
                   \
                    D ─ E       (feature)

Merge:        A ─ B ─ C ───── M        (M = a merge commit joining both lines)
                   \         /
                    D ─── E

Rebase:       A ─ B ─ C ─ D' ─ E'      (your commits replayed on top of C, straight line)
```

| | Merge | Rebase |
|---|---|---|
| History | **Preserved as it happened**, with branches and merge commits | **Rewritten** into a straight line |
| Commits | Unchanged (same hashes) | New commits with new hashes |
| Conflicts | Resolved **once**, in the merge commit | Possibly **repeatedly**, once per replayed commit |
| Safety | Safe on shared branches | Dangerous on commits others already have |
| Log readability | Can become a tangle of merge commits | Clean and linear |
| Tracing "when did this land" | Easy: the merge commit shows it | Harder |

```sh
git switch feature && git rebase main     # update your branch with the latest main
git switch main && git merge feature      # then integrate it
```

## A common team workflow

1. **Rebase your own feature branch onto `main`** while you work, to stay up to date and keep a clean history (or `git pull --rebase`).
2. **Merge it into `main`** when approved: either a merge commit, a fast-forward ([fast-forward merge](/t/fast-forward-merge)) or a
   [squash](/t/squash) into one commit (see [merge strategies](/t/merge-strategies)).

## The golden rule

**Never rebase commits that exist on a shared branch** that other people have based work on. Rebasing replaces those commits, and their history diverges from yours.
It's fine on your own unshared branch (then `git push --force-with-lease`, see [force push](/t/force-push)).

## Choosing

There's no universal answer. It's a **team policy**: some value an accurate history (merge), some prefer a linear one (rebase or squash). Follow your team's convention
([following conventions](/t/following-conventions)). What matters is consistency, and understanding what each does so a confusing history doesn't scare you. Details of
the rewriting tools: [rebase](/t/rebase), [interactive rebase](/t/interactive-rebase).
