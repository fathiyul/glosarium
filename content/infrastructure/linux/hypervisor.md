---
title: "Hypervisor"
summary: "Software that runs virtual machines."
levels: { backend: senior, data-engineer: senior }
aliases: ["hypervisor", "VMM", "virtual machine monitor"]
prereqs: ["virtual-machine", "bare-metal"]
related: ["container-vs-vm", "server", "cloud-computing", "fault-tolerance", "capacity-planning"]
---

A **hypervisor** is the software layer that runs [virtual machines](/t/virtual-machine). It presents each VM with virtual hardware — virtual CPUs, memory, disks, network cards — and multiplexes the physical machine's real hardware across them. The guest operating system believes it's on its own computer; the hypervisor decides who actually gets the CPU cycles.

There are two common shapes:

- Type 1 (bare-metal) runs directly on the hardware. The whole machine is a virtualization host, and there's no underlying OS to maintain separately.
- Type 2 (hosted) runs as an application on top of a normal OS. Convenient for desktops and testing, with more overhead.

In the cloud you rarely touch one directly, but almost everything you rent runs on one. And if you run containers on a VM, you have both at once: the [container](/t/container-vs-vm) shares the guest kernel inside the VM.

```text
┌─────────────── Host (bare metal) ───────────────┐
│  Hypervisor                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │  VM 1    │ │  VM 2    │ │  VM 3    │         │
│  └──────────┘ └──────────┘ └──────────┘         │
└─────────────────────────────────────────────────┘
```

The classic mistakes:

- Treating VM isolation as absolute. It's strong, but the hypervisor is a shared component; a flaw in it or in the hardware can cross the boundary. For hostile tenants, that matters.
- Overcommitting without understanding. Hosts often sell more virtual CPU and memory than physically exist, betting that not everyone uses their share at once. When tenants *do* spike together, performance degrades — the "noisy neighbor" effect.
- Confusing snapshots with backups. A VM snapshot is not a durable backup; it lives with the host and grows. Keep real [backups](/t/backups) too.

**When not to virtualize:** for maximum performance or special hardware, [bare metal](/t/bare-metal) avoids the overhead entirely. For application packaging, [containers](/t/container-vs-vm) are lighter than a full VM per app — which is why cloud platforms usually run containers *on* VMs, keeping both.
