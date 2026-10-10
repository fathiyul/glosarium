---
title: "Linux Namespaces"
summary: "Isolating what a process can see; the other basis of containers."
levels: { backend: senior, data-engineer: senior }
aliases: ["linux namespaces", "namespaces", "namespace isolation"]
prereqs: ["process", "kernel-os"]
related: ["cgroups", "container", "container-networking", "file-system"]
---

**Linux namespaces** isolate what a process can *see*. Each namespace wraps a global resource so that processes inside it get their own private view: their own process IDs, their own network interfaces, their own mount points. It's one of the two kernel mechanisms that make [containers](/t/container) possible (the other is [cgroups](/t/cgroups), which limit resources).

The main namespaces:

- **PID** — the process sees its own tree; its "PID 1" is not the host's.
- Network — its own interfaces, routes and ports (see [container networking](/t/container-networking)).
- Mount — its own view of the [file system](/t/file-system).
- UTS — its own hostname.
- IPC — its own shared-memory and message queues.
- User — its own UID/GID mapping, so a process can be root inside but unprivileged outside.

```text
host sees:       all processes, interfaces, mounts
container sees:  only its own — because it's in its own namespaces
```

The classic mistakes:

- Confusing namespaces with cgroups. Namespaces *isolate visibility* ("you can't see it"); cgroups *limit usage* ("you can't use more than this"). Containers need both.
- Thinking namespaces are a security wall by themselves. They isolate views, but a shared kernel means a flaw can be exploited; isolation is strong, not absolute. Don't treat a namespace as a full security boundary.
- Forgetting the host is still there. A process in a network namespace has its own ports, which is why "it's listening on 8080" inside a container says nothing about the host's 8080.
- Assuming the process tree is global. Inside a PID namespace, what looks like PID 1 is just the container's init; the host sees a different number.
- Over-relying on user namespaces for privilege safety. They help map root safely, but misconfiguration can still widen access.

Namespaces are why a container "feels like its own machine" for names, processes and network, at a fraction of a VM's cost — no second kernel, just a private view of one. Combined with cgroups, they're the practical definition of a Linux container.
