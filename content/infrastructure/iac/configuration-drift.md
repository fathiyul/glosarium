---
title: "Configuration Drift"
summary: "Real infrastructure diverging from its definition."
levels: { backend: senior, data-engineer: senior }
aliases: ["configuration drift", "infra drift", "drift"]
prereqs: ["infrastructure-as-code"]
related: ["terraform", "terraform-state", "gitops", "immutable-infrastructure", "idempotence"]
---

**Configuration drift** is the gap between the infrastructure you *defined* and the infrastructure that actually exists. You declared three servers with a given config; someone logged into one to debug an incident, changed a setting, and never wrote it back. Now reality and the definition have diverged, and nobody knows it.

Drift is inevitable if changes can happen outside your source of truth. The longer it goes unnoticed, the worse: the definition says one thing, the running system another, and rebuilding from the definition produces a machine that behaves differently from the one in production.

Common causes:

- **Manual changes** in a console, on a server, or through `kubectl` — the small "just this once" fix.
- Partial applies. A tool failed midway and left some resources updated and others not.
- Out-of-band actors. Autoscaling, other teams, or scripts that change things your tool doesn't know about.
- Stale definitions. The config wasn't updated after a legitimate change.

The classic mistakes:

- Treating the console as harmless. Every manual change is drift unless it's written back. Fix the source, then re-apply.
- No way to detect it. Without regular `plan`/diff/diff reports (see [Terraform](/t/terraform)) or a reconciling agent (see [GitOps](/t/gitops)), drift is invisible until it bites.
- "Fixing" the running system instead of the definition. Patching a server by hand makes the drift worse, not better.
- Blindly re-applying. Running an apply that overwrites reality can destroy data someone added out-of-band. Detect first, then decide.

The cure is to make the definition the only way to change things and to check regularly. [Immutable infrastructure](/t/immutable-infrastructure) sidesteps drift differently: if servers are replaced rather than modified, there's nothing to drift in place. [Idempotent](/t/idempotence) tools converge reality toward the definition on every run, which is why [infrastructure as code](/t/infrastructure-as-code) plus a reconciling loop is the standard answer.
