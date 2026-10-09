---
title: "Build Tool"
summary: "Automating compile, test and package steps, like Make, Gradle or Vite."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["build system", "Make", "Gradle", "Maven", "Vite"]
prereqs: ["package-manager"]
related: ["bundler", "package-manager", "npm-scripts", "task-runner", "continuous-integration"]
---

A build tool automates the steps needed to turn source code into something you can run or ship: compile, bundle, test, package. Instead of typing a dozen commands in the right order, you run one, and the tool does the rest.

| Ecosystem | Common tools |
|---|---|
| JavaScript / TypeScript | Vite, webpack, esbuild, plus `npm run build` ([bundlers](/t/bundler)) |
| Java / Kotlin | Maven, Gradle |
| C / C++ | Make, CMake |
| Go, Rust | built in: `go build`, `cargo build` |
| Python | `build`, Poetry, `pip` with a `pyproject.toml` |
| .NET | `dotnet build`, MSBuild |

```sh
npm run build        # runs whatever the project defines
make test            # runs the "test" target from a Makefile
./gradlew build
```

## What they do

- **Resolve and fetch dependencies** ([package managers](/t/package-manager)).
- **Compile or transpile** source code.
- **Run steps in the right order**, and skip unchanged ones (incremental builds, caching).
- **Package the result** (a bundle, a JAR, a container image).
- **Run tests and linters** as part of the build.
- **Produce the same output** for everyone, on any machine, and in CI ([continuous integration](/t/continuous-integration)).

## Habits

- **Put the commands in the project**, not in someone's head: scripts, a Makefile, a README ([npm scripts](/t/npm-scripts), [task runners](/t/task-runner)).
- **Keep builds fast**, with caching. Slow builds drain productivity.
- **Make them reproducible**: pinned versions and a [lockfile](/t/lockfile).
- **Keep build output out of Git** ([.gitignore](/t/gitignore)).
- **Read the error.** Build failures usually say which step and file ([reading error messages](/t/reading-error-messages)).
