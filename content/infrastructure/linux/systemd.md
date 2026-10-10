---
title: "systemd"
summary: "The Linux service manager for starting, stopping and logging services."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["systemctl", "systemd service", "unit file"]
prereqs: ["linux", "daemon"]
related: ["system-logs", "cron", "scheduled-jobs", "boot-process", "server"]
---

**systemd** is the init system and service manager on most Linux distributions. It starts as the first process (PID 1), brings up the machine, and manages long-running services. `systemctl` is how you talk to it.

```sh
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl enable nginx    # start automatically at boot
systemctl disable nginx
systemctl status nginx
systemctl list-units --type=service
```

The unit of work is a **unit**, described by a file ending in `.service`, `.socket`, `.timer`, `.mount` or `.target`. A simple service:

```ini
# /etc/systemd/system/myapp.service
[Unit]
Description=My app
After=network.target

[Service]
ExecStart=/opt/myapp/bin/server
Restart=on-failure
User=app

[Install]
WantedBy=multi-user.target
```

After editing a unit, run `systemctl daemon-reload`: systemd caches the files. To customize a distro-provided unit, don't edit it — add a **drop-in** override with `systemctl edit nginx`. And know the difference between `start` (now) and `enable` (at boot): a service can be running but not enabled, or enabled but not running.

The classic mistake is starting a background process with `nohup` and forgetting it. For anything that should survive crashes and reboots, write a unit and let systemd restart it. systemd also logs to the journal (see [reading system logs](/t/system-logs)) and provides `.timer` units, which can replace [cron](/t/cron) for [scheduled jobs](/t/scheduled-jobs) while adding logging and ordering.

Units depend on one another through targets, such as `multi-user.target` for a normal boot, and `After=` and `WantedBy=` order startup (see [boot process](/t/boot-process)).

systemd is not universal — other init systems exist — and details differ between distributions, so check your platform before assuming. Its trade-off is weight: it also owns logging, timers, sockets and device management, so there's more to learn than a minimal init system, and a bad unit can wedge startup. For most servers that's a good deal, because restarting, logging and scheduling come built in.
