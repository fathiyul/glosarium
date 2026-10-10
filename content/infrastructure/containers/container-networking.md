---
title: "Container Networking"
summary: "How containers talk to each other and the outside world."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["docker networking", "bridge network", "container network"]
prereqs: ["container", "docker"]
related: ["port-mapping", "namespaces-linux", "service-discovery", "docker-compose", "k8s-service"]
---

Every container gets its own network namespace: its own interfaces, IP address and routing table (see [Linux namespaces](/t/namespaces-linux)). That isolation is why a container can listen on port 80 without colliding with another one doing the same.

Docker wires containers together with networks. The default is a **bridge** network, but you should create your own:

```sh
docker network create app
docker run --network app --name db postgres
docker run --network app --name api myapi
```

On a user-defined network, containers reach each other **by name** — `api` can connect to `db:5432` — because Docker runs a small DNS resolver for the network. That's built-in [service discovery](/t/service-discovery), and it's why [Docker Compose](/t/docker-compose) services can just use each other's names.

To reach a container from outside, publish a port:

```sh
docker run -p 8080:80 nginx   # host 8080 → container 80
```

See [port mapping](/t/port-mapping). With `--network host` the container shares the host's network instead, losing isolation and the by-name resolution.

The classic mistake is using `localhost` to reach another container. Each container has its own loopback, so `localhost:5432` inside the `api` container means `api` itself, not the database. Use the service name.

A second surprise: container IPs are not stable. They change when containers are recreated, so never hard-code them — always use the name.

In Kubernetes, the [pod](/t/pod) is the network unit and a [Service](/t/k8s-service) gives a stable name and virtual IP in front of a changing set of pods. To restrict which pods may talk, use [network policies](/t/network-policy). [DNS](/t/dns) is involved throughout.
