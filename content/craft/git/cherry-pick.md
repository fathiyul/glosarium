---
title: "Cherry-Pick"
summary: "Applying one specific commit onto another branch."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["git cherry-pick"]
prereqs: ["commit"]
related: ["rebase", "fast-forward-merge", "rewriting-history", "branch"]
---

`git cherry-pick` applies the changes from one commit onto your current branch, as a new commit. It's useful when a single fix needs to appear on another branch, such as a bug fix that must go into a release branch without bringing the rest of the feature with it.

```sh
git checkout release-1.2
git cherry-pick 4f2c9a1      # applies that commit's changes here, as a new commit
```

The new commit has a different hash from the original, even though the change is the same. Git records no link between the two, so if the original branch is later merged into this one, the change may appear twice, and merging can produce conflicts.

Cherry-pick applies only the diff of the commit it's given. If that diff depends on earlier commits, it can fail to apply cleanly. When it conflicts, resolve the file, then run `git cherry-pick --continue`, or `git cherry-pick --abort` to back out.

The trade-off is precision against history. Cherry-picking gives exact control over what lands where, but it duplicates work in the history and can leave branches that look different in ways that are hard to track. Merging or [rebasing](/t/rebase) keeps the relationship between branches intact.

The classic mistake is cherry-picking a long series of commits one by one to avoid a merge. The result is hard to follow, and each conflict has to be solved again. If you need most of a branch, merge it. Cherry-pick a handful of commits you deliberately want. For the history-changing side of Git, see [rewriting history](/t/rewriting-history).
