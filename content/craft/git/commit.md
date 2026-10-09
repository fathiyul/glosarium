---
title: "Commit"
summary: "A snapshot of changes with a message explaining them."
levels: { backend: junior, frontend: junior }
aliases: ["git commit", "commits", "commit snapshot"]
prereqs: ["git", "staging-area"]
related: ["commit-message", "atomic-commit", "staging-area", "git-log", "branch", "git-amend"]
core: [backend, frontend]
---

A **commit** is a saved snapshot of your project, with a message saying why you made the
change. Your history is a chain of commits, each pointing to the one before.

```sh
git status                       # what changed?
git add src/login.py             # choose what goes in the next commit
git commit -m "Reject expired reset tokens"
```

Each commit records:

- the state of every tracked file at that moment,
- who made it and when,
- your message,
- a pointer to its parent commit(s),
- a unique ID (a hash like `a1b2c3d`) that identifies it.

Committing is a two-step process on purpose. `git add` moves changes into the
[staging area](/t/staging-area), then `git commit` records exactly what's staged. That lets you commit
only some of your changes.

## Good commit habits

- **Commit small and often.** Each commit should do one thing and leave the project working
  (see [atomic commits](/t/atomic-commit)). Small commits are easy to review, undo and understand.
- **Write a useful message** that explains the *why*: see [commit messages](/t/commit-message).
- **Check what you're committing.** `git diff --staged` shows exactly what will go in. This
  catches debug prints and secrets before they're recorded.
- **Commit only what's yours to commit.** Don't add `.env` files or build output
  (see [.gitignore](/t/gitignore)).

A commit isn't shared until you push it. Until then you can still fix the latest one with
[amend](/t/git-amend).
