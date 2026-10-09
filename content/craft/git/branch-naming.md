---
title: "Branch Naming Conventions"
summary: "Names like feat/login-page that tell people what a branch is for."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["branch naming convention", "branch names"]
prereqs: ["branch"]
related: ["branch", "conventional-commits", "pull-request", "ticket", "git"]
---

A branch name should tell a teammate what the branch is for, at a glance. Most teams settle on a short pattern.

```
feat/login-page
fix/checkout-timeout
chore/upgrade-node-20
docs/api-readme
PROJ-482-reset-password-email
```

Common ingredients:

- **A type prefix** that matches your commit types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test` ([conventional commits](/t/conventional-commits)).
- **A ticket ID**, so the branch links back to the work: `fix/PROJ-482-timeout` ([tickets](/t/ticket)).
- **A few words of description** in lowercase, separated by hyphens.

## Practical rules

- **Keep it short** but meaningful. `fix/stuff` and `my-branch` tell nobody anything.
- **Use hyphens, not spaces.** Avoid characters that confuse shells and URLs (spaces, `~`, `^`, `:`, `?`).
- **Lowercase** avoids problems on case-insensitive filesystems.
- **Use `/` to group** (`feat/…`), which many tools show as folders.
- **One purpose per branch.** If the name needs "and", it's probably two branches ([small PRs](/t/small-prs)).
- **Don't reuse names** of merged branches for new work.
- **Follow the team's convention.** Some CI systems and bots parse branch names to decide what to run, so consistency matters ([following conventions](/t/following-conventions)).

## Special branches

Teams often protect `main` (or `master`) and may have `develop`, `release/1.4` or `hotfix/…` with their own rules. Know which are long-lived, and don't push work directly to them.

Delete your branch after it's merged. See [branches](/t/branch).
