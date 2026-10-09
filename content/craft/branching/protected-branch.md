---
title: "Protected Branch"
summary: "A branch that requires reviews and passing checks before merging."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["branch protection", "protected branches", "branch protection rules"]
prereqs: ["branch", "pull-request"]
related: ["pull-request", "code-review", "continuous-integration", "github-flow", "force-push"]
---

A protected branch is a branch, usually `main`, with rules enforced by the hosting platform so that nobody can change it carelessly. You can't push straight to it. Changes go in through pull requests that meet certain conditions.

Typical rules:

- **Require a pull request** before merging, with no direct pushes.
- **Require approvals** from one or more reviewers ([code review](/t/code-review)).
- **Require status checks to pass**: the tests, linting and build in CI ([continuous integration](/t/continuous-integration)).
- **Require the branch to be up to date** with `main` before merging.
- **Block force pushes and deletion** ([force push](/t/force-push)).
- **Require signed commits**, or a linear history, if the team wants them.
- **Restrict who can merge**, or code owners for specific paths.

You set them in the repository's settings on GitHub, GitLab or similar.

## Why they matter

- **`main` stays healthy.** Broken code can't land unnoticed, so `main` is always safe to deploy ([GitHub flow](/t/github-flow), [continuous delivery](/t/continuous-delivery)).
- **Review is enforced**, not optional.
- **Protection against accidents**: no force-push rewriting shared history, no deleting the branch.
- **Audit trail**: every change is a reviewed pull request.

## Working with them

- If your push is rejected with "protected branch", open a pull request instead.
- **Failing checks block the merge.** Fix the cause. Don't ask for the rule to be bypassed.
- **Admins can often override.** Use that sparingly (a real emergency), and say so in the PR.
- Keep the rules **proportional**. Too many required approvals or slow checks make people look for workarounds.
- Apply the same idea to release branches and tags.

Protection rules are only as good as the checks behind them, so keep the tests reliable.
