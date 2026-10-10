---
title: "Blameless Postmortem"
summary: "Focusing on systems rather than individuals when things go wrong."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["blameless postmortem", "post-incident review", "blameless review"]
prereqs: ["postmortem", "incident-response"]
related: ["root-cause-analysis", "five-whys", "incident-communication", "runbook", "sre"]
---

A **blameless postmortem** is a review after an [incident](/t/incident-response) that looks at the system and the process, not at who to blame. The premise is that people act reasonably given the information and tools they had at the time; if a change was risky or a dashboard was silent, the problem is the system that allowed it, not the person who pushed the button. The goal is learning that prevents a repeat.

A useful write-up covers: what users experienced, the timeline, the contributing factors, how it was mitigated, and concrete action items with owners. The action items are the part that actually reduces future incidents.

```text
blameful: "Alice deployed a bad config."
blameless: "The config change had no validation and no canary;
            the deploy path allowed it to reach all servers at once."
```

The classic mistakes:

- **Stopping at "human error".** It's a description, not an explanation. Ask why the mistake was possible and why it wasn't caught — that's where fixes live.
- **Blaming in disguise.** "They should have known better" is blame, and it teaches people to hide mistakes. It also destroys the honest input you need.
- **No actions, or actions nobody owns.** A postmortem that produces a nice document and no changes is theater. Assign each item and track it.
- Only ever writing them for big incidents. Small ones are cheap chances to learn.

Frontend and data engineers are in these reviews too — a bad client release, a broken dashboard, or a wrong backfill are all incident-shaped. Pair the review with [root-cause analysis](/t/root-cause-analysis) or [five whys](/t/five-whys) to go past the first cause, and feed lessons into the [runbook](/t/runbook) and into monitoring. This practice comes from site-reliability culture ([SRE](/t/sre)).
