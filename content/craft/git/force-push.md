---
title: "Force Push"
summary: "Overwriting remote history; use --force-with-lease and never on shared branches."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["git push --force", "force with lease", "--force-with-lease"]
prereqs: ["remote", "rebase"]
related: ["rebase", "git-amend", "interactive-rebase", "push-pull-fetch", "rewriting-history"]
---

A force push overwrites the branch on the remote with your local version, even when that discards commits the remote has. Normally Git refuses a push that isn't a simple fast-forward.

```sh
git push --force                  # overwrite the remote branch, no matter what
git push --force-with-lease       # overwrite only if nobody else pushed since you last fetched
```

## When it's necessary

After you **rewrite** commits that are already on the remote: [rebasing](/t/rebase), [amending](/t/git-amend), squashing. The rewritten commits have new hashes, so the remote branch and your local branch have diverged, and a normal push is rejected.

## The danger

Anyone who already pulled the old commits now has history that doesn't match. Their next pull produces confusing conflicts, and work they based on the old commits can be lost. Force-pushing to a shared branch can delete teammates' commits from the remote.

## Safe habits

- **Prefer `--force-with-lease`.** It refuses if the remote has commits you haven't seen, protecting other people's pushes.
- **Only force-push your own branches**, such as a pull request branch nobody else builds on.
- **Never force-push `main`** or other shared branches. Teams usually protect them to block it.
- **Tell people** if others use the branch.
- **Look before you push**: `git log origin/feature..HEAD` and `git diff origin/feature` show what will change.
- If you do overwrite something by mistake, the old commits may still exist in someone's clone, or your Git host's support may be able to help, so act quickly.

## Alternatives

If a branch is shared, add a new commit (or a [revert](/t/git-revert)) instead of rewriting history. See [rewriting history](/t/rewriting-history).
