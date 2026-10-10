---
title: "Bind Mounts vs Volumes"
summary: "Mounting a host directory vs Docker-managed storage."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["docker volume", "bind mount", "named volume"]
prereqs: ["container", "docker-volume"]
related: ["ephemeral-filesystem", "persistent-volume", "file-permissions", "hot-reload-in-containers", "docker-compose"]
---

A container's own filesystem is temporary: recreate the container and anything stored inside is gone (see [ephemeral filesystem](/t/ephemeral-filesystem)). To keep data or share it with the host, you mount something from outside. Docker gives you two main options.

A **bind mount** maps a directory or file on the host straight into the container:

```sh
docker run -v /home/me/app:/app myimage
```

You point at an exact host path. It's what you want in development: edit code on your laptop and the container sees it immediately (see [hot reloading in containers](/t/hot-reload-in-containers)). The downsides: the path must exist, it's tied to that one machine, and file [ownership](/t/ownership) and [permissions](/t/file-permissions) come with it — a process running as one UID may find files owned by another and fail to write.

A **volume** is storage Docker manages:

```sh
docker volume create pgdata
docker run -v pgdata:/var/lib/postgresql/data postgres
```

The volume lives under Docker's own directory, not a path you chose. It's portable, easy to back up or move, and the right choice for data that must outlive the container — database files, uploads. Anonymous volumes are the unnamed kind created automatically; name yours so you can find them later.

The classic mistake is keeping a database's data inside the container image or writable layer, then losing it on the next `docker compose up --build`. Use a named [volume](/t/docker-volume) for data.

Rough rule: **bind mounts for source code, volumes for data.** In Kubernetes the equivalent object is a [persistent volume](/t/persistent-volume), and the same bind-versus-managed distinction applies. See [Docker Compose](/t/docker-compose) for declaring mounts alongside the service.
