---
title: "Monorepo"
summary: "Many projects living in one repository."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["mono repo", "monolithic repository"]
prereqs: ["repository"]
related: ["git-lfs", "submodule", "ci-pipeline", "monolith"]
---

A monorepo is a single Git repository that holds many projects: services, libraries, web apps and tooling that may depend on each other. The alternative is one repository per project, often called a polyrepo.

The main benefit is that a change spanning several projects lands as one commit. If you update a shared library and every service that uses it, the whole change is reviewed and tested together, and nobody has to coordinate version numbers between repositories.

The trade-off is scale. Clones and history grow with every project, and a naive CI setup rebuilds and retests everything on every change. Monorepos usually need tooling that works out which projects a change affects, and that can build and cache only those. Access control is harder too, since everyone can see the whole repository unless you add restrictions.

```
repo/
  services/billing/
  services/orders/
  libs/money/        <- a change here can affect both services above
```

The classic mistake is adopting a monorepo without the tooling to keep CI fast, so every commit takes an hour. Decide how changes will be tested before you move everything in. Large binary files also need care, and [Git LFS](/t/git-lfs) helps with them. If projects truly need separate release cycles and owners, a [submodule](/t/submodule) or separate repositories may suit better.
