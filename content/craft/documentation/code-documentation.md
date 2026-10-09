---
title: "Docstrings / JSDoc"
summary: "Documenting functions and modules right next to the code."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["docstring", "JSDoc", "inline documentation", "API docs comments"]
prereqs: ["comment"]
related: ["comment", "readme", "technical-writing", "api-documentation", "type-annotation"]
---

Code documentation means documenting functions, classes and modules right next to the code, in a format that tools can turn into help text and reference pages.

```python
def apply_discount(price: float, percent: float) -> float:
    """Return price reduced by percent.

    Args:
        price: the original price, in the shop's currency.
        percent: a discount from 0 to 100.

    Raises:
        ValueError: if percent is outside 0-100.
    """
```

```js
/**
 * Returns the price reduced by a percentage.
 * @param {number} price - original price
 * @param {number} percent - discount from 0 to 100
 * @returns {number}
 * @throws {RangeError} if percent is outside 0-100
 */
function applyDiscount(price, percent) { ... }
```

Python calls these docstrings. JavaScript and Java use JSDoc and Javadoc-style comments. Editors show them on hover and in autocomplete, and tools generate documentation sites.

## What to document

- **Public functions and classes**: what they do, the meaning of each parameter, what's returned, what can go wrong.
- **Non-obvious behavior**: units, time zones, side effects, assumptions.
- **Modules**: a short note at the top on what's inside and why.
- **Examples** of use, which often teach faster than prose.

## What not to do

- **Don't repeat the code.** `"""Adds a and b."""` for `add(a, b)` is noise. Say something the signature doesn't.
- **Don't let it rot.** A wrong docstring is worse than none. Update it when the code changes.
- **Don't document every private helper.** Good names ([naming](/t/naming)) and type annotations ([type annotations](/t/type-annotation)) carry a lot of the load.

## Tips

- The first line should be a short summary in one sentence.
- Use the format your team and tools expect.
- Treat docs as part of the change in code review.
- For decisions and reasons, write comments or longer documents ([comments](/t/comment), [README](/t/readme)).
