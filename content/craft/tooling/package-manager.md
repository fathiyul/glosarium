---
title: "Package Manager"
summary: "A tool for installing and versioning dependencies, like npm, pip or cargo."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["dependency manager", "npm", "pip", "cargo", "yarn", "pnpm", "maven", "gradle"]
prereqs: ["dependency"]
related: ["lockfile", "dependency", "transitive-dependency", "version-manager", "virtual-environment", "dependency-hell"]
core: [backend, frontend, data-engineer]
---

A **package manager** downloads libraries your project depends on, installs them, and records
which versions you use, so you don't copy code by hand.

| Ecosystem | Tools |
|---|---|
| JavaScript | npm, Yarn, pnpm |
| Python | pip, Poetry, uv |
| Rust | Cargo |
| Java | Maven, Gradle |
| Ruby | Bundler |
| Go | the built-in `go` modules |

```sh
npm install lodash          # add a dependency
npm install                 # install everything listed in package.json
pip install requests
```

## What it does

- **Resolves** dependencies: your package needs library A, which needs B at some versions.
  It picks versions that work together.
- **Installs** them into the project (`node_modules/`, a virtual environment).
- **Records** them: in a manifest (`package.json`, `pyproject.toml`) and a
  [lockfile](/t/lockfile).
- **Runs scripts** and publishes packages in some ecosystems.

## Versions

Most use [semantic versioning](/t/semantic-versioning): `MAJOR.MINOR.PATCH`, where a major bump
may break compatibility. A range such as `^1.4.0` in npm accepts newer compatible releases
(1.x, from 1.4.0). That convenience is why lockfiles matter.

## Habits

- **Add dependencies deliberately.** Each one is code you now rely on, with its own bugs and security
  history. Check that it's maintained before adding it.
- **Keep the lockfile committed** and install from it in CI.
- **Don't install globally** for project dependencies. Use project-local installs
  ([virtual environments](/t/virtual-environment) in Python).
- **Update regularly**, in small steps, rather than once every two years
  ([dependency hell](/t/dependency-hell) gets worse with delay).
- **Never run `sudo pip install`** to fix permission errors; fix the environment instead.
