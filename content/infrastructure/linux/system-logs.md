---
title: "Reading System Logs"
summary: "journalctl, /var/log, and finding out what went wrong."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["system logs", "journalctl", "syslog"]
prereqs: ["logging", "linux"]
related: ["systemd", "log-levels", "log-aggregation", "structured-logging", "container-logs"]
---

When something breaks on a server, the evidence is usually in a log. Kernels, services and applications all write messages, and a mid-level engineer is expected to find the right one quickly.

On most modern distributions, [systemd](/t/systemd) collects logs in the **journal**, read with `journalctl`:

```sh
journalctl -u nginx         # one service
journalctl -f               # follow live, like tail -f
journalctl -b               # since the last boot
journalctl -p err -b        # only errors since boot
journalctl --since "1 hour ago"
```

Older or extra logs live as plain files under `/var/log` — `syslog` or `messages`, `auth.log`, `kern.log`, and per-service folders like `/var/log/nginx/`. These are rotated by `logrotate` so they don't fill the disk; rotated files end in `.1`, `.2` or `.gz`.

The classic mistake is grepping `/var/log/syslog` and finding nothing, because the distro logs only to the journal — or the reverse. Check both, and remember container output often goes elsewhere; see [container logs](/t/container-logs).

Two more traps:

- **Volume.** A misbehaving service can write gigabytes and fill the disk (see [disk usage](/t/disk-usage)). Set rotation and size limits.
- **Missing context.** Plain text lines are hard to search at scale. [Structured logging](/t/structured-logging) (events with named fields) and a [log aggregation](/t/log-aggregation) system turn "find every request for user 42" into a query instead of a grep.

Read logs by timestamp and by severity ([log levels](/t/log-levels)), and correlate services around the same moment. The first error is usually the cause; the rest are fallout.
