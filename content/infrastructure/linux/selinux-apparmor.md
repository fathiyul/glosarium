---
title: "SELinux and AppArmor"
summary: "Mandatory access control that restricts what processes can do."
levels: { backend: senior, data-engineer: senior }
aliases: ["SELinux", "AppArmor", "mandatory access control"]
prereqs: ["linux", "file-permissions"]
related: ["server-hardening", "least-privilege", "attack-surface", "zero-trust", "sudo-root"]
---

**SELinux** and **AppArmor** add **mandatory access control (MAC)** to Linux. Ordinary Unix permissions decide which *users* can touch which files. MAC adds a second, independent rule set that restricts what a *process* may do regardless of its user — even root is constrained. If a compromised service is confined to its own files and a few operations, the damage it can do is small.

The two tools take different approaches:

- SELinux labels files, processes and ports with security contexts. Policy allows specific interactions between labels. It's precise and comprehensive, and historically harder to learn. It can run in *enforcing* mode (block and log) or *permissive* (log only).
- AppArmor uses per-program profiles that allow or deny access to paths and capabilities. It's often described as easier to write and read, and confines by application path.

```text
ordinary permission: "can user www-data read /etc/secrets?"
MAC:                 "may the nginx process read /etc/secrets at all?"
```

The classic mistakes:

- Disabling it to make an error go away. Reaching for `setenforce 0` or turning AppArmor off fixes the symptom and removes the protection. The right move is to read the denial in the audit log and grant only what's needed.
- Ignoring the audit log. Denials are logged (SELinux's audit log, or the kernel log). That line tells you exactly what was blocked — the fix usually follows from it.
- Losing contexts when moving files. With SELinux, copying a file can give it the wrong label, and the process that used to read it now can't. `restorecon` re-applies the expected labels.
- Confusing MAC with standard permissions. They stack. Fixing a denial by loosening `chmod` doesn't help if MAC is the thing blocking it.

**When to use it:** on production servers, especially anything internet-facing or multi-tenant, MAC is a strong, cheap layer — the same spirit as [least privilege](/t/least-privilege) and [zero trust](/t/zero-trust). The cost is a learning curve and the occasional confusing denial. See [server hardening](/t/server-hardening) and the [attack surface](/t/attack-surface) you're shrinking.
