---
title: "Log and History"
summary: "Browsing and filtering commit history."
levels: { backend: junior, frontend: junior }
aliases: ["git log", "commit history", "history"]
prereqs: ["commit"]
related: ["git-diff", "git-blame", "git-bisect", "commit-message", "branch"]
core: [backend, frontend]
---

`git log` lists the commits in your history, newest first. It's how you answer "what
happened here, and when?"

```sh
git log                         # full entries (hash, author, date, message)
git log --oneline               # one line per commit
git log --oneline --graph --all # branches drawn as a graph
git log -5                      # last 5 commits
git log -p                      # include the diff of each commit
```

## Filtering

```sh
git log --author="Ana"              # by author
git log --since="2 weeks ago"       # by date
git log --grep="login"              # message contains "login"
git log -- src/auth.py              # commits that touched this file
git log -S"retry_limit"             # commits that added or removed this exact text
git log main..feature               # commits on feature that aren't on main
```

`-S` is useful when you know a piece of code existed and want to find *when* it appeared or
disappeared.

## What to use it for

- **Find when something changed**, then read the commit message for the reason. This is where
  good [commit messages](/t/commit-message) pay off.
- **Review what you're about to push**: `git log origin/main..HEAD`.
- **Find the commit to undo, cherry-pick or compare.** You need its hash.

To see who last changed each line of a file, use [git blame](/t/git-blame). To hunt the
commit that introduced a bug, see [git bisect](/t/git-bisect).

Press `q` to leave the pager when the output is long.
