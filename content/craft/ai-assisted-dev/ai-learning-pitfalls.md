---
title: "Learning While Using AI"
summary: "Using AI without skipping the understanding a junior needs to build."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["learning with AI", "AI and learning", "over-reliance on AI"]
prereqs: ["ai-coding-assistant"]
related: ["reviewing-ai-code", "hallucination", "prompting-for-code", "debugging", "vibe-coding"]
core: [backend, frontend, data-engineer]
---

AI assistants can write working code in seconds, which makes it easy to ship something you
don't understand. When you're starting out, the risk isn't that the AI is wrong. It's
that you stop building the skills that let you notice.

## The traps

- **Pasting without reading.** If you can't explain a line, you can't debug it, change it or
  defend it in review. It's now *your* code.
- **Skipping the struggle.** Working through a problem is how understanding forms. If AI solves
  every problem first, you get the answer without the learning.
- **Trusting confident answers.** AI output can be wrong, outdated or invent functions that don't
  exist ([hallucination](/t/hallucination)). It sounds equally sure either way.
- **Fixing symptoms in a loop.** Pasting each error back and accepting each patch can pile up
  changes that no one understands.
- **Not knowing what to ask.** Without fundamentals you can't judge a good prompt or answer.

## Habits that keep you learning

1. **Try first**, even briefly, so you have a mental model to compare against.
2. **Ask for explanations**, not only code: "why does this work?", "what are the alternatives
   and trade-offs?"
3. **Explain it back** in your own words, or to a teammate. If you can't, ask again.
4. **Run it, test it and read the diff** before keeping anything
   ([reviewing AI code](/t/reviewing-ai-code)).
5. **Check against the official docs** when it matters ([reading docs](/t/reading-docs)).
6. **Keep practicing the basics** by hand: reading errors, using the [debugger](/t/debugger),
   writing small functions from scratch.

A good test: could you rewrite this solution from memory tomorrow, and would you notice
if it were subtly wrong? Used that way, AI is a patient tutor and a fast pair of hands.
Used otherwise, it hides the gaps you most need to see. Also see
[vibe coding](/t/vibe-coding) for what happens at the extreme.
