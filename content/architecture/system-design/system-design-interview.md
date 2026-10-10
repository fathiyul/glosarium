---
title: "System Design Interview"
summary: "The interview format, and how it differs from real design work."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["system design interview", "design interview", "architecture interview"]
prereqs: ["system-design", "clarifying-requirements"]
related: ["system-design", "capacity-planning", "load-balancer"]
---
The **system design interview** asks candidates to architect a system live (TinyURL, news feed, chat): clarify requirements, estimate scale, sketch APIs and data models, evolve the design under constraints. It assesses structured thinking under ambiguity — trade-offs, prioritisation and communication — more than encyclopaedic component knowledge.

```text
clarify (5 min) → estimates → core design → deep dives → failure/scale → review
```

Strong performances share a shape: questions before boxes, numbers before components, one clean core before embellishments, trade-offs stated aloud, and time managed across the arc. Interviewers probe depth by adding constraints (10× scale, a regional failure, a consistency demand) — the design must bend without breaking.

The classic mistakes:

- Silent designing. Drawing without narrating hides reasoning — the actual thing being evaluated. Think aloud, especially trade-offs.
- Skipping clarification. Designing the wrong scale or feature set wastes the round. Ask first; interviewers expect it.
- Buzzword components. Dropping Kafka/Kubernetes without justification signals memorisation, not judgement. Every component earns its place against requirements.
- No estimates. "Millions of users" without QPS/storage/bandwidth math can't size anything. Back-of-envelope early, even roughly.
- One rigid design. Clinging to the first sketch when the interviewer adds constraints fails the adaptability test. Evolve cheerfully; note what changes and why.
- Ignoring failure. No discussion of what breaks and how the system degrades leaves the design half-done. Failure handling is a scoring category, not a bonus.
- Time mismanagement. Twenty minutes on requirements leaves no design. Pace the arc; land a complete, simpler design over a fragment of brilliance.

**How to prepare:** rehearse the arc (clarify → estimate → core → scale → fail), practise estimation until fluent, and study trade-offs rather than tools. The interview rewards judgement communicated clearly — the same skill the job needs daily.
