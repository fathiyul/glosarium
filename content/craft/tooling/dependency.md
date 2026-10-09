---
title: "Dependency"
summary: "External code your project relies on."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["dependencies", "library dependency", "third-party package"]
prereqs: ["package-manager"]
related: ["package-manager", "lockfile", "transitive-dependency", "dependency-hell", "supply-chain-security"]
---

A dependency is external code that your project relies on: a library, a framework, a package. You use it instead of writing that functionality yourself.

```json
"dependencies": { "express": "^4.18.0", "zod": "^3.22.0" },
"devDependencies": { "vitest": "^1.6.0" }
```

```
requests==2.32.0        # requirements.txt (Python)
```

## Kinds

- **Runtime dependencies**: needed when the app runs.
- **Development dependencies**: needed to build, test and lint (a test runner, a formatter).
- **Transitive dependencies**: the dependencies of your dependencies, installed automatically ([transitive dependencies](/t/transitive-dependency)).
- **Services**: databases, APIs and queues your system depends on, which are dependencies in a wider sense.

## Why they matter

Dependencies save huge amounts of work, and they also bring cost:

- **Bugs and breaking changes** from upgrades.
- **Security risk**: a vulnerable or malicious package affects you ([supply chain security](/t/supply-chain-security), [dependency scanning](/t/dependency-scanning)).
- **Maintenance risk**: an abandoned library becomes your problem.
- **Size and slowness**: extra weight in bundles and install times.
- **Conflicts** between versions ([dependency hell](/t/dependency-hell)).

## Habits

- **Add them deliberately.** Is it maintained, widely used, and worth it for what you need? Don't pull in a package for one small function.
- **Pin versions** with a [lockfile](/t/lockfile) and update on purpose.
- **Keep them current** in small steps, with tests.
- **Remove unused ones.**
- **Check licenses** ([open source licenses](/t/open-source-licenses)).
- **Isolate them** behind your own small interfaces where changing libraries might be needed.

In design talk, "dependency" also means anything a class needs to do its job ([dependency injection](/t/dependency-injection)).
