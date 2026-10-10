---
title: "OCI"
summary: "The open standards for container images and runtimes."
levels: { backend: senior, data-engineer: senior }
aliases: ["OCI", "open container initiative", "oci image"]
prereqs: ["container", "docker-image"]
related: ["docker", "container-registry", "union-filesystem", "image-tags", "minimal-base-images"]
---

**OCI** is the Open Container Initiative, which publishes open standards for containers. Two matter most:

- the **image specification** — how a container image is structured: a manifest, a config, and a set of layers.
- the **runtime specification** — how to run a container from an unpacked image: which process, environment, namespaces and mounts.

Because these are open, images built by one tool run under another. A `docker build` produces an OCI-compatible image; `containerd`, `CRI-O` and `podman` can run it; any conforming [registry](/t/container-registry) can store it. The format is the interop layer, not any single company's product.

```text
build tool → OCI image → registry → container runtime → running process
              (image-spec)                        (runtime-spec)
```

The classic mistakes:

- Thinking "Docker image" is Docker-only. It's usually an OCI image that Docker happens to build and run. That's why images move freely between tools and clouds.
- Confusing the image with the runtime. The image is a static filesystem plus metadata; the runtime is the thing that actually starts the process. A registry stores images; it doesn't run them.
- Assuming all images are interchangeable in practice. The spec makes them portable, but architecture (amd64 vs arm64), included binaries, and base image choice still affect where they run.
- Overlooking signing and provenance. OCI is about format; who built the image and whether it's trusted is a separate concern. Registries and signing tools layer that on top.

**Why it matters:** standards keep you from being locked into one vendor's container tooling. Images you build remain usable as tooling evolves, and registries, runtimes and cloud services can all interoperate. It's the substrate under [image tags and digests](/t/image-tags), layer [stacks](/t/union-filesystem), and [minimal base images](/t/minimal-base-images). See [containers](/t/container) and [Docker](/t/docker) for the tools built on it.
