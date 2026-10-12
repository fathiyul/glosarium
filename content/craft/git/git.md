---
title: "Git"
summary: "The distributed version control system almost everyone uses."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["version control system", "git vcs", "DVCS"]
related: ["version-control", "repository", "commit", "branch", "remote", "gitignore"]
core: [backend, frontend, data-engineer]
---

Git is a tool that records the history of your files. Every saved snapshot is a
[commit](/t/commit), so you can see what changed, who changed it and when, and go back to any
earlier state. It also lets many people work on the same code at once.

It's **distributed**: every clone has the full history, so you can commit, browse history and
create branches offline. A shared server (GitHub, GitLab) is just one more copy that the team
agrees to treat as the central one. **Git is not GitHub**: Git is the tool; GitHub is a website
that hosts Git repositories and adds pull requests and issues.

## The everyday cycle

```sh
git clone <url>                  # get a copy
git switch -c fix-login          # start a branch
# ...edit files...
git status                       # see what changed
git add login.py                 # stage it
git commit -m "Fix login redirect"
git push -u origin fix-login     # share it, then open a pull request
git pull                         # bring in others' changes
```

## Key ideas

| Idea | Meaning |
|---|---|
| [Repository](/t/repository) | The project and its full history |
| [Commit](/t/commit) | A saved snapshot with a message |
| [Branch](/t/branch) | A separate line of work |
| [Staging area](/t/staging-area) | Where you choose what goes in the next commit |
| [Remote](/t/remote) | Another copy of the repo, such as `origin` on GitHub |

## Getting unstuck

Most Git fear comes from not knowing where you are. Run `git status` often, since it tells you
the current branch, what's changed and usually what to do next. A committed change can almost
always be recovered (see [reflog](/t/git-reflog)). Uncommitted work is the thing that can be lost,
so commit early.
