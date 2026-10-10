---
title: "Release Branch"
summary: "A branch stabilized for shipping a specific version."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["release/* branch", "stabilization branch"]
prereqs: ["branch"]
related: ["git-flow", "cherry-pick", "release-notes", "branching-strategy"]
---

A release branch is a branch cut from the main line when a version is ready to stabilize. Development on `main` can continue, while the release branch receives only the fixes needed to ship safely. A version tag marks the exact commit that was released.

```sh
git checkout -b release/1.4 main        # cut the branch from main
# ...fix bugs on release/1.4...
git tag v1.4.0                          # mark the released commit
```

Keeping the branch narrow is the point. New features stay on `main` and go into a later release, so the release is predictable, and testers can focus on what changed.

The trade-off is that fixes have to travel. Every bug fixed on the release branch must also reach `main`, or the bug comes back in the next release. Supporting several release lines at once multiplies that work, and each line needs its own testing.

The classic mistake is fixing a bug on the release branch and forgetting to bring it back to `main`. The next version then ships with the bug again. Apply the fix to both, using [cherry-pick](/t/cherry-pick) when it's a small change, or merge when the branch is in sync. Record what each release contains in its [release notes](/t/release-notes), so the difference between versions is easy to see.
