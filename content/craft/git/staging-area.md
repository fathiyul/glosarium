---
title: "Staging Area"
summary: "Where you choose which changes go into the next commit."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["index", "git index", "stage", "git add"]
prereqs: ["commit"]
related: ["commit", "git-diff", "git-stash", "git-reset", "atomic-commit"]
---

The staging area (also called the index) is where you assemble the next commit. Git doesn't commit everything you changed. It commits what you've staged.

```
working directory  ──git add──►  staging area  ──git commit──►  repository (history)
 (your files)                  (the next commit)
```

```sh
git status                  # what changed, and what's staged
git add src/login.py        # stage this file
git add -p                  # stage selected parts of files, interactively
git diff                    # unstaged changes
git diff --staged           # what's staged: what the next commit will contain
git restore --staged file   # unstage (keeps the changes in the file)
git commit -m "Fix login redirect"
```

## Why the extra step

It lets you choose what goes into each commit. If you fixed a bug and also reformatted another file, stage and commit them separately, so each commit is one logical change ([atomic commits](/t/atomic-commit)).

`git add -p` goes further: it shows each chunk of change, and asks whether to include it. That lets you split even one file across commits.

## Reading `git status`

```
Changes to be committed:       ← staged: will be in the next commit
Changes not staged for commit: ← modified, but not staged
Untracked files:               ← new files Git doesn't know yet
```

## Common slips

- **Forgetting to `git add`** a changed or new file, so the commit lacks it. Check `git status` before committing.
- **Staging too much** (`git add .` includes debug code and stray files). Review with `git diff --staged` first.
- **Editing after staging.** A later change to the same file is **not** in the staged version until you add again.
- Files listed in [.gitignore](/t/gitignore) won't be added by accident.

Shortcut: `git commit -a` stages modified (not new) tracked files and commits in one go. It's convenient, but skips the review step.
