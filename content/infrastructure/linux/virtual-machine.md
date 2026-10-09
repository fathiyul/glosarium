---
title: "Virtual Machine"
summary: "A fully emulated computer running on shared hardware."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["VM", "virtual server", "guest OS"]
prereqs: ["operating-system"]
related: ["hypervisor", "container-vs-vm", "bare-metal", "container", "compute-instance", "cloud-computing"]
---

A virtual machine (VM) is a complete computer simulated in software: its own operating system, virtual CPU, memory and disk, running on shared physical hardware. A program called a [hypervisor](/t/hypervisor) divides the real machine among many VMs and keeps them separated.

This is what you rent when a cloud provider gives you a "server" or [compute instance](/t/compute-instance). You get a full OS, with root access, that behaves like a real machine.

## Why it's useful

- **Isolation.** Each VM has its own kernel, so one customer's crash or breach doesn't reach another's.
- **Efficiency.** One powerful host runs many smaller machines.
- **Flexibility.** Create, resize, copy, snapshot and delete in minutes instead of ordering hardware.
- **Any OS.** Run a Linux guest on a Windows laptop, or the reverse. Developers also use local VMs to test a clean environment.

## VM vs container

A VM includes a whole operating system, so it is heavier: usually gigabytes in size and slower to start. A [container](/t/container) shares the host's kernel and packages only the app and its libraries, so it is lighter and starts quickly. VMs give stronger isolation; containers give speed and density. Many systems use both, with containers running inside VMs. See [containers vs VMs](/t/container-vs-vm).

## Things to keep in mind

- **A VM is a machine you maintain.** You patch the OS, manage users and watch the disk.
- **Performance is shared.** A "noisy neighbour" on the same host can occasionally affect you, depending on the provider and instance type.
- **Compared with [bare metal](/t/bare-metal)**, you give up a small amount of raw performance for flexibility.
