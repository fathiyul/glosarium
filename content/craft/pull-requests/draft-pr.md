---
title: "Draft PR"
summary: "A PR opened early for feedback, not yet ready to merge."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["draft pull request", "WIP PR", "work in progress PR"]
prereqs: ["pull-request"]
related: ["pull-request", "code-review", "small-prs", "pr-description", "continuous-integration"]
---

A draft pull request is a pull request you open early, marked as not ready for merging. It signals "work in progress, feedback welcome, but don't review in depth yet."

On GitHub and GitLab, you choose "Create draft pull request". It can't be merged until you mark it ready, and reviewers aren't automatically requested.

## Why open one early

- **Get early feedback on direction**, before you've built the wrong thing. A comment on day one is cheaper than a rewrite on day five.
- **Show progress**, so teammates know what you're doing and don't duplicate it.
- **Run CI** on your branch while you work, to catch problems early ([continuous integration](/t/continuous-integration)).
- **Discuss the design** in the description or comments.
- **Back up and share** work in progress.

## How to use it well

- **Say what you want**: "Draft: not ready for review. Could someone check the approach to caching?"
- **Write a short description** of the goal and what's still missing ([PR description](/t/pr-description)).
- **Keep it focused.** A draft that keeps growing becomes the kind of large PR nobody wants to review ([small PRs](/t/small-prs)).
- **Mark it ready** when the tests pass, you've read your own diff ([self-review](/t/self-review)), and the description is complete. Then request reviewers.
- **Don't ask for line-by-line review** of unfinished code.

## Notes

- Drafts still notify watchers on some platforms, so word your title clearly. Some teams use `WIP:` or `[Draft]` prefixes, but the built-in draft state is clearer.
- Teams may skip CI or notifications for drafts, to save resources.
- If a draft goes quiet for weeks, close it or update it.
