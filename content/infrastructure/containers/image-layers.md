---
title: "Image Layers and Build Cache"
summary: "How images are built from cached layers, and how to order steps."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["docker layers", "build cache", "layer caching"]
prereqs: ["dockerfile", "docker-image"]
related: ["union-filesystem", "multi-stage-build", "minimal-base-images", "image-tags", "ephemeral-filesystem"]
---

A container image isn't one big file. It's a stack of read-only **layers**, and each Dockerfile instruction that changes the filesystem adds one. A [union filesystem](/t/union-filesystem) presents them as a single tree, and layers are shared between images: if ten images use the same base, that base is stored once.

At run time Docker adds a thin writable layer on top. Writes go there and vanish when the container is removed — a fresh container starts from the read-only layers again (see [ephemeral filesystem](/t/ephemeral-filesystem)).

The same layering powers the **build cache**. Docker reuses a layer when the instruction and everything before it are unchanged, so instruction order matters:

```dockerfile
# Good: dependencies change rarely, source changes often
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
```

Here, editing application code only invalidates the last `COPY`. If you `COPY . .` first, every code change also reruns `npm ci`, and builds crawl.

The classic mistakes:

- **`COPY . .` before installing dependencies**, busting the cache on every edit.
- **No `.dockerignore`.** Then `node_modules`, `.git` and build output get copied into the context and a layer, bloating the image and invalidating the cache for no reason.
- Too-coarse layers. Split steps along lines that change at different rates.
- Expecting a later delete to shrink the image. It doesn't; the bytes remain in the earlier layer. Use [multi-stage builds](/t/multi-stage-build) and [minimal base images](/t/minimal-base-images) to keep images small.

Inspect what's really in an image with `docker history <image>`. A well-ordered Dockerfile makes local builds fast and CI caches effective.
