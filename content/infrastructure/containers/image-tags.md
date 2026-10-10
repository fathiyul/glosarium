---
title: "Image Tags and Digests"
summary: "Naming image versions, and why :latest is risky."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["docker tags", "image digest", "latest tag"]
prereqs: ["docker-image", "container-registry"]
related: ["semantic-versioning", "oci", "k8s-deployment", "image-layers", "minimal-base-images"]
---

An image has two ways to be identified: a **tag** and a **digest**.

A tag is a human-readable label: `myapp:1.4.2`, `postgres:16`, `myapp:latest`. A digest is a cryptographic hash of the image contents: `myapp@sha256:...`. The digest always refers to the same bytes; a tag is only a pointer that can be moved.

That mutability is the trap. Nothing stops someone from pushing a new build over `myapp:1.4.2`, so the same tag can yield different images on different days and machines. `latest` is worse: it's just the default tag applied when you don't specify one. It is **not** automatically the newest version, and two services pulling `:latest` can end up running different code.

The classic mistake is deploying a mutable tag to production and then being unable to answer "what exactly is running?" If your pipeline pushes `:latest` or `:prod` and a node already cached that tag, it may never pick up a new build — or pick it up unpredictably.

Safer habits:

- **Tag with an immutable version** — a git commit SHA, or a [semantic version](/t/semantic-versioning) you never reuse.
- **Pin by digest** when you need certainty: `myapp@sha256:...` can't be repointed.
- **Combine both**: tag for humans, digest for deployments.
- **Set the pull policy deliberately** in Kubernetes. With a fixed tag the default is to use the local copy; with `:latest` it pulls every time. Neither is a substitute for unique tags (see [deployments](/t/k8s-deployment)).

Tags and digests are part of the [OCI](/t/oci) image spec, so the rules hold across registries. Use tags to *name* a build and digests to *identify* one.
