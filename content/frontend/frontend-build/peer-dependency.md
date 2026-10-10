---
title: "Peer Dependency"
summary: "A dependency the host project must provide, like React for a component library."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["peer dependency", "peerDependencies", "peer deps"]
prereqs: ["npm-pnpm-yarn", "semantic-versioning"]
related: ["npm-pnpm-yarn", "semantic-versioning", "dependency-updates"]
---

A **peer dependency** declares "the host app must provide this" — plugins and libraries stating their framework expectation (`react: ^18 || ^19`) instead of bundling their own copy. One React instance shared between app and plugin, version-compatibility declared upfront, conflicts surfaced at install rather than as duplicate-module runtime mysteries.

```json
{ "peerDependencies": { "react": "^18.0.0 || ^19.0.0" } }
```

Without peers, plugins bundle private framework copies — dual Reacts break hooks, bloat bundles, and split state. With them, the host owns the version and plugins adapt (or declare incompatibility honestly).

The classic mistakes:

- Bundling peers. Including React/Vue in a library bundle duplicates the framework in every consumer. Peers stay external; the bundler marks them so.
- Over-wide ranges. `>=16` promises compatibility never tested; breaking host upgrades then fail at runtime instead of install. Range what you test.
- Over-narrow ranges. `^18.2.0` exact-pinning blocks hosts on 18.3 from installing. Range majors/minors you support, not patches.
- Ignoring peer warnings. Unmet-peer warnings are future runtime errors wearing a warning costume. Resolve them (resolutions, upgrades) before they bite.
- Peers for everything. Internal utilities don't need peer declarations for every import — peers model *shared singletons* (frameworks, design systems), not all imports.
- Optional peers unmarked. Integrations that work with or without a host package need `peerDependenciesMeta` optionality — hard peers make optional integrations mandatory.
- Version drift in monorepos. Workspace packages resolving different peer versions per package reintroduce duplication silently. Hoist and align peers at the root.

**The rule:** shared singletons go in peers with tested ranges; hosts provide exactly one copy; warnings get resolved, not scrolled past. One framework instance, honestly declared.
