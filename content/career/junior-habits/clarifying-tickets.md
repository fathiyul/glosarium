---
title: "Clarifying Tickets"
summary: "Asking questions before building the wrong thing."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["clarifying requirements", "asking about tickets", "refining tickets", "unclear requirements"]
prereqs: ["ticket", "asking-good-questions"]
related: ["acceptance-criteria", "user-story", "working-with-product", "backlog-refinement", "definition-of-ready", "saying-no"]
core: [backend, frontend, data-engineer]
---

Tickets are often vague, incomplete or based on assumptions. Starting to code from a vague ticket is how people build the **wrong thing quickly**. A few
questions up front save days.

## What to check before starting

- **What problem are we solving, and for whom?** If you only know the "what" and not the "why", you can't make good decisions about the details.
- **What does done look like?** Are there [acceptance criteria](/t/acceptance-criteria)? If not, propose them.
- **What are the edge cases?** Empty states, errors, permissions, large inputs, mobile, other time zones.
- **What's in scope, and what's not?** Ask where the boundary is.
- **Are there designs, examples or similar existing behavior** to follow?
- **What depends on this**, and what does it depend on? Other teams, APIs, data?
- **How urgent is it?** Is there a real date or an assumed one?

## How to ask

- **Ask the right person**: the ticket author or the product owner ([working with product](/t/working-with-product)).
- **Propose a solution, don't just ask.** "I'm planning to show an inline error and keep the form data. Does that match what you want?" is quicker to answer than "What should happen?"
- **Write it in the ticket**, so the answer is visible to everyone and survives the conversation.
- **Batch your questions** rather than interrupting with ten messages.
- **Restate your understanding** in a sentence or two, and get confirmation.

> "Before I start: I understand this as 'let users export their orders as CSV, last 12 months, from the orders page, including cancelled ones'. Is that
> right? Also, should the export be limited to 10,000 rows?"

## When you can't get an answer

If the person is unavailable, choose the most reasonable interpretation, **write it down as an assumption** in the ticket or PR, and carry on. It's better than
blocking and better than guessing silently.

A ticket that stays unclear after a reasonable attempt may need to go back for [refinement](/t/backlog-refinement) before anyone starts. Asking questions isn't slowness. It's part of doing the work well.
