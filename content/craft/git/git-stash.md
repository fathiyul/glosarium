---
title: "Stash"
summary: "Temporarily shelving uncommitted changes."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["git stash", "stash changes", "shelve changes"]
prereqs: ["staging-area", "branch"]
related: ["branch", "git-reset", "staging-area", "merge-conflict", "commit"]
---

`git stash` temporarily shelves your uncommitted changes, giving you a clean working directory, so you can switch branches or pull without committing half-finished work.

```sh
git stash                    # save tracked changes and clean the directory
git stash push -m "login wip"   # same, with a label
git stash -u                 # also stash new (untracked) files
git stash list               # see the stack of stashes
git stash pop                # re-apply the latest and remove it from the list
git stash apply stash@{1}    # re-apply a specific one and keep it
git stash drop stash@{0}     # delete one
```

## A typical use

You're in the middle of a feature when an urgent bug arrives:

```sh
git stash                    # shelve the half-done work
git switch main
git switch -c hotfix/crash
# fix, commit, push
git switch feature/login
git stash pop                # carry on where you left off
```

## What it does and doesn't save

- Saves changes to **tracked files**, both staged and unstaged.
- **Untracked files** are left alone unless you use `-u`.
- **Ignored files** are skipped unless you use `-a`.

## Cautions

- **Stashes are easy to forget.** They pile up, and are tied to no branch. Check `git stash list`, and prefer a real commit or a WIP branch for anything you'll keep for more than a short time.
- **Popping can conflict** if the code changed meanwhile. Resolve it like a [merge conflict](/t/merge-conflict). The stash stays in the list until the pop succeeds.
- **Pop on the right branch.** It applies to wherever you are.
- A dropped stash can be recovered with some effort (`git fsck`), but don't count on it.

A commit on a temporary branch is often a safer shelf than a stash.
