---
title: "Interactive Rebase"
summary: "Rewriting commits: squash, reorder, edit, drop."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["git rebase -i", "rebase interactive", "squash commits", "rewriting commits", "fixup"]
prereqs: ["rebase", "git-amend"]
related: ["squash", "rewriting-history", "force-push", "git-reflog", "atomic-commit", "merge-vs-rebase"]
core: [backend]
---

`git rebase -i` ("interactive") lets you **edit a series of your own commits**: reorder them, combine them, reword their messages, split them or drop them. It's how you tidy a messy
branch into a clean story before asking for review.

```sh
git rebase -i HEAD~4        # edit the last 4 commits
```

Git opens an editor with a list, oldest first:

```
pick a1b2c3d Add search endpoint
pick e4f5a6b WIP
pick 7c8d9e0 fix typo
pick 1f2a3b4 Add tests for search
```

You change the word at the start of each line:

| Command | Does |
|---|---|
| `pick` | Keep the commit as it is |
| `reword` | Keep it, but edit the message |
| `edit` | Stop at this commit so you can change its content, or split it |
| `squash` | Combine into the previous commit, and edit the combined message |
| `fixup` | Combine into the previous commit, discarding this commit's message |
| `drop` | Remove the commit |

You can also **reorder** the lines. Save and close, and Git replays the commits accordingly. For example, turning `WIP` and `fix typo` into `fixup` leaves two clean commits.

## A useful shortcut

```sh
git commit --fixup a1b2c3d      # mark a small correction for that earlier commit
git rebase -i --autosquash main # Git arranges the fixups automatically
```

## Rules and risks

- **Only rewrite commits that you haven't shared.** Rebased commits get new hashes, so rewriting ones others have pulled causes real trouble. After rewriting commits you already pushed to your own branch,
  update with `git push --force-with-lease` ([force push](/t/force-push)).
- **Conflicts can appear** while replaying. Resolve and `git rebase --continue`, or `git rebase --abort` to go back to how things were.
- **Nothing is lost immediately**: the [reflog](/t/git-reflog) lets you recover the old state if you make a mistake.
- Don't make history so polished that it hides real steps. The aim is clear, reviewable commits ([atomic commits](/t/atomic-commit)).

See [rewriting history](/t/rewriting-history) and [squash](/t/squash).
