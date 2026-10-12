---
title: "Monorepo vs Polyrepo"
summary: "One repository for everything vs one per project."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["monorepo", "polyrepo", "mono vs poly repo"]
prereqs: ["git", "version-control"]
related: ["microservices", "trunk-based-development", "ci-pipeline", "build-caching", "dependency-hell", "modular-monolith"]
---

A **monorepo** holds many projects in one repository; a **polyrepo** gives each project its own. Neither is universally right — the choice trades code sharing and atomic changes against independence and scale.

**Monorepo** strengths: one commit can change a library and every caller together, so you never publish a breaking version and then chase updates; shared tooling and standards are consistent; discovery is easy because everything is in one place. The costs appear as the repo grows: clones get huge, CI must figure out *what changed* to avoid building everything, and access control is all-or-nothing unless you add tooling.

**Polyrepo** strengths: each team owns its repo and release cycle, CI is naturally scoped, and permissions are per repo. The costs: sharing code means publishing and versioning packages, which leads to version skew, dependency upgrades across many repos, and more overhead to make one cross-cutting change.

```text
monorepo: one atomic commit changes lib + callers → CI must scope builds
polyrepo: independent release cycles → a lib bump means upgrading N repos
```

The classic mistakes:

- A monorepo without the tooling. Just putting everything in one repo gives you long clones and 100% CI runs. Monorepos work when builds are dependency-aware (only rebuild what changed, with [build caching](/t/build-caching)).
- A polyrepo with no shared baseline. Hundreds of repos each pinning different versions of a shared library is [dependency hell](/t/dependency-hell); you need a deliberate strategy for shared code.
- Choosing by fashion. "Google uses a monorepo" ignores that Google built enormous tooling for it. Choose based on your team size, tooling and coupling.
- Assuming one repo means one deployable. A monorepo can still build many independent artifacts (the "modular monolith" idea); the repo layout doesn't dictate deployment.

The practical middle ground is a monorepo *with* proper build tooling and clear module boundaries, or a polyrepo with a strong shared-library and versioning discipline. Trunk-based development ([trunk-based development](/t/trunk-based-development)) and scoped CI matter more than the repo count.
