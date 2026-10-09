---
title: "Volume"
summary: "Persistent storage that outlives a container."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Docker volume", "named volume", "persistent storage"]
prereqs: ["ephemeral-filesystem"]
related: ["ephemeral-filesystem", "bind-mount-vs-volume", "docker-compose", "container", "storage-lifecycle"]
---

A volume is storage managed by Docker that exists **outside** any container's temporary file system, so data in it survives when the container is stopped, removed or replaced. It is the standard way to keep database files and similar data. See [ephemeral filesystem](/t/ephemeral-filesystem) for why this is needed.

```sh
docker volume create pgdata
docker run -d --name db \
  -e POSTGRES_PASSWORD=secret \
  -v pgdata:/var/lib/postgresql/data \
  postgres:16
```

`-v pgdata:/var/lib/postgresql/data` mounts the volume `pgdata` at that path inside the container. Remove the container, start a new one with the same `-v`, and the data is still there.

In [Docker Compose](/t/docker-compose) you declare it under `volumes:` and reference it from the service.

```sh
docker volume ls                 # list volumes
docker volume rm pgdata          # delete one (and its data!)
```

## Volume vs bind mount

A **bind mount** (`-v ./data:/data`) maps a specific folder from your host. It's handy for editing code live. A named volume is managed by Docker and is better for data you just want to keep. See [bind mount vs volume](/t/bind-mount-vs-volume).

## Mistakes to avoid

- **Forgetting the volume** on a database container. The data silently lives in the container and disappears with it.
- **`docker compose down -v` or `docker volume prune`** delete volumes and their data.
- Treating a volume as a backup. It lives on one machine's disk. Back up the data separately.
- Sharing one volume between containers that write to it without coordination can corrupt data.
