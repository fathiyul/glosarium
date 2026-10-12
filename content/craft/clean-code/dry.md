---
title: "DRY (Don't Repeat Yourself)"
summary: "Every piece of knowledge should have one authoritative place."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["Don't Repeat Yourself", "DRY principle", "don't repeat yourself"]
prereqs: ["function", "clean-code"]
related: ["wet-code", "premature-abstraction", "single-responsibility-principle", "kiss"]
core: [backend, frontend, data-engineer]
---

**DRY** (Don't Repeat Yourself) says every piece of *knowledge* should live in one place. If
a rule has to change, you change it once and everything stays consistent.

```python
# Repeated: the tax rule lives in three places
total_a = price_a * 1.2
total_b = price_b * 1.2
total_c = price_c * 1.2

# DRY: one place to change
TAX_RATE = 0.2
def with_tax(price):
    return price * (1 + TAX_RATE)
```

If the tax rate changes, the first version needs three correct edits, and someone will miss
one. That's the real cost of duplication: **inconsistent changes**, not extra lines.

## DRY is about knowledge, not text

Two pieces of code that *look* the same but represent **different ideas** shouldn't
necessarily be merged. If they will change for different reasons, merging them couples things
that should be independent. For example, a "validate username" rule and a "validate product
name" rule can both be `len(x) <= 50` today, but they're different rules.

## The over-DRY trap

Squeezing similar code into one function with flags and special cases creates something harder
to understand than the duplication was:

```python
def render(item, is_admin=False, compact=False, for_email=False, legacy=False): ...
```

A guideline many people use: tolerate duplication until you've seen it **three times**, and
you understand what really varies. A wrong abstraction is more costly than a bit of
duplication (see [premature abstraction](/t/premature-abstraction)).

The opposite of DRY is sometimes called [WET](/t/wet-code) ("write everything twice").
Think of DRY as a question: *if this changes, how many places must I touch?*
