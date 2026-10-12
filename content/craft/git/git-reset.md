---
title: "Reset"
summary: "Moving a branch pointer back, in soft, mixed or hard mode."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["git reset", "reset --hard", "reset --soft"]
prereqs: ["commit", "staging-area", "head"]
related: ["git-revert", "git-reflog", "head", "staging-area", "force-push"]
---

`git reset` moves the current branch back to an earlier commit, and optionally changes the staging area and your files to match. It rewrites where your branch points, so use it on local work.

```sh
git reset --soft HEAD~1      # undo the last commit; keep changes staged
git reset HEAD~1             # (--mixed, the default) undo it; keep changes, unstaged
git reset --hard HEAD~1      # undo it AND throw the changes away
git reset path/to/file       # just unstage a file; nothing is lost
```

## The three modes

| Mode | Branch moves | Staging area | Working files |
|---|---|---|---|
| `--soft` | yes | untouched | untouched |
| `--mixed` (default) | yes | reset | untouched |
| `--hard` | yes | reset | **overwritten**: uncommitted work is lost |

Think of it as how far to unwind. `--soft` only moves the pointer, so your changes stay ready to commit again. `--hard` also discards them.

## Typical uses

- **Fix the last commit**: `git reset --soft HEAD~1`, adjust, commit again (like [amend](/t/git-amend)).
- **Unstage something** you added by mistake.
- **Throw away local experiments**: `git reset --hard origin/main` to match the remote.

## Cautions

- **`--hard` destroys uncommitted changes.** There's no undo for work Git never saved. Check `git status` first, or [stash](/t/git-stash).
- **Don't reset commits you've pushed** to a shared branch. Others have them, and you'd have to [force push](/t/force-push). Use [`git revert`](/t/git-revert) to undo shared history.
- **Committed work isn't gone immediately.** The [reflog](/t/git-reflog) lists where `HEAD` has been, so `git reset --hard <hash>` can bring a commit back.

Reset rewrites history, and revert adds to it. When in doubt, revert.
