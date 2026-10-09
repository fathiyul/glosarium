---
title: "Repository"
summary: "A project's files plus their complete history."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["repo", "git repository", "code repository"]
prereqs: ["git"]
related: ["git-clone", "commit", "branch", "remote", "gitignore", "monorepo-vs-polyrepo"]
---

A repository (repo) is a project's files together with their complete history of changes. In Git, it's a folder with a hidden `.git` directory that stores every [commit](/t/commit), [branch](/t/branch) and tag.

```sh
git init                                   # make a new, empty repository here
git clone https://github.com/acme/shop.git # copy an existing one, history included
```

```
my-project/
  .git/          ← the history and settings (don't edit by hand)
  src/
  README.md      ← the working directory: the files you see and edit
```

## Local and remote

Every clone is a full repository, with all the history, so you can commit and browse the log offline. The copy on GitHub or GitLab is just another repository that the team agrees to share through ([remotes](/t/remote)).

## What belongs in one

- Source code, tests, documentation and build configuration.
- A `README` explaining the project ([README](/t/readme)).
- A [.gitignore](/t/gitignore) for files that shouldn't be tracked.
- A lockfile for dependencies ([lockfile](/t/lockfile)).

Not in it: secrets, build output, `node_modules`, large binary files (unless you use LFS), and personal editor settings.

## Organizing many projects

- **One repository per project or service** (polyrepo).
- **One repository for many projects** (monorepo).

Both work. See [monorepo vs polyrepo](/t/monorepo-vs-polyrepo).

## Habits

- Keep repositories **focused** and named clearly.
- **Protect the main branch** and require reviews on shared repositories.
- **Don't commit secrets**: history is forever.
- Large repositories can be slow to clone. A shallow clone (`--depth 1`) helps in automation ([git clone](/t/git-clone)).
- "Repository" can also mean a package registry, or the data-access layer in some architectures. Here it means a Git repo.
