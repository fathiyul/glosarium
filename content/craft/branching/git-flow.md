---
title: "Git Flow"
summary: "A model with develop, feature, release and hotfix branches."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["gitflow", "git-flow model"]
prereqs: ["branching-strategy"]
related: ["branching-strategy", "release-branch", "trunk-based-development", "feature-branch", "cherry-pick"]
---

Git Flow is a branching model described in a widely read post by Vincent Driessen. It uses two long-lived branches, `main` for released code and `develop` for the next release. Work happens on short-lived branches: `feature/*` branches merge into `develop`, `release/*` branches stabilize a version before it's merged into `main`, and `hotfix/*` branches fix production directly and merge back into both.

```
main     -----------o-------------o--------- (tagged releases)
              hotfix/x \           \
develop  --o---o-------o-----------o-------- (integration)
               \      /           /
feature/a       o---o    release/1.4
```

The model is a good fit when releases are planned, several versions are supported at once, and you need a stable release line separate from ongoing development. Git Flow is a convention, not part of Git. Some teams use an extension that automates the steps.

The trade-off is overhead. Keeping two long-lived branches in sync, merging releases into two places, and tracking which version lives where all take attention. Each extra branch is another place for merges to diverge. For a team that deploys to production several times a day, that overhead rarely pays off.

The classic mistake is using Git Flow for continuous delivery. `develop` drifts from `main`, releases wait for long merges, and the model's safety net becomes the bottleneck. If you ship continuously, [trunk-based development](/t/trunk-based-development) is usually simpler. If you need release branches only for some products, use them there, as in the [release branch](/t/release-branch) concept.
