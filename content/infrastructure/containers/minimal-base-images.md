---
title: "Minimal Base Images"
summary: "Alpine, distroless and scratch images for a smaller attack surface."
levels: { backend: senior, data-engineer: senior }
aliases: ["minimal base image", "alpine", "distroless"]
prereqs: ["docker-image", "dockerfile"]
related: ["image-layers", "multi-stage-build", "attack-surface", "image-scanning", "oci"]
---

A **minimal base image** is a container [base image](/t/image-layers) that contains as little as possible: only the runtime your application needs, and none of the shell, package manager and system tools a full distribution ships. Every file in the image is something that can have a vulnerability, so removing files removes risk and shrinks the download.

Common choices:

- Alpine — a very small distribution. Uses `musl` libc instead of the more common `glibc`, which is compatible for many applications but not all; binaries built against `glibc` may not run.
- Distroless — images with your app and its runtime but no shell or package manager. Smaller and harder to attack, but you can't `exec` into them to poke around.
- scratch — completely empty. You copy in a self-contained static binary. The smallest option, for programs that need nothing else.

```dockerfile
FROM gcr.io/distroless/static
COPY --from=build /app/server /server
ENTRYPOINT ["/server"]
```

The classic mistakes:

- Choosing Alpine without checking compatibility. A dependency that needs `glibc` (some Python and Node native modules, some binaries) won't work on `musl`. Verify before switching.
- Making it impossible to debug. No shell means no `sh`, no `curl`, no `ps`. You debug via logs and traces, or by using a debug variant during investigation. Accept that trade-off deliberately.
- Assuming small means secure. A minimal image is a smaller *[attack surface](/t/attack-surface)*, but the packages it does include still need patching. Rebuild regularly (see [image scanning](/t/image-scanning)).
- Hand-rolling the "minimal" image. Building your own tiny base is often more work and more risk than a maintained one. Prefer well-known minimal bases and [multi-stage builds](/t/multi-stage-build) to copy only the artifacts you need.

**When not to use it:** a team unfamiliar with the trade-offs may prefer a slim standard image (a smaller variant of a full distro) that still has a shell. Minimal bases shine when size, startup time and attack surface matter more than convenience — and they're a natural fit with the [OCI](/t/oci) image model.
