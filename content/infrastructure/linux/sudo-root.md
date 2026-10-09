---
title: "sudo and root"
summary: "Running commands with administrator privileges."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["sudo", "root user", "superuser", "su"]
prereqs: ["file-permissions"]
related: ["users-groups", "file-permissions", "linux", "os-package-managers", "server-hardening", "least-privilege"]
---

`root` is the all-powerful administrator account on Linux. It can read, change or delete any file and stop any process. `sudo` ("superuser do") runs a single command as root, after checking that you are allowed to.

```sh
apt install nginx               # fails: Permission denied
sudo apt install nginx          # runs as root, asks for YOUR password
sudo systemctl restart nginx
sudo -l                         # list what you may run with sudo
```

Normal work happens as a regular user, and you borrow root only when needed. This limits the damage of mistakes and makes actions traceable, since sudo usually records who ran what in the system logs.

## The classic mistakes

- **sudo as a fix for "permission denied".** The error usually means files have the wrong owner or mode. Running the app with sudo makes the problem vanish today and creates root-owned files that break it tomorrow. Check [file permissions](/t/file-permissions) first.
- **Running destructive commands with sudo without reading them.** `sudo rm -rf $DIR/` with an empty `$DIR` becomes `rm -rf /`. Many modern versions of `rm` refuse to do that, but you shouldn't rely on it.
- **Working in a root shell** (`sudo -i`) for hours.
- **Running applications as root.** If the app is compromised, the attacker has root. Create a dedicated user. See [least privilege](/t/least-privilege).
- **sudo with a redirect.** In `sudo echo x > /etc/file`, the redirect is done by your shell, not by sudo. Use `echo x | sudo tee /etc/file`.

Who may use sudo is set by the system's sudoers configuration, edited with `visudo`, and tied to [users and groups](/t/users-groups). On servers, also see [server hardening](/t/server-hardening).
