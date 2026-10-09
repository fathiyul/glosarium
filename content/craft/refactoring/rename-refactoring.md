---
title: "Rename"
summary: "Changing a name everywhere it's used, safely."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["rename refactoring", "renaming symbols", "rename variable"]
prereqs: ["naming", "refactoring"]
related: ["naming", "automated-refactoring", "refactoring", "readability", "api-versioning"]
---

Renaming means changing the name of a variable, function, class, file or field to something clearer, everywhere it's used. It's the simplest and one of the most valuable refactorings, because good names are the cheapest documentation ([naming](/t/naming)).

```python
# before
def calc(d, r):
    return d * (1 - r)

# after
def price_after_discount(price, discount_rate):
    return price * (1 - discount_rate)
```

## Do it with a tool

Use your editor's rename (often F2): it changes the definition and all references, understanding scope, so it doesn't touch unrelated names ([IDE refactoring tools](/t/automated-refactoring)). Plain search and replace will happily rename `id` in places you didn't mean.

## When to rename

- The name is **vague or misleading** (`data`, `temp`, `process`, or a name that no longer matches what the code does).
- The **meaning changed** over time but the name didn't.
- You learned the domain's real term ([ubiquitous language](/t/ubiquitous-language)).
- You can't read the code aloud without explaining.

## Things the tool may miss

- **Strings and dynamic access**: `getattr(obj, "old_name")`, JSON keys, template variables.
- **Configuration, SQL and database columns**, and API fields.
- **Other repositories and services** that use your public names.
- **Documentation and comments.**

Renaming a database column or an API field is a breaking change, and needs a gradual process ([expand and contract](/t/expand-contract-migration), [API versioning](/t/api-versioning)).

## Habits

- **Rename as soon as you notice**, since it only gets more expensive.
- **Do it in its own commit** so reviewers can skim it ([atomic commits](/t/atomic-commit)).
- **Run the tests** afterwards.
- **Rename files and folders** to match, and tell the team about big renames to avoid conflicts.
