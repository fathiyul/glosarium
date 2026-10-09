---
title: "Fork"
summary: "Your own copy of someone else's repository, for contributing via pull requests."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["forking", "fork a repository", "GitHub fork"]
prereqs: ["repository", "remote"]
related: ["git-clone", "pull-request", "remote", "branch", "contributing-guide"]
---

A fork is your own copy of someone else's repository, stored on the hosting site under your account. You can change it freely, and then propose your changes back to the original through a pull request.

It exists because you usually can't push to a project you don't own. Forking gives you somewhere you can.

## The usual flow

1. **Fork** the project on GitHub or GitLab (a button).
2. **Clone your fork** to your machine ([git clone](/t/git-clone)).
3. **Add the original as a second remote**, conventionally called `upstream`:

```sh
git clone git@github.com:you/project.git
cd project
git remote add upstream git@github.com:original/project.git
```

4. **Create a branch**, make commits, and push to your fork (`origin`).
5. **Open a [pull request](/t/pull-request)** from your branch to the original repository.
6. **Keep up to date** by pulling from `upstream`:

```sh
git fetch upstream
git switch main
git merge upstream/main        # or rebase
git push origin main
```

## Fork vs branch vs clone

| | What it is |
|---|---|
| **Clone** | A copy of a repository on your computer |
| **Branch** | A line of work inside one repository |
| **Fork** | A separate repository on the host that starts as a copy of another |

Inside a company where everyone has write access, people typically use branches in one repository, not forks. Forks are for open source and for repositories where contributors lack write access.

## Tips

- Read the project's contributing guide first ([contributing guide](/t/contributing-guide)).
- Make small, focused pull requests ([small PRs](/t/small-prs)).
- Don't commit to your fork's `main`. Work on feature branches, so syncing stays easy.
- A fork doesn't update by itself. It drifts until you sync it.
