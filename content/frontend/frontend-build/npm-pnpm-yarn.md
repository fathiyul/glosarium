---
title: "npm vs pnpm vs Yarn"
summary: "JavaScript package managers and their trade-offs."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["npm vs pnpm vs yarn", "package managers", "pnpm"]
prereqs: ["npm-scripts", "semantic-versioning"]
related: ["peer-dependency", "dependency-updates", "supply-chain-security"]
---

**npm**, **pnpm** and **Yarn** install the same registry packages with different storage models: npm nests then hoists (flat-ish tree, phantom-dependency risks), Yarn Berry adds Plug'n'Play (no node_modules, strict resolution), pnpm uses content-addressable symlinks (one copy on disk, strict by default — phantom imports fail loudly).

```text
npm:   node_modules with hoisting (lenient, occasionally phantom)
pnpm:  symlinked store, strict (undeclared imports error)
yarn:  classic hoist or PnP (strict, zero-install capable)
```

Strictness is the real divide: pnpm/Yarn-PnP surface missing declarations immediately; npm tolerates them until a clean install or different order breaks. Speed and disk follow (pnpm's shared store wins monorepos), but correctness culture matters more than minutes.

The classic mistakes:

- Phantom dependencies. Importing packages you never declared works under hoisting — until it doesn't (fresh CI, different manager, version drifts). Strict managers or lint rules (`eslint-plugin-import` no-extraneous) catch it.
- Lockfile neglect. Uncommitted or merge-corrupted lockfiles make installs non-reproducible. Commit lockfiles; regenerate deliberately; resolve conflicts by regenerating, not hand-editing.
- Manager mixing. npm and pnpm lockfiles in one repo (teammates using different clients) diverge dependency trees silently. One manager per repo, enforced (packageManager field, engine checks).
- Postinstall blindness. Install scripts execute arbitrary code — the supply-chain's front door. Audit new deps' scripts; restrict with `--ignore-scripts` where feasible.
- Global installs for projects. Global CLIs drift per machine; project-local devDependencies (run via scripts) pin the toolchain per repo.
- Cache confusion. Debugging installs by deleting caches ritualistically wastes hours; `--frozen-lockfile` CI installs plus clean `node_modules` reinstalls resolve most states.
- Ignoring audit signals. Vulnerability reports need triage cadence, not panic or apathy. Fold audits into the update routine.

**How to choose:** strictness and monorepo fit argue pnpm; ecosystem default argues npm; advanced workflows argue Yarn Berry. All three work — pick one per repo and enforce it.
