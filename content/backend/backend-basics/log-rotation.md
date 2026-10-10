---
title: "Log Rotation and Retention"
summary: "Keeping logs from filling the disk."
levels: { backend: mid-level }
aliases: ["log rotation", "log retention", "logrotate"]
prereqs: ["logging", "disk-usage"]
related: ["structured-logging", "log-levels", "system-logs"]
---

**Log rotation** is the practice of periodically archiving and deleting old log files so they don't fill the disk. A service writing to a file will keep growing it until the filesystem is full — and a full disk breaks everything, often in confusing ways. Rotation renames the current file, opens a fresh one, compresses old ones, and removes files past a **retention** period.

```text
app.log → app.log.1 → app.log.2.gz → ... → deleted after N days
```

On Linux this is usually handled by `logrotate` for file-based logs, configured per log: rotate daily or when a size threshold is hit, keep N archives, compress, and run after rotation.

The classic mistakes:

- Not rotating at all until the disk fills. A verbose service can write gigabytes; without a limit, the disk fills and the whole machine suffers. Set rotation limits before it happens.
- Poisoning the handle on copy-truncate. If the tool copies the file and truncates it while the app still has it open, the app keeps writing at the old offset, creating a sparse file full of null bytes. Use rename+reopen (and have the app reopen on `SIGHUP`) or a proper reopen-aware configuration.
- Keeping too much or too little. Retention is a trade: enough history to debug a problem found later, not so much it costs storage or spans a compliance limit. Decide per log type.
- Only rotating file logs. In a container or systemd world, logs often go to stdout/the journal, and rotation is handled elsewhere. Mixing models leads to double management or gaps.
- Forgetting the aggregation copy. If logs are shipped centrally (see [log aggregation](/t/log-aggregation)), local retention can be short — the central store keeps the long history.

Rotating and retaining logs is unglamorous but essential: it bounds disk usage and defines how far back you can investigate. It pairs with [structured logging](/t/structured-logging) and sensible [log levels](/t/log-levels) so you don't generate the volume in the first place.
