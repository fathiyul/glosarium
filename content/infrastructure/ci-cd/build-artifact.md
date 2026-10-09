---
title: "Build Artifact"
summary: "The packaged output of a build, deployed as-is."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["artifact", "build output", "deployable artifact"]
prereqs: ["ci-pipeline"]
related: ["artifact-repository", "ci-pipeline", "docker-image", "deployment", "container-registry", "rollback"]
---

A build artifact is the packaged output of a build: the thing you actually deploy. Examples: a Docker image, a `.jar` or wheel file, a zip of compiled frontend files, a compiled binary.

The key habit: **build once, deploy that same artifact everywhere**. The artifact that passed tests in CI is the one that goes to staging and then production. Only configuration (environment variables, secrets) changes between environments.

```
source code ──build──▶ artifact v1.4.2 ──▶ staging ──▶ production
                        (built once)         same bytes everywhere
```

## Why not rebuild on each server?

Rebuilding in each environment can produce different results: a dependency released a new version in between, a tool differs, a flaky step fails. Then "it passed in staging" tells you nothing about production. With one artifact, what you tested is what you ship.

## What a good artifact has

- **A unique, traceable version**, such as the Git commit hash or a release number, so you know exactly what code is running.
- **No environment-specific settings or secrets baked in.** Read them at runtime instead. See [environment variables](/t/environment-variable).
- **A stored copy.** Artifacts are kept in a registry or [artifact repository](/t/artifact-repository) so you can roll back to an earlier one without rebuilding. See [rollback](/t/rollback).

## CI/CD fit

A [CI pipeline](/t/ci-pipeline) builds the artifact, runs tests against it, publishes it to the repository, and later stages deploy it. For containers, the artifact is an [image](/t/docker-image) in a [registry](/t/container-registry).

A common mistake is deploying by copying source code to a server and building there by hand, leaving no record of what was built.
