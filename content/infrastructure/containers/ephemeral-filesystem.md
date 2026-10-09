---
title: "Ephemeral Container Filesystem"
summary: "Anything written inside a container disappears when it's removed."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["container filesystem", "container writable layer", "stateless container"]
prereqs: ["container"]
related: ["docker-volume", "bind-mount-vs-volume", "container", "union-filesystem", "stateless-service", "container-logs"]
---

A container's file system is temporary. Files created or changed inside a running container live in a thin writable layer on top of the [image](/t/docker-image), and that layer is thrown away when the container is **removed**. Recreating a container from the same image starts clean.

```sh
docker run --name demo ubuntu bash -c "echo hi > /note.txt && cat /note.txt"
docker rm demo
docker run --rm ubuntu cat /note.txt     # No such file or directory
```

A stopped container still keeps its changes until you remove it, but you should never rely on that. Containers get replaced constantly: on deploys, after crashes, when scaling.

## The classic mistake

Running a database or an upload feature and saving data to the container's own disk. It works until the first redeploy, and then the data is gone.

## What to do instead

| Data | Put it in |
|---|---|
| Database files, anything that must survive | A [volume](/t/docker-volume), or an external managed database |
| Source code you're editing locally | A bind mount (see [bind mount vs volume](/t/bind-mount-vs-volume)) |
| User uploads | Object storage such as S3 |
| Logs | stdout/stderr (see [container logs](/t/container-logs)) |
| Config and secrets | Environment variables or the platform's secret mechanism |

## Why it's a feature

Because nothing important is stored inside, any container can be killed and replaced by an identical one. That is what makes scaling, rolling deploys and automatic restarts safe. Apps designed this way are [stateless](/t/stateless-service): the state lives elsewhere.
