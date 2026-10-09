---
title: "Receiving Code Review"
summary: "Taking feedback without defensiveness and resolving it clearly."
levels: { backend: junior, frontend: junior }
aliases: ["handling review feedback", "responding to review comments", "review feedback"]
prereqs: ["code-review"]
related: ["giving-code-review", "self-review", "review-comment-nits", "pull-request"]
core: [backend, frontend]
---

Getting comments on your code can sting, especially early in your career. The feedback is
about the *code*, and the goal on both sides is a better result. Reviewers who leave many
comments are usually investing in your work.

## How to respond well

- **Read all comments before replying.** Some will be connected, and some will be answered
  by another.
- **Assume good intent.** Tone is hard to read in text. If a comment seems harsh, reread it
  as neutral.
- **Answer every comment.** Either make the change and say "Done", or explain why not. Silence
  leaves the reviewer guessing.
- **Ask when you don't understand.** "Can you show me what you'd prefer?" is a fine reply.
- **Disagree politely and with reasons.** "I kept it as-is because X; does that change
  your mind?" Then listen. If you still disagree, ask a third person or the team lead
  instead of arguing in circles.
- **Don't take nits personally.** Comments marked "nit" are small and optional (see
  [review nits](/t/review-comment-nits)).

## Practical tips

- Push fixes as new commits during review so the reviewer can see what changed, and squash
  at merge if your team does that.
- Mark conversations resolved only when the change is actually made, or when the reviewer says so.
- If the same comment shows up repeatedly, fix the habit, not just the line: add a check to
  your [self-review](/t/self-review), or ask for a linter rule.
- Say thanks when someone catches a real bug. It's a good habit and makes reviews pleasant.

Reviews are one of the quickest ways to learn how experienced engineers think, so treat each
comment as a free lesson.
