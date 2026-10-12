---
title: "Remote"
summary: "Another copy of the repository, usually \"origin\" on GitHub or GitLab."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["git remote", "origin", "upstream"]
prereqs: ["repository"]
related: ["git-clone", "push-pull-fetch", "fork", "branch", "repository"]
---

A remote is another copy of your repository, usually hosted on a server such as GitHub or GitLab. Git remembers it under a short name. The one created when you clone is called `origin`.

```sh
git remote -v
# origin  git@github.com:acme/shop.git (fetch)
# origin  git@github.com:acme/shop.git (push)

git remote add upstream git@github.com:original/shop.git   # add a second one
git remote set-url origin git@github.com:acme/new-name.git  # change the address
git remote remove upstream
```

A remote is just a name for a URL, so you can have several. Typical uses:

- **`origin`**: where you cloned from, and where you push.
- **`upstream`**: the original project, when you work from a [fork](/t/fork).

## Remote-tracking branches

For each remote branch, Git keeps a read-only local bookmark, like `origin/main`. It shows where that branch was the last time you fetched. It doesn't update by itself. `git fetch` refreshes it ([push, pull, fetch](/t/push-pull-fetch)).

```sh
git log main..origin/main      # commits on the remote that I don't have yet
```

A local branch can be set to track a remote one, so a plain `git pull` and `git push` know where to go.

## Notes

- **The remote isn't magic.** Everything in Git works offline. Remotes are for sharing.
- **HTTPS vs SSH URLs**: both reach the same repository, with different authentication.
- **Don't put passwords or tokens in the URL**, since they end up in config files and logs ([secrets in Git](/t/secrets-in-git)).
- Pushing needs permission on the remote. Without it, [fork](/t/fork) the project.
