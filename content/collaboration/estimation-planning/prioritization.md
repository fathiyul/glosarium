---
title: "Prioritization"
summary: "Deciding what to do first: impact vs effort, urgent vs important."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , tech-entrepreneur: mvp }
aliases: ["prioritising", "prioritizing work", "priority setting", "what to work on first"]
prereqs: ["estimation"]
related: ["prioritization-frameworks", "cost-of-delay", "saying-no", "timeboxing", "roadmap", "scope-creep"]
core: [backend, frontend]
---

There's always more to do than time to do it. **Prioritization** is deciding **what to do first, what later, and what not at all.** Doing it well is one of the biggest differences between busy people and effective ones.

## Two useful ways to look at work

**Impact vs effort.** Plot each item by how much value it creates, and how much work it takes:

| | Low effort | High effort |
|---|---|---|
| **High impact** | **Do first** (quick wins) | **Plan carefully** (big bets) |
| **Low impact** | Do if there's time | **Avoid** (time sinks) |

**Urgent vs important** (the Eisenhower matrix). Urgent things demand attention now. Important things move you toward goals. Many urgent things aren't important (interruptions), and many important things are never urgent (tests, tooling, learning, reducing debt), so they get postponed forever unless you make space.

## Questions to ask

- **What happens if we don't do this**, or do it later? What's the **cost of delay** ([cost of delay](/t/cost-of-delay))?
- **Who benefits, and how many people?** What outcome does it change ([impact](/t/impact))?
- **Is anything blocked on it?** Dependencies raise priority.
- **Is there a deadline** that's real (a regulation, a launch, a contract) rather than assumed?
- **How sure are we** about the value and the effort? Uncertain items may deserve a small spike first ([estimation](/t/estimation)).
- **Is it reversible?** Cheap, reversible decisions can be made fast.
- **Risk**: security, data loss and reliability issues often outrank features.

## Habits

- **Keep a short, visible, ordered list.** Ten "top priorities" means none. Work on one or two at a time and limit work in progress.
- **Make trade-offs explicit.** "We can do A or B this sprint, not both. A gives X, B gives Y. Which?" ([saying no](/t/saying-no))
- **Decide with your manager, product owner and team**, not alone, and communicate changes.
- **Re-evaluate regularly**, since priorities shift. But don't thrash: constant switching has its own cost ([context-switching cost](/t/context-switching-cost)).
- **Protect time for the important-but-not-urgent**, such as reliability and tooling.
- **Say what you're deprioritizing**, so people aren't surprised.
- **Use a framework** when stakeholders disagree ([prioritization frameworks](/t/prioritization-frameworks)). They structure the conversation, but they don't replace judgment.

For a junior or mid-level engineer, the practical version is: when you have several tasks, ask what's blocking others, what has a real deadline, and what delivers the most value, and then check your plan with whoever sets the team's priorities.
