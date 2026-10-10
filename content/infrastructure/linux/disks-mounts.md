---
title: "Disks, Filesystems and Mounts"
summary: "Attaching storage and making it usable."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["mount a filesystem", "block device", "mount point"]
prereqs: ["linux", "file-system"]
related: ["disk-usage", "lvm", "inode", "persistent-volume", "backups"]
---

A **disk** (or block device) is a chunk of raw storage — `/dev/sda`, `/dev/nvme0n1`. Before you can use it, you put a [filesystem](/t/file-system) on it (`ext4`, `xfs`), a structure that turns raw blocks into files and directories. **Mounting** attaches that filesystem to a directory so it appears in the tree: mount `/dev/sdb1` at `/data`, and files written under `/data` land on that disk.

```sh
lsblk                 # block devices and their mount points
df -h                 # free space per mounted filesystem
mount /dev/sdb1 /data # attach now (until reboot)
umount /data          # detach
```

To make it permanent, add a line to `/etc/fstab` (device, mount point, filesystem, options). A typo there can stop the machine from booting, so test with `mount -a` before rebooting.

The classic mistake is thinking you can just unplug or delete the disk. Unmount first — writing to a filesystem that was pulled out mid-write corrupts it. Two more traps: every mount point **shadows** whatever was in that directory before, and a full disk breaks services in confusing ways (see [disk usage](/t/disk-usage)).

On servers, storage is often a [logical volume](/t/lvm) rather than one partition, so you can grow it without repartitioning. In the cloud, you attach a block device, then format and mount it the same way. In Docker and Kubernetes you mount a host path or a [persistent volume](/t/persistent-volume) instead; for the container equivalents see [bind mounts vs volumes](/t/bind-mount-vs-volume). Take [backups](/t/backups) before you shrink or move a filesystem.
