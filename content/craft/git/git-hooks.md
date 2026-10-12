---
title: "Git Hooks"
summary: "Scripts that run on Git events, like linting before a commit."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["pre-commit hook", "githooks"]
prereqs: ["commit"]
related: ["ci-pipeline", "commit", "cherry-pick", "git-lfs"]
---

Git hooks are scripts that Git runs at certain points, such as before a commit is created (`pre-commit`) or before a push (`pre-push`). A hook that exits with a non-zero status stops the action, which lets you enforce checks like linting or tests before the change is recorded.

Hooks live in `.git/hooks` inside each clone. A `pre-commit` hook that exits with a non-zero status blocks the commit.

```sh
#!/bin/sh
# .git/hooks/pre-commit
echo "pre-commit ran"
exit 1                     # non-zero: the commit is rejected
```

The catch is that `.git/hooks` isn't part of the repository, so a fresh clone doesn't get your hooks. Teams often keep hook scripts in the repo and point Git at them with the `core.hooksPath` setting. Behaviour differs a little with that setting, so check your Git version's documentation.

The trade-off is enforcement against speed and friction. A slow hook makes every commit feel sluggish, and people bypass hooks with `--no-verify` when they're annoyed. A hook is a local convenience, not a guarantee, because anyone can skip it.

The classic mistake is relying on a local hook as the only check. Run the same tests and linting in your [CI pipeline](/t/ci-pipeline), where every change is checked the same way. Use hooks to catch problems early, and keep them fast enough that people leave them on.
