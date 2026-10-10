---
title: "Worktree"
summary: "Several working directories checked out from one repository."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["git worktree", "worktrees", "multiple working directories"]
prereqs: ["git", "branch"]
related: ["rebase", "detached-head", "remote", "version-control"]
---

**`git worktree`** lets one repository have **several working directories at once**, each checked out on a different branch. They all share the same `.git` data — objects, refs, history — but have separate files on disk. You get the convenience of "another checkout" without cloning the repository again.

```sh
git worktree add ../hotfix -b hotfix/urgent   # new dir on a new branch
git worktree list                             # show all worktrees
git worktree remove ../hotfix                 # clean up when done
```

The common use is context-switching without stashing. A production hotfix arrives while you're deep in a feature branch: instead of stashing messy work-in-progress and rebasing, you create a worktree for the hotfix, fix it there, and leave your main checkout untouched. You can also keep a long builds/tests directory running without disturbing your editor's working copy.

The classic mistakes:

- Thinking it's a clone. It shares the repository data, so a commit made in one worktree is immediately visible in the others' refs. It's not an independent copy.
- Trying to check out the same branch twice. Git refuses, because two working directories on one branch would fight over the index. Use a different branch per worktree.
- Forgetting to remove them. Worktrees persist and clutter `git worktree list` and your disk. Remove them when the task is done.
- Confusing them with a folder copy. Copying the directory copies `.git` too, which breaks things; `worktree` is the supported way to have multiple checkouts.
- Editor confusion. Some tools index the `.git` directory; having several small working directories is usually *easier* on tooling than one giant one.

Worktrees are for people who switch tasks often and hate stashing: they keep work-in-progress intact while letting you act on something urgent. Combined with a clean [branch](/t/branch) and [rebase](/t/rebase) workflow, they remove a lot of the friction of juggling several bits of work in one checkout.
