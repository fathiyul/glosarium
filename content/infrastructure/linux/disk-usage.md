---
title: "Disk Space (df, du)"
summary: "Finding what's filling up the disk."
levels: { backend: junior, data-engineer: junior }
aliases: ["df", "du", "disk full", "disk space"]
prereqs: ["file-system"]
related: ["disks-mounts", "log-rotation", "system-monitoring-tools", "linux-directory-structure", "archives-compression"]
---

Two commands answer two different questions:

- `df` (disk free): how full is each **filesystem**?
- `du` (disk usage): how much space do these **files and directories** use?

```sh
df -h                      # -h = human readable (GB, MB)
# e.g.
# Filesystem  Size  Used Avail Use% Mounted on
# /dev/sda1    50G   47G  1.2G  98% /

du -sh /var/log            # -s summary, -h human readable
du -h --max-depth=1 /var | sort -h    # biggest subfolders of /var, largest last
```

## Hunting for what filled the disk

Start with `df -h` to see which filesystem is nearly full, then drill down with `du` one level at a time, always staying on the full filesystem (`du -x` avoids crossing into other mounts):

```sh
sudo du -xh --max-depth=1 / | sort -h | tail
```

Repeat inside the largest directory until you find the culprit. Usual suspects: logs in `/var/log` (see [log rotation](/t/log-rotation)), old Docker images and volumes, package caches, core dumps, and database files.

## Two surprises

- **Deleted but still using space.** If a running process holds a file open, deleting it doesn't free the space until the process closes it or restarts. `df` stays high while `du` can't find anything.
- **Running out of inodes.** `df -i` shows inode usage. Millions of tiny files can exhaust inodes while plenty of space remains.

A full disk makes databases and applications fail in strange ways, so alert before it hits 100%. See [system monitoring tools](/t/system-monitoring-tools).
