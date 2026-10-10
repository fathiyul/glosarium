---
title: "LVM"
summary: "Flexible logical volumes on top of physical disks."
levels: { backend: senior, data-engineer: senior }
aliases: ["LVM", "logical volume manager", "logical volumes"]
prereqs: ["file-system", "linux"]
related: ["backups", "disaster-recovery", "server", "docker-volume"]
---

**LVM** (Logical Volume Management) inserts a flexible layer between physical disks and the [filesystems](/t/file-system) on top of them. Instead of formatting a partition directly, you build volumes you can grow, move and snapshot while the system runs.

Three layers:

- Physical volumes (PVs) — disks or partitions marked for LVM.
- Volume groups (VGs) — a pool of space made from one or more PVs.
- Logical volumes (LVs) — the usable slices; a filesystem goes on top.

```sh
pvs / vgs / lvs                     # show the pieces
lvextend -r -L +10G /dev/vg0/data   # grow the LV and resize the filesystem
```

The payoff is that space is pooled. If `/data` fills up and another disk has room, you add a PV to the VG and extend the LV — no repartitioning, no downtime. You can also snapshot an LV before a risky change.

The classic mistakes:

- Assuming you can shrink anything. Growing is routine; **shrinking is not**. `ext4` can be shrunk but must be unmounted first (and checked), while `xfs` cannot be shrunk at all. Plan for growth, not shrinkage.
- Forgetting to resize the filesystem. Extending the LV without `-r` (or a separate resize) leaves free space the filesystem can't see.
- Thin pools filling silently. On thin-provisioned setups, overcommitted space is only real when written. A pool can fill and take down every volume on it. Monitor it.
- Treating a snapshot as a backup. An LV snapshot shares the original's disk and grows as data changes; it protects against a bad change, not a failed disk. Keep [backups](/t/backups).

**When not to use it:** a simple single-disk server may be fine with plain partitions. LVM earns its place when you need to grow volumes online, pool disks, or snapshot — common on servers and for [disaster recovery](/t/disaster-recovery) workflows.
