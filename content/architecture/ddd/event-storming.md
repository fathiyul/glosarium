---
title: "Event Storming"
summary: "A workshop for discovering a domain through its events."
levels: { backend: senior, frontend: senior }
aliases: ["event storming", "eventstorming", "domain discovery workshop"]
prereqs: ["ubiquitous-language", "domain-driven-design"]
related: ["ubiquitous-language", "bounded-context", "domain-event"]
---
**Event Storming** is a collaborative modelling workshop: domain experts and developers cover walls with sticky notes — domain events (orange, past tense) first, then commands, aggregates, policies and questions — discovering the business flow together, in hours, with everyone literally on the same page.

```text
events (orange):   OrderPlaced → Paid → Shipped → Delivered
commands (blue):   PlaceOrder, PayOrder…   policies (lilac): "when X then Y"
read models (green), hotspots (red dots marking disagreement or open questions)
```

Its power is social as much as technical: experts correct developers' misunderstandings in real time, ambiguous terms surface visibly (three meanings of "account" on one wall), and bounded contexts emerge from event clusters rather than org charts. The wall becomes the shared model photographable into design.

The classic mistakes:

- Developers-only storming. Without domain experts, the wall models developers' guesses — confidently wrong ubiquitous language. Experts mandatory, not optional.
- Solutioneering during discovery. Debating databases and frameworks while events are still unclear wastes the experts' time. Problem space first; solution space after.
- Facilitation-free chaos. Unstructured walls produce noise, dominant voices and missing flows. Facilitate: timebox, diverge-then-converge, explicitly invite quiet experts.
- Ignoring the red dots. Hotspots (disagreements, unknowns) are the valuable output — marking where modelling is needed. Discussing only the easy agreements learns nothing.
- One-and-done modelling. A single workshop fossilising into permanent design ignores evolving understanding. Re-storm hotspots and new areas as the domain clarifies.
- Skipping to aggregates. Jumping to structure before events flow freely designs boundaries around guesses. Events first, clusters second, boundaries last.
- No follow-through. Wall photos nobody transcribes into models, code and language decay within weeks. Convert promptly: contexts, events, language into the repository.

**How to run it:** experts plus developers, events first, facilitated timeboxes, hotspots honoured, prompt transcription into model and code. Discovery at wall speed, captured before it evaporates.
