---
title: "Two Generals' Problem"
summary: "Why agreement over an unreliable link can't be guaranteed."
levels: { backend: senior, data-engineer: senior }
aliases: ["two generals problem", "two armies problem", "coordinated attack"]
prereqs: ["cap-theorem", "consensus"]
related: ["consensus", "idempotence", "at-least-once"]
---
The **Two Generals' Problem** proves perfect agreement over unreliable channels is impossible: two generals must attack simultaneously, communicating only through messengers who may be captured. Every acknowledgement needs its own acknowledgement, ad infinitum — no finite exchange guarantees both attack together.

```text
attack at dawn? → yes! → did you get my yes? → yes… (never certain)
```

It's not a puzzle with a clever solution — it's the proof that distributed certainty is unreachable, and the reason practical systems settle for probability plus idempotence: TCP handshakes, three-phase-ish commits, and at-least-once delivery with deduplication all accept "almost surely agreed" plus "repetition is safe."

The classic mistakes:

- Designing for certainty. Protocols assuming "both sides know" break on the first lost final-ack. Assume uncertainty; make repetition harmless.
- Infinite acknowledgement chains. Adding ack-of-ack-of-ack approaches certainty asymptotically while never arriving — and multiplies traffic. Stop at sufficiency plus idempotence.
- Ignoring it in commit protocols. 2PC's blocking window *is* the two generals manifest: coordinator uncertainty freezes participants. Sagas and idempotent retries accept the lesson.
- Timeout-as-truth. "No reply means no" confuses loss with refusal. Timeouts trigger safe defaults and retries, never conclusions about remote state.
- Assuming ordered channels fix it. FIFO delivery still loses the last message's certainty. Ordering helps reasoning; it doesn't create agreement.
- Forgetting the human version. Deploy coordination ("did everyone apply the migration?") faces the same impossibility — use idempotent migrations and verification, not acknowledgement chains.

**The takeaway:** agreement over lossy channels is probabilistic; safety comes from idempotence, not certainty. Design systems that survive disagreement rather than protocols that pretend it away.
