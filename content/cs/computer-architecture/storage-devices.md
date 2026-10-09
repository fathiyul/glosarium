---
title: "SSD vs HDD"
summary: "Storage types and their very different speeds."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["SSD", "HDD", "solid state drive", "hard disk drive", "NVMe"]
prereqs: ["ram"]
related: ["ram", "cpu", "db-index", "object-storage", "latency-numbers"]
---

Persistent storage keeps data when the power is off. Two kinds dominate.

- **HDD (hard disk drive)**: spinning magnetic platters and a moving read/write head. Cheap per gigabyte, but slow, especially for random access, because the head has to move.
- **SSD (solid-state drive)**: flash memory with no moving parts. Much faster, with far lower latency, and more expensive per gigabyte. **NVMe** SSDs connect over a faster interface than older SATA ones.

## How different they are

Rough orders of magnitude (real numbers vary a lot):

| Operation | Time |
|---|---|
| CPU cache hit | about 1 nanosecond |
| [RAM](/t/ram) access | about 100 nanoseconds |
| SSD random read | tens to hundreds of microseconds |
| HDD random read | several milliseconds |
| Network round trip in a data center | hundreds of microseconds |

An HDD seek can be tens of thousands of times slower than memory ([latency numbers](/t/latency-numbers)). Sequential reads (large files read in order) are much faster than random ones on both.

## Why it matters to developers

- **Databases and indexes** are designed around the cost of disk access: B-trees minimize how many reads a lookup needs ([database indexes](/t/db-index)).
- **Random vs sequential access.** Appending to a log and scanning in order is fast. Jumping around is not, especially on HDDs.
- **Disk is the usual bottleneck** for heavy data work, and "disk I/O wait" shows up in monitoring ([system monitoring tools](/t/system-monitoring-tools)).
- **Cloud volumes** come in different performance tiers, with IOPS and throughput limits you pay for.
- **Durability**: data not yet flushed from memory to disk can be lost in a crash. Databases use write-ahead logs for this ([WAL](/t/wal)).
- **Wear**: SSDs endure a limited number of writes, though modern ones last for years of normal use.
- **Network and object storage** (like S3) are another tier, with high capacity and higher latency ([object storage](/t/object-storage)).

Rule of thumb: keep hot data in memory or on SSD, and cold data on cheaper storage ([storage lifecycle](/t/storage-lifecycle)).
