---
title: "AI Product UX"
summary: "Designing interfaces for uncertain, streaming, sometimes-wrong AI output."
levels: { frontend: senior }
aliases: ["AI product UX", "AI interface design", "generative UX"]
prereqs: ["llm-streaming", "accessibility"]
related: ["llm-streaming", "guardrails", "microinteractions"]
---
**AI product UX** is the design of interfaces around model output that is probabilistic, sometimes wrong and sometimes slow. The job is to make the system's capability and limits legible, so users trust it in proportion to how reliable it actually is, and so that errors are cheap to notice and correct.

```text
input → generated draft (visibly provisional) → user reviews → accept, edit or discard
```

Good AI interfaces show sources where claims are made, mark output as generated, make editing easy, expose what the system used as input, and offer a clear path back to a human. They also set expectations about speed, since generation takes time that users must be able to tolerate.

The classic mistakes:

- Presenting generated output as authoritative. Confident formatting makes errors look like facts. Mark provisional content and show its basis.
- No correction path. If users cannot easily edit, retry or report a bad answer, errors persist. Make correction a first-class action.
- Hiding latency. A blank wait with no feedback feels broken. Stream partial results and show progress.
- Overpromising capability. A demo that works on curated input sets expectations the product cannot meet. Describe what it does well and where it struggles.
- Ignoring failure states. Refusals, timeouts and empty results need designed messages, not generic errors.

**The principle:** calibrate trust. Users should rely on the system exactly as much as its track record justifies, and the interface should make that visible.

Run usability sessions with realistic, messy inputs rather than polished examples. Watch where people hesitate before accepting an answer, and where they quietly stop trusting it. Those moments show the calibration problem more clearly than any survey.
