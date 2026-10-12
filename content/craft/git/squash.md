---
title: "Squash"
summary: "Combining several commits into one."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["git squash", "squash commits", "squash and merge"]
prereqs: ["commit", "rebase"]
related: ["interactive-rebase", "merge-strategies", "atomic-commit", "pull-request", "merge-vs-rebase"]
---

Squashing combines several commits into one. It's used to turn a messy series (`WIP`, `fix typo`, `oops`) into a single, clean commit.

## Two common ways

**On your branch, with interactive rebase:**

```sh
git rebase -i main
# in the editor, change "pick" to "squash" (or "fixup") on the later commits
```

([interactive rebase](/t/interactive-rebase))

**When merging a pull request**, using the host's "Squash and merge" button, which turns the whole branch into one commit on `main`.

```
Branch:   A ─ B ─ C ─ D ─ E        (5 commits, including "fix typo")
After squash merge into main:   ... ─ S      (one commit containing all the changes)
```

## Why teams do it

- **A tidy `main` history**: one commit per pull request, each describing a complete change.
- **Easy to revert**: one commit to undo.
- **Hides noise** from work in progress.

## What you lose

- **The detailed steps.** You can't bisect inside the squashed change, and a long commit is harder to understand if the PR was big.
- **Authorship detail** when several people contributed to a branch (a co-author line helps).
- **Linked history**: the original branch commits aren't in `main`.

So: keep pull requests small ([small PRs](/t/small-prs)), and write a good message for the squashed commit, since that's what stays ([commit messages](/t/commit-message)).

## Tips

- Squash only commits that **haven't been shared**, if you do it locally. Rewriting shared commits needs a [force push](/t/force-push).
- `fixup` is like `squash` but discards the extra commit's message.
- Don't squash different logical changes together. If the branch contains two unrelated things, make two PRs, or keep separate commits ([atomic commits](/t/atomic-commit)).
- Your team's [merge strategy](/t/merge-strategies) decides whether squashing happens at all.
