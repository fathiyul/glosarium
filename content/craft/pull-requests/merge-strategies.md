---
title: "Merge Commit vs Squash vs Rebase Merge"
summary: "How a PR lands on main and what history it leaves behind."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["squash merge", "rebase merge", "merge commit"]
prereqs: ["fast-forward-merge"]
related: ["fast-forward-merge", "rewriting-history", "git-flow", "branching-strategy"]
---

When a pull request lands on `main`, there are three common ways to do it, and each leaves a different history behind.

A **merge commit** keeps every commit from the branch and adds one commit with two parents, so the branch's shape stays visible. A **squash merge** combines the branch's changes into a single new commit on `main`, and the branch's individual commits disappear from that line. A **rebase merge** replays the branch's commits onto `main` one by one, so they appear linear but with new hashes.

```sh
git merge --squash feature   # stage all the branch's changes as one set
git commit -m "Add saved cards (#412)"
```

The trade-off is history detail against readability. A merge commit preserves the context of each step and the branch's history. A squash gives one clean commit per feature, which is easy to revert and to read, but it hides the reasoning of intermediate steps. A rebase merge keeps a straight line without the merge commit, at the cost of rewriting the branch's commits.

The classic mistake is mixing styles without noticing. Some commits are squashed, some merged, and history becomes hard to follow. Pick one for the team and configure the hosting service to match. Also remember that a rebase merge rewrites commits, so it's safest on branches nobody else has built on, as covered in [rewriting history](/t/rewriting-history). For the mechanics of fast-forwards and merge commits, see [fast-forward vs merge](/t/fast-forward-merge).
