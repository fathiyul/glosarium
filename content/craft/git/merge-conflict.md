---
title: "Merge Conflict"
summary: "Two branches changed the same lines and Git needs you to decide."
levels: { backend: junior, frontend: junior }
aliases: ["merge conflicts", "conflict markers", "resolving conflicts"]
prereqs: ["branch", "merge"]
related: ["rebase", "merge-vs-rebase", "git-diff", "pull-request"]
core: [backend, frontend]
---

A **merge conflict** happens when two branches changed the *same lines* (or one deleted a
file the other edited) and Git can't tell which version to keep. Git stops and asks you.

It's normal, not a sign you did something wrong. It also doesn't mean the code is broken.

## What it looks like

Git writes both versions into the file with markers:

```
<<<<<<< HEAD
timeout = 30
=======
timeout = 60
>>>>>>> feature/slow-networks
```

- Between `<<<<<<<` and `=======` is **your current branch's** version.
- Between `=======` and `>>>>>>>` is **the incoming** version.

## How to resolve it

1. Run `git status` to see which files are in conflict.
2. Open each file and decide what the result should be: one side, the other, or a mix.
3. **Delete the markers** (`<<<<<<<`, `=======`, `>>>>>>>`) and leave only the final code.
4. Test it. Resolving a conflict can still produce code that doesn't work.
5. Finish:

```sh
git add path/to/file
git commit                    # for a merge
git rebase --continue         # if you were rebasing
```

To back out and start over: `git merge --abort` (or `git rebase --abort`).

## Making them rarer

- Keep branches **short-lived** and pull from `main` often.
- Keep [pull requests small](/t/small-prs).
- Tell teammates when you're making a big change to shared files.
- Don't reformat whole files in the same change as real edits.

When you don't understand the other side's change, ask the person who wrote it instead of guessing.
Many editors have a built-in conflict view, but the result is the same thing.
