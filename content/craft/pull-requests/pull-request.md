---
title: "Pull Request"
summary: "A proposal to merge a branch, with discussion and review."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["PR", "pull requests", "merge request", "MR"]
prereqs: ["branch", "git"]
related: ["code-review", "pr-description", "small-prs", "draft-pr", "merge-strategies", "remote"]
core: [backend, frontend, data-engineer]
---

A **pull request** (PR) is a request to merge your branch into another one, usually `main`.
It's a page on GitHub (GitLab calls it a *merge request*) showing your changes, a place to
discuss them and the gate where checks and reviews happen before code lands.

## The flow

```sh
git switch -c fix-login-redirect
# ...edit, commit...
git push -u origin fix-login-redirect
```

Then open a PR from that branch. The host shows the diff, runs automated checks
(tests, linters) and notifies reviewers.

1. **Open** it, with a clear title and [description](/t/pr-description).
2. **Review**: teammates comment; you answer and push more commits (the PR updates itself).
3. **Approve**: reviewers sign off once checks pass.
4. **Merge**: using the team's [merge strategy](/t/merge-strategies).
5. **Clean up**: delete the branch.

## What makes a good one

- **Small and focused.** One purpose per PR (see [small PRs](/t/small-prs)).
- **Self-reviewed** before you request anyone's time ([self-review](/t/self-review)).
- **Green checks.** Don't ask for review while tests fail, unless you say why.
- **Opened as a [draft](/t/draft-pr)** if it's not ready.

The name comes from the open-source model: you ask the project owner to *pull* your changes
from your fork or branch. The change doesn't have to be code. Docs and config changes use the
same process, and a [code review](/t/code-review) applies to them equally.
