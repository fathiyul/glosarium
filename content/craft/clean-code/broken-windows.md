---
title: "Broken Windows Theory"
summary: "Small neglected messes invite bigger ones."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["broken windows", "broken window effect"]
prereqs: ["code-smell"]
related: ["chestertons-fence", "cyclomatic-complexity", "technical-debt", "boy-scout-rule"]
---

The broken windows theory comes from criminology: a visibly neglected place, with a broken window left unrepaired, invites more damage. Applied to software, the idea is that small messes left in the code, such as a misleading name, a commented-out block or a failing test marked as skipped, signal that nobody cares, and more messes follow.

```python
# TODO: remove after the migration (2019)
# def old_price(item):
#     return item.price * 0.9
def price(item):
    return item.price  # TODO fix rounding
```

Each leftover makes the next one seem acceptable. A reader sees the commented-out code and assumes it's allowed to stay, and the file slowly gets harder to trust.

The trade-off is that the theory is a useful nudge rather than a proven rule. Not every messy line causes decay, and a team that obsesses over tiny flaws can stall on work that matters. Fixing things takes time that could go to features, so the question is which neglect actually spreads.

The classic mistake is treating every small imperfection as an emergency, or ignoring them all. Repair the messes that sit in the code you are changing, and leave a clear, short note for the rest. The idea was popularized in software by *The Pragmatic Programmer*. Deleting dead code is often the cheapest repair, though [Chesterton's fence](/t/chestertons-fence) reminds you to check why it was there first.
