---
title: "Technical Decision Making"
summary: "Gathering input, weighing trade-offs, deciding, and recording why."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["making technical decisions", "engineering decision making", "decision-making in engineering", "architecture decisions process"]
prereqs: ["architectural-trade-offs", "design-doc"]
related: ["one-way-two-way-doors", "architecture-decision-record", "design-doc", "disagree-and-commit", "architectural-trade-offs", "rfc-process"]
core: [backend, frontend]
---

Engineers make decisions constantly, from naming a variable to choosing a database. Making **good technical decisions**, and making them in a way that the team follows, is a senior skill. It's a mix of reasoning, process and communication.

## A reliable process

**1. Frame the problem.** What are we deciding, and why now? What are the **constraints** (time, budget, skills, existing systems) and the **goals** (performance, reliability, speed of delivery)? Many bad decisions solve the wrong problem.

**2. Decide how much care it deserves.** Is it reversible ([one-way or two-way door](/t/one-way-two-way-doors))? Cheap, reversible decisions: decide fast. Expensive, irreversible ones: invest in analysis.

**3. Decide who decides, and how.** Be explicit: is it one person's call after consulting others, a team consensus, or an architecture group? Unclear decision rights cause delay and resentment.

**4. Generate real options.** Include "do nothing" and "the simplest thing". Avoid a false choice between two options that were already favored.

**5. Pick criteria, and weigh trade-offs.** What matters here (cost, complexity, operability, performance, team familiarity, risk, time to deliver)? Compare options against them honestly, with data where possible: prototypes, benchmarks, numbers from a [back-of-the-envelope](/t/back-of-envelope) estimate ([architectural trade-offs](/t/architectural-trade-offs)).

**6. Gather input.** Ask the people who'll build, run or be affected by it. Write a short proposal or [design doc](/t/design-doc) for bigger decisions, so that thinking is visible and can be critiqued.

**7. Decide, and state the reasoning.** Choose, say why, say what you're giving up, and what would make you reconsider.

**8. Record it.** An [architecture decision record](/t/architecture-decision-record) preserves the context for future readers.

**9. Communicate and commit.** Tell everyone affected. Once decided, the team moves together, even those who preferred another option ([disagree and commit](/t/disagree-and-commit)).

**10. Revisit with evidence.** Check outcomes. If facts change, change the decision without ego.

## Biases and traps

- **Novelty bias**: choosing the exciting new tool over the proven one. Every unfamiliar technology has a cost.
- **Sunk cost**: defending a decision because of past investment.
- **Resume-driven decisions**: picking technology to learn it, not because the project needs it.
- **Bikeshedding**: spending hours on trivial choices (naming, formatting) because they're easy to have opinions on, while skipping hard ones. Automate or delegate small ones.
- **Analysis paralysis**: waiting for certainty that never comes.
- **HiPPO** (highest-paid person's opinion): decisions made by rank, not reasoning. Encourage people to bring evidence, and seniors to speak last.
- **Groupthink and false consensus**: silence isn't agreement. Invite dissent explicitly.
- **Overconfidence** in estimates and in how much you know.
- **Ignoring operational cost**: the day-two burden of running what you chose.

## Habits of good decision makers

- **Separate facts, assumptions and opinions.**
- **Ask "what would make this wrong?"** and plan for that.
- **Make decisions reversible by design** where possible.
- **Be transparent** about uncertainty and trade-offs.
- **Own the outcome**, including when it goes badly, and learn from it ([postmortems](/t/postmortem)).
- **Disagree respectfully**, and keep it about the options, not people.

Good decisions are made with the information at hand and good reasoning, and aren't judged only by how they turn out.
