---
title: "Rebase"
summary: "Replaying commits on top of another base for a linear history."
levels: { backend: junior, frontend: junior }
aliases: ["git rebase", "rebasing"]
prereqs: ["branch", "commit", "merge"]
related: ["merge-vs-rebase", "interactive-rebase", "merge-conflict", "force-push", "rewriting-history"]
core: [backend, frontend]
---

`git rebase` takes the commits on your branch and **replays them on top of a different
starting point**, usually the latest `main`. The result is a straight line of history.

```
Before:        A --- B --- C          (main)
                      \
                       D --- E        (feature)

After rebase:  A --- B --- C          (main)
                            \
                             D' --- E'   (feature)
```

```sh
git switch feature
git rebase main
```

`D'` and `E'` have the same changes as `D` and `E`, but they're **new commits with new
hashes**, because their parent changed. That's why rebase counts as rewriting history.

## Handling conflicts

Git replays commits one at a time, so you might resolve a conflict per commit:

```sh
# fix the files, then
git add <files>
git rebase --continue
# or give up and return to how things were:
git rebase --abort
```

## The golden rule

**Don't rebase commits other people already have.** If you rebase a shared branch, their
history and yours no longer match and they have to untangle it. Rebase your own, unshared
work; after rebasing a branch you've already pushed, update it with `git push --force-with-lease`
(see [force push](/t/force-push)).

## Rebase or merge?

Rebase gives a cleaner, linear history. [Merge](/t/merge) keeps the true history and never
rewrites anything. Many teams rebase their feature branch onto `main` before merging, then
merge normally. For the trade-offs see [merge vs rebase](/t/merge-vs-rebase).

`git rebase -i` lets you reorder, edit or squash commits (see [interactive rebase](/t/interactive-rebase)).
