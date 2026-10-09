---
title: "Making Mistakes in Production"
summary: "Owning up quickly when you break something."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["breaking production", "production mistakes", "owning mistakes", "I broke production", "making mistakes at work"]
prereqs: ["incident"]
related: ["blameless-postmortem", "incident", "rollback", "mitigate-first", "escalation", "psychological-safety"]
core: [backend, frontend, data-engineer]
---

At some point, you will break something in production. A bad query, a wrong config, a deploy that takes the site down. It happens to everyone, including the most senior
engineers. What matters is **how you respond**.

## When it happens

1. **Say so, immediately.** Tell your team or the on-call person right away: what you did and what you're seeing. The most damaging thing is hiding it or hoping nobody notices
   while it gets worse. The fastest fix usually starts with the person who knows what changed ([escalation](/t/escalation)).
2. **Help stop the damage first.** Roll back, disable the feature, revert the change ([rollback](/t/rollback), [mitigate first](/t/mitigate-first)). Investigate afterwards.
3. **Stay calm and factual.** "I ran X at 14:02, and error rates went up at 14:03" is more useful than apologizing at length.
4. **Don't pile on changes** out of panic. Make one move at a time, and say what you're doing.
5. **Don't cover it up or quietly "fix" it.** Honesty keeps trust, and also keeps the timeline accurate for whoever's debugging.
6. **Tell affected people** what happened and what you know ([incident communication](/t/incident-communication)).

## Afterwards

- **Take part in the review.** Blameless postmortems ask "how did the system let this happen?" and not "who's at fault?"
  ([blameless postmortems](/t/blameless-postmortem)). If a single person's action could cause an outage, the lack of guardrails is the real finding: missing review,
  missing staging check, too much access.
- **Write down what you learned**, and fix the gap: a test, a check, a confirmation prompt, a runbook step.
- **Learn from it without self-punishment.** Feeling bad is normal. Staying stuck on it doesn't help anyone.

## Reducing the odds

- Check which environment and database you're connected to before running anything destructive.
- Test risky changes elsewhere first. Prefer reviewed scripts over typing commands live.
- Use least privilege and be careful with production access ([least privilege](/t/least-privilege)).
- Make changes small, reversible and observable ([deployment](/t/deployment)).

Teams where people can report their own mistakes without fear fix problems faster and have fewer repeat incidents ([psychological safety](/t/psychological-safety)). People
who hide mistakes make everything worse.
