---
title: "Amend"
summary: "Changing the most recent commit's content or message."
levels: { backend: junior, frontend: junior }
aliases: ["git commit --amend", "amend commit", "amend last commit"]
prereqs: ["commit"]
related: ["rebase", "force-push", "git-reflog", "commit-message", "rewriting-history"]
core: [backend, frontend]
---

`git commit --amend` replaces your **most recent commit** with a corrected one. Use it for a
typo in the message or a file you forgot to include.

```sh
git commit --amend -m "Fix login redirect"   # change the message

git add forgotten-file.py
git commit --amend --no-edit                  # add the file, keep the message
```

Amending doesn't edit the commit; it creates a **new commit with a new hash** and moves the
branch to it. The old commit is still there for a while (see [reflog](/t/git-reflog)), but
nothing points at it.

## The rule: only amend what you haven't shared

Once a commit is pushed and others may have based work on it, amending it rewrites history
they already have. You can amend a commit that's only on your own branch, but then you
need a force push to update the remote:

```sh
git push --force-with-lease
```

`--force-with-lease` refuses to overwrite commits you haven't seen, which is much safer than
plain `--force`. See [force push](/t/force-push). On a shared branch like `main`, don't amend
at all. Make a new commit that fixes the problem instead.

## When to use it

- Fixing the message of the last commit.
- Adding a forgotten file or a tiny correction.
- Tidying before you open a [pull request](/t/pull-request).

For changing older commits, see [interactive rebase](/t/interactive-rebase). If you amended
something by mistake, the [reflog](/t/git-reflog) can get the old commit back.
