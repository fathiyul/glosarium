---
title: "Revert"
summary: "Creating a new commit that undoes an earlier one."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["git revert", "undo a commit", "revert commit"]
prereqs: ["commit"]
related: ["git-reset", "rebase", "force-push", "rollback", "git-log"]
---

`git revert` undoes an earlier commit by creating a new commit that applies the opposite changes. The original commit stays in history.

```sh
git revert 3f9c2a1             # make a new commit undoing 3f9c2a1
git revert HEAD                # undo the last commit
git revert -m 1 <merge-hash>   # undo a merge commit (say which side to keep)
git revert --no-commit A..B    # undo several, as a single commit afterwards
```

```
Before:   A ─ B ─ C (main)
After:    A ─ B ─ C ─ C' (main)     C' undoes the changes from C
```

## Why it's the safe undo

Revert only **adds** a commit, so nobody's history changes. That makes it right for anything already pushed or shared, such as a bad change on `main`. Teammates just pull the new commit.

Compare [`git reset`](/t/git-reset), which moves a branch back and rewrites history. That's fine for local commits, and problematic for shared ones.

## Details

- **Conflicts are possible** if later changes touched the same lines. Resolve them, then `git revert --continue`.
- **Reverting a merge** needs `-m 1` to choose the mainline. Re-merging the same branch later won't bring back the reverted changes, so you have to revert the revert first.
- **The message** says "Revert ...". Add why you're reverting.
- Revert changes the code, not the **data**. A bad migration or sent email isn't undone.

## In incidents

When a release breaks production, reverting the offending commit and deploying is often the fastest rollback ([rollback](/t/rollback)). Fix the real problem afterwards, and reintroduce the change with a new commit.

See [rewriting history](/t/rewriting-history) for when rewriting is fine and when it isn't.
