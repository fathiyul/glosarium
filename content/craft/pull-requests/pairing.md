---
title: "Pair Programming"
summary: "Two people working on the same code at the same time."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["pair programming", "pairing session", "mob programming"]
prereqs: ["code-review", "asking-good-questions"]
related: ["mob-programming", "mentoring", "giving-feedback", "rubber-duck-debugging", "code-review"]
---

Pair programming is two people working on the same code at the same time, usually at one screen or in a shared session. One **drives** (types), and the other **navigates** (thinks ahead, spots mistakes, looks things up). They swap roles often.

## Why do it

- **Fewer bugs**, because a second person catches mistakes as they happen, like a live code review.
- **Knowledge sharing**: how a system works, shortcuts, how someone debugs.
- **Faster onboarding**: a new teammate learns the code and conventions by working on real tasks.
- **Unsticking**: talking through a problem often solves it ([rubber duck debugging](/t/rubber-duck-debugging)).
- **Focus**: harder to wander off when someone's with you.

## When it works best

- Hard or unfamiliar problems, tricky debugging.
- Onboarding and mentoring ([mentoring](/t/mentoring)).
- Design decisions that benefit from discussion.
- Risky changes before they hit review.

Routine, well-understood tasks may go faster alone.

## How to do it well

- **Agree on the goal** first, and write down the plan.
- **Switch roles** every 15 to 30 minutes, or by task.
- **Navigators think at a higher level**: what's next, edge cases. They don't dictate every keystroke.
- **Be patient and kind.** Different speeds and styles are normal.
- **Use good tools**: screen share with control, or an editor with live sharing for remote pairing.
- **Take breaks.** It's intense.
- **Keep it voluntary** where you can, and don't force it all day.
- **Say when you're lost**, and ask questions.

## Variations

- **Ping-pong pairing** (with TDD): one writes a failing test, the other makes it pass, then they swap.
- **Mob programming**: a whole team on one problem at once ([mob programming](/t/mob-programming)).
- **Async alternatives**: detailed reviews and written explanations.

Pairing isn't a replacement for review, and isn't a test of ability. It's a way to learn and build together.
