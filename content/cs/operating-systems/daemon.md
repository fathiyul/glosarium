---
title: "Daemon / Service"
summary: "A background process, usually managed by systemd."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["daemon", "service", "background process"]
prereqs: ["process", "systemd"]
related: ["scheduled-jobs", "server", "logging", "signal"]
---

A **daemon** is a program that runs in the **background**, detached from any terminal, doing ongoing work: a web server, a database, a log shipper, a print spooler. The name (and the trailing `d` in names like `sshd`, `cron`) comes from Unix's background "disk and execution monitors". Modern Linux usually runs them as **services** managed by [systemd](/t/systemd).

A daemon typically:

- detaches from the controlling terminal so it isn't killed when a session ends;
- runs continuously rather than to completion;
- is started at boot and restarted if it crashes;
- writes to a [log](/t/logging) rather than the screen.

```sh
systemctl start nginx
systemctl enable nginx     # start at boot
systemctl status nginx
```

The classic mistakes:

- Running long-lived work without supervision. A process started from a shell with `&` or `nohup` dies on reboot and doesn't restart on crash. For anything that should always be up, write a [systemd service](/t/systemd).
- Logging to the terminal. A daemon has no terminal; write to syslog/journald or files, or its output is lost.
- Forgetting graceful shutdown. A daemon needs to handle [SIGTERM](/t/graceful-shutdown) to stop cleanly rather than being killed mid-work.
- Confusing a daemon with a [scheduled job](/t/scheduled-jobs). A daemon runs continuously; a cron job runs periodically. Different tools for different work.
- Running as root by default. Daemons should run as dedicated users; see server hardening.

**When not to daemonise:** in containers, you usually don't. The container runs one foreground process as PID 1, and the orchestrator supervises it, so the "detach into the background" dance is unnecessary and even harmful. Outside containers, a process manager ([systemd](/t/systemd)) is the right home for anything you want to keep running.
