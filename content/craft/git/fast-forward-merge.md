---
title: "Fast-Forward vs Merge Commit"
summary: "Moving a branch pointer ahead vs recording a merge commit."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["fast-forward", "no-ff merge", "merge commit"]
prereqs: ["branch"]
related: ["branch", "rebase", "cherry-pick", "rewriting-history"]
---

When you merge branch B into branch A, Git can do one of two things. If A hasn't changed since B split off, it can simply move A's pointer forward to B's latest commit. That's a fast-forward, and it adds no commit of its own. If A has new commits of its own, Git has to combine the two lines, and it records a merge commit with two parents.

```sh
git checkout main
git merge --ff-only feature   # succeeds only if main can fast-forward to feature
git merge --no-ff feature     # always creates a merge commit, even when it could fast-forward
```

The fast-forward moves `main` straight to the feature commit, while `--no-ff` adds a merge commit with two parents.

The trade-off is between a straight line of history and a record of when work was combined. A fast-forward keeps history linear and easy to read with `git log`. A merge commit shows where a feature branch joined, which helps when you want to see or revert a whole feature at once. Neither changes the content of the code, only the shape of the history.

The classic mistake is making fast-forward the goal for every merge. If `main` has moved on, a fast-forward isn't possible, so the merge creates a commit anyway. Or you might rebase a feature onto `main` to make the merge a fast-forward, which rewrites the branch's commits. If the branch is shared, that rewrite causes problems, as described in [rewriting history](/t/rewriting-history). Pick one convention for the team and apply it consistently.
