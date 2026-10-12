---
title: "Version Control"
summary: "Tracking every change to code so you can review, revert and collaborate."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["VCS", "source control", "revision control", "SCM"]
prereqs: ["commit"]
related: ["git", "repository", "commit", "branch", "pull-request", "merge"]
---

Version control is a system that records every change to your files over time, so you can see what changed, who changed it and why, compare versions, and go back to any earlier state. It's the foundation of teamwork on code.

Without it, you end up with `report_final_v2_REAL.docx`, overwritten work and no history.

## What it gives you

- **History**: every change with an author, a date and a message ([commit](/t/commit), [git log](/t/git-log)).
- **Undo**: restore an old version, or revert a bad change ([git revert](/t/git-revert)).
- **Collaboration**: many people work at once on separate [branches](/t/branch), then combine their work ([merge](/t/merge)).
- **Review**: changes are proposed and discussed before they land ([pull requests](/t/pull-request)).
- **Experiments**: try an idea on a branch with no risk to the working version.
- **Traceability**: find when a bug appeared ([git bisect](/t/git-bisect), [git blame](/t/git-blame)).
- **Backup and sharing**: copies live in more than one place ([remotes](/t/remote)).

## Two models

| | Centralized (SVN, older tools) | Distributed (Git, Mercurial) |
|---|---|---|
| Where the history lives | on one server | in every clone |
| Offline work | limited | full: commit, branch and browse offline |
| Branching | heavier | cheap and routine |

Git is by far the most common today ([Git](/t/git)).

## What belongs under it

Source code, tests, configuration, documentation, build scripts, infrastructure definitions ([infrastructure as code](/t/infrastructure-as-code)), and database migrations. Not secrets ([secrets in Git](/t/secrets-in-git)), build output or large generated files.

## Good habits

- Commit often, with clear messages ([commit messages](/t/commit-message)).
- Use branches and pull requests for shared code.
- Treat history as valuable. Don't rewrite shared branches.

Version control isn't only for code. Writers, designers and data teams use it too.
