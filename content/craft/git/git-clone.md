---
title: "Clone"
summary: "Copying a remote repository, with its full history, to your machine."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["git clone", "clone a repository", "cloning"]
prereqs: ["git", "repository"]
related: ["remote", "push-pull-fetch", "fork", "branch", "repository"]
core: [backend, frontend, data-engineer]
---

`git clone` copies a repository from somewhere else (usually GitHub or GitLab) onto your
machine, **with its full history**, and sets it up so you can keep in sync.

```sh
git clone https://github.com/example/project.git
git clone git@github.com:example/project.git my-folder   # SSH URL, custom folder name
```

It does several things at once:

1. Creates a folder and downloads every commit and branch.
2. Names the original location **`origin`** (see [remote](/t/remote)).
3. Checks out the repository's default branch so you can start working.

## HTTPS or SSH?

| URL form | Authentication |
|---|---|
| `https://...` | Username plus a token (or credential helper) |
| `git@...:...` (SSH) | An SSH key you've registered with the host |

Either works. SSH avoids typing credentials once the key is set up.

## Useful options

```sh
git clone --depth 1 <url>        # only the latest commit: fast for huge repos or CI
git clone --branch dev <url>     # check out a specific branch
```

A `--depth 1` clone is fine for building but not for browsing history, because the
older commits aren't there.

## Clone vs fork vs download

- **Clone**: your local copy of a repo. You can push back only if you have permission.
- **[Fork](/t/fork)**: your *own copy on the server*, for contributing to projects you can't
  push to. You then clone your fork.
- **Download ZIP**: just the files, no history, no Git connection.

After cloning, `git pull` brings in new changes later (see
[push, pull and fetch](/t/push-pull-fetch)).
