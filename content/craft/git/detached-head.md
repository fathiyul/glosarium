---
title: "Detached HEAD"
summary: "Checking out a commit directly instead of a branch."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["detached HEAD state", "HEAD detached"]
prereqs: ["head", "branch"]
related: ["head", "branch", "git-reflog", "git-reset", "commit"]
---

Normally `HEAD` points at a branch, and the branch points at a commit, so new commits move the branch forward. In a **detached HEAD** state, `HEAD` points directly at a commit, with no branch.

```sh
git checkout 3f9c2a1        # or: git checkout v1.2.0, or git switch --detach 3f9c2a1
# You are in 'detached HEAD' state ...
```

You get there by checking out a commit, a tag or a remote branch directly. It's a perfectly good way to look around, build an old version or test something.

## The danger

Commits you make while detached belong to no branch. Switch away, and they become unreachable, and eventually Git cleans them up.

```sh
git checkout 3f9c2a1
# ...edit, commit...
git switch main             # the new commit is now not on any branch
```

## Keeping your work

If you made commits you want, **give them a branch**:

```sh
git switch -c rescue-branch          # while still detached: the branch starts here
```

If you already left, find the commit in the [reflog](/t/git-reflog) and branch from it:

```sh
git reflog                           # find the hash
git branch rescue-branch 9c4e1d7
```

## Getting out

- Just looking? `git switch main` (or any branch) and carry on.
- Want to keep the commits? Create a branch first, as above.

## Why it happens by accident

Checking out a remote branch by its full name (`git checkout origin/feature`), or a tag, detaches you. Use `git switch feature` (which creates a local branch tracking it) if you intend to work on it.

`git status` always tells you: "HEAD detached at …". See [HEAD](/t/head) and [branches](/t/branch).
