---
title: "Container"
summary: "A lightweight, isolated package of an app and its dependencies."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Linux container", "containerization"]
prereqs: ["process", "operating-system"]
related: ["docker", "docker-image", "container-vs-vm", "dockerfile", "ephemeral-filesystem", "namespaces-linux", "cgroups"]
---

A container is a running process (or a few) packaged with everything it needs: your code, language runtime, libraries and system tools. It runs isolated from other processes on the machine, so "it works on my machine" becomes "it works the same everywhere the container runs".

You start containers from an [image](/t/docker-image), a read-only template. One image can start many containers.

```sh
docker run --rm python:3.12 python -c "print('hello from a container')"
```

That command pulls the image if needed, starts a container, runs the command, and removes the container when it exits (`--rm`).

## How it works, briefly

Containers are not tiny computers. They are ordinary Linux processes that the kernel isolates using [namespaces](/t/namespaces-linux) (what the process can see) and [cgroups](/t/cgroups) (how much CPU and memory it can use). All containers on a host share that host's kernel, which is why they start in about a second and use little memory. See [container vs VM](/t/container-vs-vm).

## What the isolation does and doesn't mean

- Each container has its own file system, process list and network view.
- **The container's file system is temporary.** Files written inside vanish when it is removed. See [ephemeral filesystem](/t/ephemeral-filesystem) and [volumes](/t/docker-volume).
- Isolation is good but weaker than a VM, since the kernel is shared. Don't treat a container as a security boundary for untrusted code without more hardening.

## Why teams use them

- The same image runs on your laptop, in CI and in production.
- Dependencies are bundled, so two apps needing different Python versions don't clash.
- Easy to start, stop and replace, which suits scaling and automated deploys.

Docker is the best-known tool for building and running containers, but the idea and the image format ([OCI](/t/oci)) are not tied to it.
