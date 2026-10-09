---
title: "Port Mapping"
summary: "Exposing a container's port on the host."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["port publishing", "docker -p", "port forwarding"]
prereqs: ["port"]
related: ["port", "container-networking", "docker-compose", "localhost", "firewall", "dockerfile"]
---

A container has its own network. A server listening on port 8000 **inside** the container isn't reachable from outside until you map (publish) that port to a port on the host.

```sh
docker run -p 8080:8000 myapp
#             host:container
```

Now `http://localhost:8080` on the host reaches the app listening on port 8000 in the container. The format is always `host_port:container_port`, so if it doesn't work, check you haven't swapped them.

In [Docker Compose](/t/docker-compose):

```yaml
services:
  api:
    ports:
      - "8080:8000"
```

## Common mistakes

- **The app listens on `127.0.0.1` inside the container.** Then only the container itself can reach it, and the mapping appears broken. Make the app listen on `0.0.0.0` inside the container.
- **Using `EXPOSE` and expecting it to publish.** In a Dockerfile, `EXPOSE 8000` only documents the port. You still need `-p`.
- **Two things wanting the same host port.** Only one process can use host port 8080; the second container fails to start. Pick a different host port.
- Publishing a database to everyone. `-p 5432:5432` can make the port reachable from your network or the internet, depending on your firewall. To limit it to the local machine, bind to the loopback address: `-p 127.0.0.1:5432:5432`.

## Container to container: no mapping needed

Containers on the same user-defined network (as in Compose) reach each other by service name and container port, for example `db:5432`. Port mapping is only for traffic coming from outside. See [container networking](/t/container-networking).
