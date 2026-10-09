---
title: "HEAD"
summary: "Git's pointer to the commit you currently have checked out."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Git HEAD", "HEAD~1", "HEAD pointer"]
prereqs: ["commit", "branch"]
related: ["detached-head", "branch", "git-reset", "git-reflog", "git-log"]
---

`HEAD` is Git's pointer to the commit you currently have checked out, usually through the branch you're on. It answers "where am I now?", and it's the parent of the next commit you make.

```
main ─► C ─► B ─► A        HEAD ─► main      (HEAD points at the branch, which points at C)
```

When you commit, the branch moves forward, and `HEAD` follows it, because it points at the branch.

```sh
git log HEAD          # history from here
git diff HEAD         # changes since the last commit
git show HEAD         # the current commit
git reset --hard HEAD # throw away uncommitted changes
```

## Relative references

You can name commits relative to `HEAD`:

| Name | Meaning |
|---|---|
| `HEAD` | the current commit |
| `HEAD~1` or `HEAD~` | its parent |
| `HEAD~3` | three commits back |
| `HEAD^2` | the second parent of a merge commit |

```sh
git diff HEAD~1 HEAD           # what the last commit changed
git rebase -i HEAD~4           # edit the last four commits
git reset --soft HEAD~1        # undo the last commit, keep the changes
```

## When `HEAD` doesn't point at a branch

In a [detached HEAD](/t/detached-head) state, `HEAD` points straight at a commit, so new commits belong to no branch.

## Where it lives

In the file `.git/HEAD`, typically containing `ref: refs/heads/main`. Its history of movements is recorded in the [reflog](/t/git-reflog), which is the safety net when you move it by mistake.

Don't confuse `HEAD` with `main` or `origin/main`: those are other pointers.
