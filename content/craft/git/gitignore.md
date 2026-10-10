---
title: ".gitignore"
summary: "Files Git should never track, like build output and .env."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior }
aliases: [".gitignore file", "gitignore", "ignore file"]
prereqs: ["git", "repository"]
related: ["removing-secrets-from-history", "git-config", "staging-area", "repository"]
core: [backend, frontend, data-engineer]
---

A `.gitignore` file lists files and folders Git should pretend don't exist, so they never
show up as changes and don't get committed by accident.

```gitignore
# dependencies and build output
node_modules/
dist/
__pycache__/

# secrets and local config
.env
*.local

# editor and OS noise
.DS_Store
.idea/
```

Put it in the repository root (commit it, so everyone shares the same rules).

## What belongs in it

- **Generated files**: dependencies, build output, caches, compiled code.
- **Secrets**: `.env` files, private keys. Commit a `.env.example` with fake values so people
  know what to fill in.
- **Machine-specific files**: editor settings, OS files, logs.

Not in it: lockfiles like `package-lock.json` or `poetry.lock`. Those *should* be committed.

## Patterns

| Pattern | Matches |
|---|---|
| `*.log` | any file ending in `.log` |
| `build/` | a directory named `build` |
| `/todo.txt` | only in the repo root |
| `!keep.log` | un-ignores a file an earlier rule matched |

## The thing that trips everyone

**`.gitignore` only affects files Git isn't already tracking.** If you committed `.env`
before ignoring it, adding it to `.gitignore` does nothing. Stop tracking it (keeping your
local copy) with:

```sh
git rm --cached .env
git commit -m "Stop tracking .env"
```

If it contained real secrets, they are still in history and must be treated as leaked: rotate
them, and see [removing secrets from history](/t/removing-secrets-from-history).

To ignore files across *all* your repos (like editor files), use a global ignore file,
configured with `core.excludesFile` (see [git config](/t/git-config)).
