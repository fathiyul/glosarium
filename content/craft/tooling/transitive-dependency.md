---
title: "Transitive Dependency"
summary: "A dependency of one of your dependencies."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["indirect dependency", "transitive deps"]
prereqs: ["dependency-hell"]
related: ["dependency-hell", "node-modules", "semantic-versioning", "lockfile"]
---

A transitive dependency is a library your project doesn't name directly, but which one of your direct dependencies needs. If your app uses `web-framework`, and `web-framework` uses `http-parser`, then `http-parser` is a transitive dependency of your app. Most projects have far more transitive dependencies than direct ones.

```
your-app
  └── web-framework          (direct)
        └── http-parser      (transitive)
              └── utf-helper (transitive)
```

You still ship and depend on the transitive libraries. A vulnerability or a breaking change in `http-parser` affects your app, even though you never imported it.

The trade-off is that the dependency graph is what you get for free, and it's also what you can't easily see. Each direct dependency pulls in its own set, so adding one library can add many, and removing one may not remove the others. A lock file records the exact versions of the whole graph, which keeps installs repeatable.

The classic mistake is ignoring the transitive graph until something breaks. Inspect it with your package manager's tree command, check it for known vulnerabilities, and keep the list of direct dependencies small. When a transitive library causes a [dependency conflict](/t/dependency-hell), the fix is usually to upgrade the direct dependency that pins it.
