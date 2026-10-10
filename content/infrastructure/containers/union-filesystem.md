---
title: "Union Filesystem"
summary: "Stacking read-only image layers with a writable layer on top."
levels: { backend: senior, data-engineer: senior }
aliases: ["union filesystem", "overlayfs", "overlay filesystem"]
prereqs: ["image-layers", "container"]
related: ["ephemeral-filesystem", "docker-image", "docker-volume", "oci", "persistent-volume"]
---

A **union filesystem** (or overlay filesystem) presents several directories as if they were one. Files from a higher directory hide files of the same name in a lower one, and reads see the merged view. Container runtimes use this to assemble an image: the read-only [image layers](/t/image-layers) stack up, and a thin writable layer sits on top for the running container.

The key behaviour is **copy-on-write**. When a process modifies a file, the filesystem copies it up into the writable layer and changes it there; the read-only layer underneath stays untouched. So thousands of containers can share one read-only base image, each seeing its own changes without duplicating the base.

```text
        ┌───────────────────────┐
        │ writable layer (cont) │  ← your changes live here
        ├───────────────────────┤
        │ read-only image layers│  ← shared, unchanged
        └───────────────────────┘
             merged view
```

The classic mistakes:

- Writing large data to the container layer. Uploads, caches and databases written inside the container go into the writable layer, which is slow to keep and vanishes when the container is replaced (see [ephemeral filesystem](/t/ephemeral-filesystem)). Use a [volume](/t/docker-volume) or [persistent volume](/t/persistent-volume) instead.
- Expecting deletes to shrink the image. Deleting a file in a later layer doesn't remove the bytes from the earlier one; it adds a "whiteout" marker. The data is still in the image. Use [multi-stage builds](/t/multi-stage-build) to avoid adding it in the first place.
- Assuming every filesystem or host supports it. Overlay filesystems need kernel and storage support; some environments restrict or emulate them, and nested setups can behave differently.
- Confusing it with a backup. The shared read-only layers are content-addressed and reusable, but that's not a backup of your data.

**Why it matters:** this mechanism is what makes images small, pulls fast and containers cheap to start — the base is fetched and stored once. It's a core part of the [OCI](/t/oci) image model, and understanding it explains both image size and container disposal.
