---
title: "Rewriting Shared History"
summary: "Why rebasing or force-pushing shared branches breaks teammates."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["rewrite history", "history rewriting"]
prereqs: ["rebase"]
related: ["force-push", "rebase", "git-reflog", "cherry-pick", "removing-secrets-from-history"]
---

Rewriting history means changing commits that already exist: rebasing, amending, squashing, or removing a file from every commit. Git doesn't edit commits in place. It creates new commits with new hashes. Your local branch then differs from the copy others already have, which is the root of the trouble when the branch is shared.

```sh
git rebase -i HEAD~3          # rewrite the last three commits locally
git push --force-with-lease   # push the rewritten branch, only if no one pushed in the meantime
```

Rewriting a branch only you use is normal, and it keeps history tidy. Rewriting a shared branch, such as `main`, makes everyone else's copy disagree with the remote. Their next pull can create tangled merges, and work built on the old commits can end up duplicated or lost.

The trade-off is a clean history against disruption. Rewriting produces a readable log, but it costs the people who depend on the old one. `--force-with-lease` is safer than a plain `--force`, because it refuses to overwrite commits you haven't seen.

The classic mistake is rewriting `main` or another shared branch to fix a small mistake. The safer fix is a new commit, or a [revert](/t/git-revert) that undoes the change without touching history. Save the old state first if you must rewrite, since the [reflog](/t/git-reflog) can help you recover. For the force-push details, see [force push](/t/force-push).
