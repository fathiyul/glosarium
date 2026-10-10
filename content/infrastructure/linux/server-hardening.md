---
title: "Server Hardening"
summary: "Reducing a server's attack surface."
levels: { backend: senior, data-engineer: senior }
aliases: ["server hardening", "hardening", "secure server"]
prereqs: ["linux", "firewall"]
related: ["attack-surface", "least-privilege", "selinux-apparmor", "sudo-root", "ssh"]
---

**Server hardening** is reducing what an attacker can reach and do on a machine. Every open port, installed package and running service is a possible way in; every unnecessary privilege is a way to escalate once someone is in. Hardening is the work of removing and restricting those.

The core moves:

- **Minimize services.** Uninstall what you don't use. Every extra daemon is code that can have a vulnerability.
- Firewall to a default-deny. Allow only the ports you actually need (see [iptables/nftables](/t/iptables-nftables)). A database that only needs to talk to the app shouldn't accept connections from anywhere.
- SSH with keys, not passwords. Disable password logins and direct root login; use keys, and restrict who can connect. This closes the most-attacked door.
- Patch. Apply security updates promptly; an unpatched service is the most common way in. Unattended security updates help for the OS.
- Least privilege. Give services dedicated, unprivileged accounts; don't run them as root; use `sudo` for the rare privileged step (see [least privilege](/t/least-privilege), [sudo and root](/t/sudo-root)).
- Confine processes. MAC (see [SELinux/AppArmor](/t/selinux-apparmor)) limits the blast radius if a service is compromised.
- Log and monitor. Know when someone logs in or a service fails; logs only help if someone reads them.
- Back up and test restore. Hardening doesn't prevent all incidents; recovery does.

```sh
# example: default-deny firewall, allow SSH and HTTPS
# (exact command depends on iptables vs nftables)
```

The classic mistakes: leaving a database or admin port open to the internet, allowing password SSH, running everything on one machine so a single compromise is total, and "hardening" once and never patching again. The goal isn't a checklist but a smaller [attack surface](/t/attack-surface) that you keep small. Pair it with network separation — a private subnet or a [security group](/t/security-group) — so a mistake in one layer isn't the only thing standing between the internet and your data.
