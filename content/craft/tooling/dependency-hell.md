---
title: "Dependency Hell"
summary: "Conflicting version requirements that can't all be satisfied."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["version conflict", "dependency conflict", "DLL hell"]
prereqs: ["transitive-dependency"]
related: ["transitive-dependency", "semantic-versioning", "node-modules", "lockfile"]
---

Dependency hell is the situation where two or more libraries need different, incompatible versions of a third library, so no single version satisfies everyone. The project can't be installed cleanly, or it installs and then fails in confusing ways at runtime.

A simple picture of the conflict:

```
your-app
  ├── library-a  needs shared-lib >= 2.0
  └── library-b  needs shared-lib < 2.0   <- no version satisfies both
```

Tools resolve these requirements in different ways. Some install two copies of a library side by side, and others refuse to install and report the conflict. The outcome depends on the package manager.

The trade-off is that a dependency is only as stable as its own dependencies. Adding one library can pull in dozens, and each brings its own version constraints. Pinning versions in a lock file keeps builds reproducible, but it doesn't remove the conflict, and upgrading a pinned library can reopen it.

The classic mistake is solving a conflict by forcing a version with an override and never checking the result. The library may work in tests and fail in an edge case. Prefer upgrading the library that holds the stale constraint, keep dependencies few, and check [transitive dependencies](/t/transitive-dependency) before adding a large package.
