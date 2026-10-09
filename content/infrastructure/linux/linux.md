---
title: "Linux"
summary: "The operating system most servers run."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["GNU/Linux", "Linux OS", "Linux kernel"]
prereqs: ["operating-system"]
related: ["linux-directory-structure", "shell", "sudo-root", "systemd", "os-package-managers", "kernel-os", "file-permissions"]
---

Linux is an operating system kernel, plus the tools around it (a shell, system utilities, a package manager), bundled into a **distribution** such as Ubuntu, Debian, Fedora or Alpine. Most servers, cloud machines and containers run on it, so as a backend or data engineer you will meet it constantly even if your laptop runs something else.

## Why learn it

Deploying, debugging and operating software means working on Linux machines, usually through a terminal over [SSH](/t/ssh), with no graphical interface. The skills transfer between distributions because the basics are shared.

## The core ideas

- **Everything is a file** (almost). Devices, processes and settings are exposed through the file system, so the same tools work on all of them. See [the directory structure](/t/linux-directory-structure).
- **The shell is the main interface.** You combine small commands with pipes: `grep ERROR app.log | sort | uniq -c`. See [shell](/t/shell).
- **Permissions control everything.** Every file has an owner and read/write/execute bits. See [file permissions](/t/file-permissions) and [sudo and root](/t/sudo-root).
- Software comes from a package manager rather than downloaded installers. See [OS package managers](/t/os-package-managers).
- Services are run by an init system, most often [systemd](/t/systemd).

## Starter commands

```sh
pwd                # where am I
ls -la             # list files, including hidden, with permissions
cd /var/log        # change directory
cat app.log        # print a file
less app.log       # page through a file (q to quit)
man ls             # read the manual for a command
```

The classic early mistake is running destructive commands (especially `rm -rf` and anything with `sudo`) without reading the path twice. Distributions differ in details such as package manager and file locations, so check the docs for the one you use.
