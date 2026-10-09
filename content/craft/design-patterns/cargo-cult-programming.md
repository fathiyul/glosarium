---
title: "Cargo Cult Programming"
summary: "Copying code or rituals without understanding why they work."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["cargo cult", "copy-paste programming"]
prereqs: ["readability"]
related: ["anti-pattern", "asking-good-questions", "reading-docs", "searching-effectively", "ai-learning-pitfalls"]
---

Cargo cult programming is copying code, patterns or rituals without understanding why they work, in the hope that they'll work again. The name comes from island cults that built imitation airstrips after the war, expecting cargo planes to land.

```python
# Copied from somewhere. Nobody knows why it's here.
time.sleep(0.5)          # "needed or it breaks"
os.environ["FOO"] = "1"  # "don't remove"
try:
    ...
except Exception:
    pass                 # "makes the errors go away"
```

Other forms:

- Pasting a Stack Overflow answer or an AI suggestion that happens to work, without knowing what each line does ([learning while using AI](/t/ai-learning-pitfalls)).
- Following a pattern because "that's how we do it" ([design patterns](/t/design-pattern) applied where they don't fit).
- Adding configuration flags, retries or sleeps until a bug seems to disappear.
- Using a framework's incantations without knowing the idea behind them.

## Why it's risky

- **It breaks in ways you can't diagnose.** When the magic stops working, you have no model of why.
- **It carries hidden bugs and security holes** from the original context.
- **It spreads.** The next person copies your copy.
- **It stalls learning.**

## What to do

- **Understand before you paste.** Read each line. If you can't explain it, look it up ([reading docs](/t/reading-docs)).
- **Shrink it**: remove lines until it stops working, so you learn what each does.
- **Ask why** the existing code does something, and write down the answer in a comment ([understand before you change](/t/understand-before-changing)).
- **Question rituals.** Is that sleep really needed, or masking a race condition?
- **Ask good questions** when stuck ([asking good questions](/t/asking-good-questions)).

Copying code isn't wrong. Not understanding it is.
