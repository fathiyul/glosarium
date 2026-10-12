---
title: "Rubber Duck Debugging"
summary: "Explaining the problem out loud until you spot the bug."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["rubber duck", "rubber ducking", "rubber duck method"]
prereqs: ["debugging"]
related: ["debugging", "minimal-reproducible-example", "pairing", "print-debugging"]
core: [backend, frontend, data-engineer]
---

**Rubber duck debugging** means explaining your code, line by line and out loud, to a
rubber duck (or a plant, a teammate, a text box). Very often you spot the bug halfway through
the explanation.

It works because explaining forces you to slow down and say what the code *actually* does,
not what you *assume* it does. Your brain skips over details it thinks it already knows;
speaking them out loud exposes the gap.

## How to do it

1. Pick your listener. A duck is fine, as it can't interrupt.
2. Say what the code is **supposed** to do.
3. Walk through it one line at a time: "Here I get the user... then I loop over their
   orders... and here I assume `orders` is never empty..." Listen for the places where you
   hesitate or say "and then it just..."
4. Say what you **expect** at each step, then check it.

Writing works as well. Composing a clear question for a teammate or a forum (with the code,
what you expect, what happens and what you've tried) often answers it before you hit send.
That's close to making a [minimal reproducible example](/t/minimal-reproducible-example).

## When to use it

- You've been staring at the same lines for 20 minutes.
- Your hypothesis keeps failing and you're out of ideas.
- Before asking for help. It respects other people's time, and you might not need them.

If explaining doesn't help, talking to a real person (see [pairing](/t/pairing)) is the next
step. Getting stuck is normal; being stuck silently for hours isn't useful to you or the team.
