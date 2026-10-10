---
title: "Branching Strategy"
summary: "The team's rules for how branches are created and merged."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["branch model", "git workflow"]
prereqs: ["branch"]
related: ["trunk-based-development", "git-flow", "feature-branch", "long-lived-branch", "protected-branch"]
---

A branching strategy is the set of rules a team follows for creating, naming, merging and retiring branches. It answers practical questions: where do new changes start, how long may a branch live, what gets merged into `main`, and how releases are cut from it.

Most strategies sit on a spectrum. At one end, everyone commits small changes to `main` and uses flags to hide unfinished work, as in [trunk-based development](/t/trunk-based-development). At the other, there are several long-lived branches for development, release and hotfixes, as in [Git Flow](/t/git-flow). Many teams land somewhere between, using short-lived [feature branches](/t/feature-branch) and a protected `main`.

The right choice depends on how often you ship, how many versions you must support, and how reliable your automated tests are. A team that deploys every day has little use for a release branch. A product that ships a new version once a quarter, and supports older versions for customers, may need one.

The trade-off is simplicity against control. Fewer branches are easier to understand but give less room to stabilize a release. More branches give control and add merging work.

The classic mistake is copying a strategy from another team or a blog post without asking whether your release cadence and tests match its assumptions. Write down the rules your team actually follows, keep them short, and change them when the reasons change. A [long-lived branch](/t/long-lived-branch) is often a sign the rules need updating.
