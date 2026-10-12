---
title: "Blame"
summary: "Seeing who last changed each line and in which commit."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["git blame", "annotate", "blame"]
prereqs: ["git-log", "commit"]
related: ["git-log", "git-bisect", "understand-before-changing", "commit-message", "git-diff"]
---

`git blame` shows, for every line of a file, which commit last changed it, and who made that commit and when. Despite the name, it's a tool for finding context, not for pointing fingers.

```sh
git blame src/orders.py
# 3f9c2a1b (Ana Putri 2026-03-04 14:02) def apply_discount(order):
# 7d1e8c0a (Bo Chen   2026-06-18 09:41)     if order.total > 100:
```

Narrow it to what you care about:

```sh
git blame -L 40,60 src/orders.py     # only lines 40 to 60
git blame -w src/orders.py           # ignore whitespace-only changes
git blame -C src/orders.py           # follow code that was moved between files
```

Editors and hosting sites show the same thing inline (GitLens, "Blame" on GitHub), so you rarely need the command line.

## What to do with it

1. Find the commit for the odd-looking line.
2. Read its **message and diff**: `git show 7d1e8c0a`.
3. Follow the link to the ticket or pull request, if the message has one.

That usually answers "why is it like this?" before you change it ([understand before you change](/t/understand-before-changing)).

## Traps

- **The last change isn't the original reason.** A reformat or rename shows up as the latest commit. Look further back with `git log -L` or `git blame <commit>^ -- file`.
- **Bulk reformatting commits** drown out real history. List them in a `.git-blame-ignore-revs` file and use `git blame --ignore-revs-file` (GitHub honors it too).
- **A person's name isn't an owner.** They may have left, or merely moved the code.
- **Squash merges** collapse a branch into one commit, so the details live in the pull request.

Good [commit messages](/t/commit-message) make blame far more useful. When hunting a bug's origin, [bisect](/t/git-bisect) is the better tool.
