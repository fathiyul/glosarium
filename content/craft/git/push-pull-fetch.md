---
title: "Push, Pull, Fetch"
summary: "Sending commits, downloading and merging, or only downloading."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["git push", "git pull", "git fetch"]
prereqs: ["remote", "commit"]
related: ["remote", "branch", "git-clone", "merge", "rebase", "force-push"]
---

Three commands move commits between your repository and a [remote](/t/remote) (usually `origin` on GitHub or GitLab).

| Command | Direction | What it does |
|---|---|---|
| `git push` | local → remote | uploads your commits |
| `git fetch` | remote → local | downloads new commits, without changing your files or branches |
| `git pull` | remote → local | `fetch`, then merges (or rebases) into your current branch |

```sh
git push origin feature/login        # share my commits
git push -u origin feature/login     # first push: also remember the upstream
git fetch                            # see what's new
git pull                             # update my branch
```

## Fetch is the safe one

`git fetch` updates your view of the remote (`origin/main`) and touches nothing else. You can inspect before integrating:

```sh
git fetch
git log main..origin/main            # what's coming
git diff main origin/main
git merge origin/main                # then decide
```

`git pull` does the fetch and the merge in one go, which is convenient and sometimes surprising.

## Common problems

- **Push rejected ("non-fast-forward")**: the remote has commits you don't. Pull (or fetch and rebase) first, then push. Don't reach for a [force push](/t/force-push).
- **Pull creates merge commits.** Use `git pull --rebase`, or set `pull.rebase true`, to replay your commits on top instead ([merge vs rebase](/t/merge-vs-rebase)).
- **Conflicts on pull**: resolve them like any [merge conflict](/t/merge-conflict).
- **"No upstream branch"**: use `git push -u origin <branch>` once.
- **Uncommitted changes** can block a pull. Commit or stash them.

## Habits

Pull before you start work and before you push, and push often, so work isn't only on your laptop.
