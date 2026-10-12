---
title: "Diff"
summary: "Seeing exactly what changed between commits, branches or your working copy."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["git diff", "diff", "differences"]
prereqs: ["commit", "staging-area"]
related: ["git-log", "staging-area", "commit", "code-review", "merge-conflict"]
core: [backend, frontend, data-engineer]
---

`git diff` shows exactly what changed between two states of your code. It's how you check
your work before you commit and how reviewers read your change.

```sh
git diff                   # working directory vs staging area (unstaged changes)
git diff --staged          # staging area vs last commit (what you're about to commit)
git diff HEAD              # all uncommitted changes vs last commit
git diff main..feature     # between two branches or commits
git diff --stat            # just a summary of files and line counts
git diff -- src/app.py     # limit to one path
```

## Reading the output

```diff
@@ -10,7 +10,7 @@ def login(user):
     if not user.active:
         return None
-    token = make_token(user)
+    token = make_token(user, ttl=3600)
     return token
```

- Lines starting with **`-`** (red) were removed; **`+`** (green) were added.
- Lines with neither are unchanged context.
- `@@ -10,7 +10,7 @@` says where in the file: starting at line 10, 7 lines, in the old and
  new versions.

A modified line shows up as one removed plus one added line.

## Habit worth building

Run `git diff --staged` before **every** commit. It's the cheapest way to catch a stray
`console.log`, a leftover debug flag or a secret. A [code review](/t/code-review) is the same
thing done by someone else, so reading your own diff first is the best preparation
(see [self-review](/t/self-review)).

Two commits can also be compared: `git diff <hash1> <hash2>`.
