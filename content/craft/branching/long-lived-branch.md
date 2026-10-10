---
title: "Long-Lived Branch"
summary: "A branch kept for weeks, and the painful merges that follow."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["long-running branch", "integration branch"]
prereqs: ["branch"]
related: ["trunk-based-development", "branching-strategy", "merge-strategies", "feature-flags"]
---

A long-lived branch is one that stays open for weeks or months while `main` keeps moving. The longer it lives, the more it drifts, and the harder it becomes to merge back. Each day it stays apart, `main` picks up changes the branch doesn't have, and the branch picks up changes `main` doesn't have.

```sh
git log --oneline main..feature/big-rewrite    # commits only on the branch
git log --oneline feature/big-rewrite..main    # commits the branch doesn't have yet
```

Those two counts grow over time. A branch with a hundred commits to bring in and a hundred to replay tends to conflict in the same files again and again.

The usual fix is to bring the branch up to date often, by merging or rebasing `main` into it, so conflicts stay small. Feature flags let the work reach `main` in pieces, with unfinished parts turned off. That's the central idea of [trunk-based development](/t/trunk-based-development).

The trade-off is that some work is genuinely large and hard to split. A rewrite may not be safe to ship in small steps, and a flag can't always hide it. In that case, keep the branch, but sync it with `main` on a fixed schedule, and plan the merge with the people touching the same code.

The classic mistake is treating a long-lived branch as a safe place to delay integration. The merge doesn't get easier with time, only larger. Break the work into smaller changes that can merge sooner, and choose a [merge strategy](/t/merge-strategies) deliberately when the time comes.
