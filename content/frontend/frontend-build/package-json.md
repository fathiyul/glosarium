---
title: "package.json"
summary: "The manifest of a JavaScript project: its dependencies and scripts."
levels: { backend: junior, frontend: junior }
aliases: ["package.json file", "npm manifest", "Node manifest"]
prereqs: ["package-manager"]
related: ["npm-scripts", "lockfile", "npm-pnpm-yarn", "peer-dependency", "node-modules", "semantic-versioning"]
core: [frontend]
---

`package.json` is the manifest of a JavaScript or Node.js project: it names the project, lists its dependencies and
defines its scripts. It sits in the project root, and package managers read it first.

```json
{
  "name": "my-shop",
  "version": "1.2.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vitest": "^1.6.0"
  },
  "engines": { "node": ">=20" }
}
```

## The fields you'll use most

| Field | Purpose |
|---|---|
| `name`, `version` | Identity, needed mainly if you publish it |
| `scripts` | Named commands ([npm scripts](/t/npm-scripts)) |
| `dependencies` | Packages needed **at runtime** |
| `devDependencies` | Packages needed only for **building and testing** (compilers, linters, test runners) |
| `peerDependencies` | Packages a library expects its host app to provide ([peer dependencies](/t/peer-dependency)) |
| `type` | `"module"` makes `.js` files [ES modules](/t/js-modules) |
| `engines` | Which Node versions are supported |
| `private` | `true` prevents accidental publishing |

## Version ranges

`"^18.3.0"` means "18.3.0 or any newer **compatible** 18.x". `"~18.3.0"` allows only patch updates. A plain `"18.3.0"`
is exact. Ranges follow [semantic versioning](/t/semantic-versioning). The exact versions actually installed are recorded in
the [lockfile](/t/lockfile).

## Working with it

```sh
npm install axios            # adds to dependencies and updates the lockfile
npm install -D vitest        # adds to devDependencies
npm uninstall axios
```

Prefer these commands over hand-editing dependencies, so the lockfile stays in sync. It's plain JSON: no comments and no
trailing commas, and a typo breaks it. Commit it to Git, and don't commit `node_modules/`
([.gitignore](/t/gitignore)).
