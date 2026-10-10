---
title: "Break-Glass Access"
summary: "Emergency elevated access that is logged, time-limited and reviewed afterwards."
levels: { backend: senior, data-engineer: senior }
aliases: ["break-glass access", "break glass", "emergency access"]
prereqs: ["least-privilege", "iam-policy"]
related: ["incident-response", "production-console", "one-off-script", "audit-columns", "sudo-root"]
---

**Break-glass access** is emergency elevated access, deliberately designed to be used rarely and visibly. When a serious incident needs someone to do something their normal permissions don't allow — reach the production console, assume an admin role, touch a locked system — break-glass lets them do it quickly, but under controls: it's **logged**, **time-limited**, and reviewed afterwards.

The metaphor is a fire alarm: a glass box you're expected to break only in a real emergency, and which creates a record when you do. It exists so teams don't need to hold standing admin access "just in case" — the usual admin-for-everyone is what break-glass is meant to replace.

```text
normal:       least-privilege, no standing admin
break-glass:  request → granted for a short window → used → auto-expires
              → logged and reviewed the next day
```

The classic mistakes:

- Standing admin instead of break-glass. Giving admins permanent elevated rights "in case" is the opposite of [least privilege](/t/least-privilege). Break-glass lets you keep everyday access minimal.
- No logging or expiry. Access that never logs and never expires is just admin with a nicer name. The controls — an audit trail and a time limit — are the whole point.
- Shared credentials. A shared break-glass account destroys accountability; you can't tell who used it. Use per-person, attributable access.
- Never reviewing the breaks. Each use is a signal: either the incident needed it (fine, note it) or the normal permissions are too tight (fix them). No review means no learning, and possible misuse.
- Hard to use when needed. If break-glass takes 30 minutes of process during an outage, people will route around it and keep standing access. Make the legitimate path fast.

**How to run it:** grant temporary, scoped roles via your [IAM policies](/t/iam-policy), require an incident reason, log every action (see [audit columns](/t/audit-columns)), expire automatically, and review uses in the [postmortem](/t/blameless-postmortem). It pairs with careful [production console](/t/production-console) and [one-off script](/t/one-off-script) use, where the risk of accidental change is highest.
