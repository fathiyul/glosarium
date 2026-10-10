---
title: "Artifact Repository"
summary: "Storage for built packages and images."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["artifact registry", "package registry", "artifact store"]
prereqs: ["build-artifact", "ci-pipeline"]
related: ["container-registry", "build-caching", "semantic-versioning", "docker-image"]
---

An **artifact repository** stores the things your build produces so other systems can fetch them. That might be language packages (a JAR, a wheel, an npm tarball), [container images](/t/docker-image), or any versioned file. Examples include Nexus, Artifactory, GitHub Packages, and the container [registries](/t/container-registry) that store images. A [CI pipeline](/t/ci-pipeline) publishes to it; deploys pull from it.

The point is a clean handoff. The pipeline builds once and uploads the output; every environment then deploys that exact artifact rather than rebuilding from source.

```text
source ─▶ CI build ─▶ artifact repository ─▶ deploy staging
                                          └▶ deploy production
```

The classic mistake is rebuilding at deploy time. If staging runs a build from `main` and production runs another build from `main` a day later, you're deploying *similar* code, not the *same* code — a dependency or tool version may have moved in between. Build once, promote the artifact. This is what makes "what's in production?" answerable.

Two more traps:

- **Mutable versions.** If an upload can overwrite an existing version number, the same coordinate can mean two different files. Treat published versions as immutable, as with [semantic versioning](/t/semantic-versioning) and [image tags](/t/image-tags).
- **No retention policy.** Old snapshots pile up forever. Set rules to keep what you need for rollbacks and prune the rest.

Repositories also give you a place to cache dependencies between builds — see [build caching](/t/build-caching) — and to keep a copy of third-party packages so a build doesn't break when an upstream host is unavailable.
