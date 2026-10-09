---
title: "Lockfile"
summary: "A record of exact dependency versions so every install is identical."
levels: { backend: junior, frontend: junior }
aliases: ["lock file", "package-lock.json", "yarn.lock", "poetry.lock", "pnpm-lock.yaml", "Cargo.lock"]
prereqs: ["package-manager"]
related: ["package-manager", "dependency", "transitive-dependency", "dependency-hell", "dev-environment-setup"]
core: [backend, frontend]
---

Your project's dependency list says what you want: `"express": "^4.18.0"` means "any
compatible 4.x from 4.18.0 up". A **lockfile** records what you actually got: the exact
version of every package, including the ones those packages depend on.

Without one, two installs on different days can resolve to different versions, and
"works on my machine" begins.

| Ecosystem | Lockfile |
|---|---|
| npm | `package-lock.json` |
| Yarn | `yarn.lock` |
| pnpm | `pnpm-lock.yaml` |
| Python (Poetry) | `poetry.lock` |
| Python (uv) | `uv.lock` |
| Rust (Cargo) | `Cargo.lock` |
| Ruby (Bundler) | `Gemfile.lock` |

## Rules of thumb

- **Commit it.** It's part of the source. For applications and services this is standard
  practice, so everyone (you, teammates, CI, production) installs the same versions.
- **Don't edit it by hand.** The package manager updates it when you add or upgrade.
- **Install from it in CI and deploys**: `npm ci` (or your tool's frozen/locked install)
  fails if the lockfile and manifest disagree, instead of quietly changing versions.
- **Upgrade on purpose**: `npm update`, `poetry update`. Then review the diff and run tests.
- **Resolve merge conflicts by regenerating**, not by picking lines. Re-run the install
  command and commit the result.

```sh
npm ci            # reproducible install from package-lock.json
npm install foo   # adds a dependency and updates the lockfile
```

The lockfile also helps with security, since it pins what you've reviewed. Updates then show
up as visible changes in the pull request.
