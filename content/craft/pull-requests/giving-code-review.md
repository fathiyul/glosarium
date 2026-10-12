---
title: "Giving Code Review"
summary: "Reviewing others' code helpfully: priorities, tone and turnaround."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["reviewing pull requests", "how to review code", "reviewing code", "being a good reviewer"]
prereqs: ["code-review", "pull-request"]
related: ["review-comment-nits", "review-turnaround", "approve-request-changes", "receiving-code-review", "self-review", "small-prs"]
core: [backend, frontend]
---

Reviewing someone else's code well is a skill. The purpose isn't to prove you're clever. It's to **make the change better and the team stronger**, quickly and kindly.

## What to look at, in priority order

1. **Does it do what it's meant to?** Read the ticket and description first. Check the logic, edge cases, error handling and failure modes.
2. **Is the design sound?** Does it fit the existing code? Is it too complex, in the wrong place, or hard to change later?
3. **Is it safe?** Security (authorization, input handling, secrets), data loss risks, migrations, performance on large data.
4. **Is it tested?** Do the tests cover the behavior and the unhappy paths, and would they fail if the code broke?
5. **Is it readable?** Names, structure, comments where needed.
6. **Style last**, and only what tools don't already enforce. Formatters and linters should settle formatting, not people.

## How to comment

- **Be specific and explain why.** "This will fail when `items` is empty (line 42), because `max()` raises on an empty sequence" helps. "This is wrong" doesn't.
- **Ask questions** when you're not sure: "What happens if the payment call times out here?"
- **Suggest, don't dictate**, and offer an alternative or a code suggestion when you have one.
- **Separate must-fix from preferences.** Mark small optional points as "nit:" ([nits](/t/review-comment-nits)), and say what blocks approval.
- **Comment on the code, not the person.** "This function does three things" rather than "you wrote a messy function".
- **Praise good work** ("nice catch on the race here"). It's useful feedback and it builds trust.
- **Don't rewrite it in your own style.** If it's correct and consistent with the codebase, a different taste isn't a reason to block.

## Habits

- **Be quick.** A change waiting for days costs the author context and the team momentum ([review turnaround](/t/review-turnaround)). Reviewing is part of your job, not an interruption.
- **Review in a focused session**, not scattered over a day. Start with the description and the big picture, then the details.
- **Run it** for risky or UI changes, instead of only reading.
- **Don't review huge PRs line by line.** Ask for a split ([small PRs](/t/small-prs)).
- **Pick the right verdict**: approve, approve with minor comments, or request changes ([approve vs request changes](/t/approve-request-changes)).
- **Talk instead of arguing in comments.** If a thread goes back and forth more than twice, talk it through.
- **Learn from it.** Reading other people's code is how you grow.

Tone matters in text. Assume good intent, and write the way you'd want your own review to read ([receiving code review](/t/receiving-code-review)).
