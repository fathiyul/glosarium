---
title: "Startup Security Baseline"
summary: "The minimum security an early startup needs before customers trust it with data."
levels: { tech-entrepreneur: mvp }
aliases: ["security baseline", "startup security", "minimum security"]
prereqs: ["startup-tech-stack", "mvp"]
related: ["server-hardening", "secrets-management", "privacy-policy", "soc-2"]
---

A **startup security baseline** is the minimum that lets customers trust you with their data: encrypted transport and storage, secrets out of code, patched systems, access control with leavers revoked, backups tested, and logging that would show what happened. Not compliance-grade — just the obvious things done before the first enterprise questionnaire arrives.

```text
baseline:  HTTPS everywhere · secrets in a manager · auto-updates on · MFA on everything
           · least-privilege access · offsite tested backups · audit log of who did what
```

Do it early because retrofitting under a customer's deadline costs ten times more, and because the first breach (or the first lost laptop with production keys) is an existential event at startup scale. None of this requires a security team — it requires an afternoon and a checklist.

The classic mistakes:

- Secrets in code and chat. API keys in repos, passwords in Slack — the most common breach vector and the easiest to fix with a secrets manager and a pre-commit hook (see [secrets management](/t/secrets-management)).
- Everyone is admin. Shared root credentials and permanent broad access mean a departure or phish compromises everything. Least privilege plus prompt deprovisioning.
- Untested backups. Backups that never restored are hope, not safety. Restore-test quarterly — the drill that finds the broken backup before the outage does.
- Security questionnaires answered aspirationally. Claiming controls you lack to win a deal creates liability and a mad scramble later. Answer honestly, commit dates for gaps, and close them.
- Ignoring the human layer. Phishing beats firewalls at startups. MFA everywhere, suspicious-link culture, and a clear "who to tell" path matter more than another tool.

**Grow into:** formal policies, [SOC 2](/t/soc-2) when enterprise deals demand it, and a security review per major release. The baseline buys the right to reach that stage.
