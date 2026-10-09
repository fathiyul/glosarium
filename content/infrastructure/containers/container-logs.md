---
title: "Container Logs"
summary: "Reading a container's stdout and stderr."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["docker logs", "container stdout"]
prereqs: ["stdin-stdout-stderr"]
related: ["container", "logging", "log-aggregation", "ephemeral-filesystem", "twelve-factor-app", "docker"]
---

Inside a container, the convention is that the app writes its logs to **stdout and stderr** (see [stdin, stdout, stderr](/t/stdin-stdout-stderr)), not to files. The container runtime captures that output, and you read it from outside.

```sh
docker logs web                  # everything the container printed
docker logs -f web               # follow, like tail -f
docker logs --tail 100 web       # last 100 lines
docker logs --since 10m web      # last 10 minutes
docker compose logs -f api       # with Docker Compose, by service name
```

Kubernetes has the same idea with `kubectl logs <pod>`.

## Why not write to a log file inside the container?

The container's file system disappears when it is removed (see [ephemeral filesystem](/t/ephemeral-filesystem)), so a crash that restarts or replaces the container can take the log file with it, and the file can fill the container's disk. Logging to stdout also matches the [twelve-factor](/t/twelve-factor-app) approach: the app just emits a stream, and the platform decides where it goes.

## Things that surprise people

- **Logs are tied to the container.** `docker rm` deletes them. If you need to investigate a crashed container, read the logs before removing it.
- **Buffering hides output.** Some languages buffer stdout when it isn't a terminal. In Python, running with `python -u` or setting `PYTHONUNBUFFERED=1` makes logs appear immediately.
- **Logs can grow forever** on the host unless the runtime's log driver has size limits configured.
- One place for everything. For more than a couple of containers, ship logs to a central system. See [log aggregation](/t/log-aggregation).
