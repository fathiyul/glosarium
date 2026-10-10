---
title: "Removing Secrets from Git History"
summary: "Purging a committed secret with git filter-repo, and why you must rotate it anyway."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["leaked secret in git", "git filter-repo"]
prereqs: ["rewriting-history"]
related: ["rewriting-history", "git-reflog", "signed-commits"]
---

If a password, API key or private key was committed, the first step is to **rotate it**: revoke the old secret and issue a new one. Removing it from history is a second step, and it doesn't replace the first. Once a secret has been pushed, assume it's been copied. Clones, CI caches, forks and the hosting provider's own storage may all hold it, and deleting it from the current branch won't remove those copies.

After rotating, you can rewrite history to remove the file or text from every commit. `git filter-repo` is a separate tool, not part of Git itself, and you install it separately. Check its documentation for the exact flags for your version. A typical use removes one file from all of history:

```sh
git filter-repo --invert-paths --path config/secrets.env
```

This rewrites every commit, so every collaborator has to re-clone or carefully reset their copy, and any open pull requests and forks need attention. The old hashes stop existing in the repository, but copies elsewhere can survive.

The trade-off is disruption against exposure. Rewriting history is slow and affects everyone who has the repository, and it still can't un-leak the secret. Rotation is what actually closes the risk, so the rewrite is cleanup.

The classic mistake is deleting the secret in a new commit and considering the problem solved. The old commit still contains it. The other mistake is rewriting history without rotating first, which leaves a window where the secret still works. Rotate immediately, then clean up, and add a secret scanner to your checks so it's caught before the next push. See [rewriting history](/t/rewriting-history) for the general risks.
