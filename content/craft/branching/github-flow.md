---
title: "GitHub Flow"
summary: "Branch from main, open a PR, merge back to main."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["GitHub flow", "GitHub workflow", "pull request workflow"]
prereqs: ["feature-branch", "pull-request"]
related: ["feature-branch", "pull-request", "continuous-delivery", "protected-branch", "code-review"]
---

GitHub flow is a simple branching workflow built around pull requests. `main` is always deployable, and everything else happens on short-lived branches.

1. **Branch** from `main` with a descriptive name.
2. **Commit** your changes, and push the branch regularly.
3. **Open a [pull request](/t/pull-request)**, early if you want feedback.
4. **Discuss and review.** Add commits in response to comments.
5. **Run checks** (tests, linting) automatically in CI.
6. **Merge** into `main` once approved and green.
7. **Deploy** (often automatically) and delete the branch.

```
main:    ──●────────────●────────────●──
              \        /  \         /
feature:       ●──●──●     ●──●──●
               (PR #41)    (PR #42)
```

## Why teams like it

- **Easy to learn**: one long-lived branch, one rule.
- **Fits continuous delivery.** Because `main` is deployable, you can release often ([continuous delivery](/t/continuous-delivery)).
- **Review is built in.**
- Works well for web applications and teams that deploy continuously.

## What it requires

- **A trustworthy `main`**: CI must catch breakage, and failing changes must not merge. Use [protected branches](/t/protected-branch).
- **Small pull requests** that can be reviewed and merged quickly ([small PRs](/t/small-prs)).
- **Fast, reliable tests.**
- Safe ways to ship unfinished work, such as [feature flags](/t/feature-flags).

## Compared with others

Heavier models (Git Flow, with `develop`, `release` and `hotfix` branches) suit software with scheduled, versioned releases. GitHub flow suits software that ships continuously. If you ship versioned packages or mobile apps, you may need release branches too ([hotfixes](/t/hotfix)).

Follow whatever your team uses, and understand why.
