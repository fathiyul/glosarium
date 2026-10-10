---
title: "Runbook"
summary: "Step-by-step instructions for operating or fixing a system."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["playbook", "operations guide"]
prereqs: ["docs-as-code"]
related: ["incident-response", "onboarding-docs", "blameless-postmortem", "health-check"]
also: [incidents, production-work]
---

A runbook is a set of step-by-step instructions for operating a system or fixing a known problem. It's written for the person on call, who may be tired, under pressure, and unfamiliar with the system. Each step says what to check, what command to run, and what the expected result looks like.

```
Symptom: order API returns 503
1. Check the health endpoint:  curl -i https://orders.example.com/health
2. If it reports the database as down, go to "Database unreachable" below.
3. If the web app is healthy but slow, go to "High latency" below.
4. Escalate to the payments on-call if the error rate stays above the threshold the team has agreed on.
```

The value is in the specifics. A runbook that says "restart the service" is less useful than one that gives the command, the expected output, and the next step when the restart doesn't help.

The trade-off is maintenance. A runbook is only as good as its last test, and commands, dashboards and names change. An out-of-date runbook sends an on-call engineer down the wrong path at the worst moment.

The classic mistake is writing a runbook once and never running through it. Test the steps in a safe environment or during a planned drill, and update the page straight after a real incident. The steps usually come from the [incident response](/t/incident-response) process, and the [health check](/t/health-check) is often the first thing a runbook tells the operator to look at.
