---
title: "Linux Boot Process"
summary: "Firmware, bootloader, kernel, init: how a machine starts."
levels: { backend: senior, data-engineer: senior }
aliases: ["boot process", "booting linux", "init process"]
prereqs: ["linux", "systemd"]
related: ["server", "bare-metal", "virtual-machine", "system-logs"]
---

The **boot process** is the sequence a machine follows from power-on to a running system. Knowing the stages is what lets you diagnose a server that won't come back up — and where a bad change can leave it unreachable.

Roughly, on a typical Linux machine:

1. Firmware (BIOS/UEFI). Runs first, tests basic hardware, and finds a boot device.
2. Bootloader (e.g. GRUB). Loads the kernel and an initial RAM disk into memory. This is where you pick a kernel or edit boot parameters.
3. Kernel. Initializes hardware, mounts the root filesystem (sometimes via the initramfs first), and starts the first userspace process.
4. init / [systemd](/t/systemd). PID 1 brings up services and targets in dependency order.
5. Services and login. Networking, your apps, and a login prompt.

```text
power → firmware → bootloader → kernel → init (PID 1) → services
```

The classic mistakes:

- Breaking boot config. A typo in `/etc/fstab` or the bootloader config can stop the machine from mounting root, leaving it stuck. That's why a new mount is tested with `mount -a` before a reboot.
- Debugging the wrong layer. "The server won't boot" could be firmware, the bootloader, a kernel panic, or a failed service. The screen and console output tell you where it stopped — read them instead of guessing.
- No console access. A remote server that fails early in boot may have no network and no SSH. Out-of-band console access is how you recover; without it, a bad boot change needs hands on the machine.
- Assuming it's always fast. Firmware and bootloader delays, a disk check, or a pending service can make boot take minutes. Check [system logs](/t/system-logs) to see what's slow.

**When it matters:** most of the time the boot process is invisible. It becomes critical when you change storage, the kernel, or the bootloader on a remote [server](/t/server) or [bare-metal](/t/bare-metal) machine — and a [virtual machine](/t/virtual-machine) can be snapshotted first. Have a rollback path before you touch it.
