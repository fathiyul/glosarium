---
title: "Container vs Virtual Machine"
summary: "Sharing the host kernel vs emulating a full machine."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["containers vs VMs", "docker vs vm"]
prereqs: ["container", "virtual-machine"]
related: ["container", "virtual-machine", "hypervisor", "namespaces-linux", "non-root-containers", "bare-metal"]
---

Both give you an isolated environment for running software. The difference is **what gets isolated**.

```
Virtual machines                    Containers
┌────────┐ ┌────────┐               ┌────────┐ ┌────────┐
│  App   │ │  App   │               │  App   │ │  App   │
│  libs  │ │  libs  │               │  libs  │ │  libs  │
│Guest OS│ │Guest OS│               └────────┘ └────────┘
├────────┴─┴────────┤               ┌───────────────────┐
│    Hypervisor     │               │ Container runtime │
├───────────────────┤               ├───────────────────┤
│  Host OS / HW     │               │ Host OS (1 kernel)│
└───────────────────┘               └───────────────────┘
```

A [virtual machine](/t/virtual-machine) emulates a whole computer and runs its own operating system, including its own kernel. A [container](/t/container) is a process on the host's kernel, fenced off from the others.

| | Container | VM |
|---|---|---|
| Starts in | Typically seconds or less | Typically tens of seconds to minutes |
| Size | Often tens to hundreds of MB | Often GBs (a full OS) |
| Isolation | Process-level, shared kernel | Stronger, separate kernel |
| Different OS kernel | No (a Linux host runs Linux containers) | Yes |
| Best for | Packaging and scaling apps | Strong isolation, other operating systems, running the machines containers live on |

## The classic mistake

Treating a container like a small VM: logging into it with SSH, installing things by hand, and keeping data inside. Containers are meant to be disposable and rebuilt from an image. See [ephemeral filesystem](/t/ephemeral-filesystem).

## They're not rivals

In the cloud, containers usually run **on** VMs. Security-sensitive platforms may also put each container in a lightweight VM to get both speed and stronger isolation. Choose containers for application packaging, VMs when you need hard isolation or a different operating system.
