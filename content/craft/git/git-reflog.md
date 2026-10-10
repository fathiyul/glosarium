---
title: "Reflog"
summary: "Git's log of where HEAD has been; your undo history after disasters."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["git reflog", "reference log"]
prereqs: ["commit"]
related: ["rewriting-history", "cherry-pick", "git-hooks"]
---

The reflog is Git's record of where HEAD and branch tips have pointed recently. Every commit, checkout, reset, rebase and merge adds an entry. It's stored only in your local clone, and it's the way back when you've moved a branch somewhere you didn't mean to.

Here a hard reset threw away two commits, and the reflog finds them again:

```sh
git reset --hard HEAD~2      # oops: the last two commits are no longer on the branch
git reflog -3                # shows where HEAD was, newest first
git reset --hard 'HEAD@{1}'  # move back to the position before the reset
```

Commits that are no longer reachable from any branch can still be recovered through the reflog until Git's garbage collection removes them. How long that takes depends on your configuration.

The trade-off is that the reflog is local and temporary. It doesn't travel with a clone, and a fresh clone starts with an empty reflog. Old entries expire, so recovering something weeks later may not work.

The classic mistake is assuming a lost commit is gone after `reset --hard` or a bad rebase, and panicking or re-doing the work. Check `git reflog` first, and recover from there. The reflog is also what lets you undo a [rebase](/t/rewriting-history) that went wrong, so keep it in mind before you run destructive commands.
