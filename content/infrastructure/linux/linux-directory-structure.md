---
title: "Linux Directory Structure"
summary: "What /etc, /var, /usr, /home and /tmp are for."
levels: { backend: junior, data-engineer: junior }
aliases: ["filesystem hierarchy", "FHS", "Linux file hierarchy"]
prereqs: ["linux"]
related: ["file-system", "system-logs", "file-permissions", "users-groups", "disk-usage", "disks-mounts"]
---

Linux has one directory tree starting at `/` (root), with no drive letters. Extra disks are attached somewhere in that tree. Distributions follow a common layout, so you can predict where things live.

| Path | What it is for |
|---|---|
| `/home` | Users' personal files (`/home/alice`). `~` is shorthand for your home. |
| `/etc` | System-wide configuration files, mostly plain text |
| `/var` | Data that changes while the system runs: logs (`/var/log`), caches, mail queues, often databases |
| `/usr` | Installed programs and libraries (`/usr/bin`, `/usr/lib`) |
| `/bin`, `/sbin` | Essential commands. On many modern distributions these point into `/usr`. |
| `/tmp` | Temporary files, usually cleared on reboot |
| `/opt` | Optional, self-contained third-party software |
| `/dev` | Device files such as disks |
| `/proc`, `/sys` | Virtual files showing live information about the kernel and processes |
| `/root` | The home directory of the root user |

## Where you'll actually go

- **Config for a service:** look in `/etc` (for example `/etc/nginx/`).
- **Why did it crash:** look in `/var/log`. See [system logs](/t/system-logs).
- **Your own app deployed by hand:** commonly `/opt` or `/srv`, but this is a team convention.

## Things to remember

- Paths starting with `/` are absolute; anything else is relative to the current directory.
- Don't store important data in `/tmp`.
- Running out of space in `/var` is a frequent cause of outages, because logs and databases live there. See [disk space](/t/disk-usage).
- Some details vary between distributions, so confirm on the machine in front of you with `ls /`.
