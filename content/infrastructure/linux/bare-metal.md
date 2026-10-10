---
title: "Bare Metal"
summary: "Running directly on physical servers."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["bare-metal server", "dedicated server", "physical server"]
prereqs: ["virtual-machine", "server"]
related: ["hypervisor", "container-vs-vm", "cloud-computing", "iaas-paas-saas", "server-hardening"]
---

**Bare metal** means software runs directly on a physical machine, with no [virtual machine](/t/virtual-machine) or [hypervisor](/t/hypervisor) in between. The operating system talks to the real CPU, memory and disks.

Most of the time you don't need it. A normal cloud server is already a VM, and [containers](/t/container-vs-vm) run on a shared kernel. Bare metal matters when you want every cycle of a machine or the hardware itself: databases with heavy I/O, GPU work, or a node where you pay for the whole box.

Why mid-level engineers hit it: benchmarks from a shared VM can mislead you. Two "identical" cloud instances can perform differently because a neighbor is busy. On bare metal the machine is yours, so results are stable and you can tune the kernel.

The classic mistake is assuming bare metal is strictly faster. It often wins on I/O and latency, but you now own everything the hypervisor used to provide:

- provisioning, firmware and driver updates;
- RAID and disk replacement;
- power, cooling and network in a data center;
- capacity planning, since you can't resize in seconds;
- no easy snapshots, live migration or "restore from image".

On [IaaS](/t/iaas-paas-saas) or in the [cloud](/t/cloud-computing), a "bare metal" or "dedicated" plan gives you the machine but not the automation; managed services buy that back at a premium.

**When not to use it:** almost any application that fits comfortably in a VM. Choose bare metal for the workloads that genuinely need it, and then harden the host like any [server](/t/server) — see [server hardening](/t/server-hardening).
