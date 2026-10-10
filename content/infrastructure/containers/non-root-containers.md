---
title: "Running as Non-Root"
summary: "Not running container processes as root."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["non-root user", "rootless container", "USER instruction"]
prereqs: ["container", "file-permissions"]
related: ["namespaces-linux", "ownership", "least-privilege", "server-hardening", "dockerfile"]
---

By default a container process often runs as **root** (UID 0) — either because the base image doesn't set a user, or because you never changed it. Inside the container that root has full control, which sounds harmless given isolation, but it isn't.

Two reasons it matters:

1. **Containers share the host kernel.** A kernel flaw, a bad mount or a misconfiguration can let a root process escape and reach the host (see [container vs VM](/t/container-vs-vm) and [Linux namespaces](/t/namespaces-linux)).
2. **Root owns files outside the container.** A process writing to a bind-mounted directory creates root-owned files on the host, and a container root that can reach the Docker socket is effectively host root.

The fix is to declare a non-root user in the image:

```dockerfile
FROM node:20-slim
RUN groupadd -r app && useradd -r -g app app
WORKDIR /app
COPY --chown=app:app . .
USER app
CMD ["node", "server.js"]
```

Now the process runs as `app`. Match this to [file permissions](/t/file-permissions) and [ownership](/t/ownership): files the app must write to should be owned by `app`, or you'll get "permission denied" the moment it starts.

The classic mistakes:

- **Setting `USER` without fixing ownership**, so the app can't write its own files.
- **Using `chown -R` over the whole filesystem**, which copies every file into a new layer and bloats the image. Use `COPY --chown` instead.
- **Assuming non-root is enough.** Also drop Linux capabilities you don't need, run a read-only root filesystem where possible, and apply [least privilege](/t/least-privilege) to what the container can reach.

Rootless Docker and rootless runtimes add a second layer of safety by running the daemon itself as an unprivileged user. For anything exposed to the internet, treat a non-root container as a baseline, not a bonus — the same instinct as [server hardening](/t/server-hardening).
