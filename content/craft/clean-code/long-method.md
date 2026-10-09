---
title: "Long Method"
summary: "A function doing too much; one of the most common smells."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["long function", "large function", "god function"]
prereqs: ["function"]
related: ["extract-function", "code-smell", "single-responsibility-principle", "nesting-depth", "refactoring"]
---

A long method is a function that has grown to do too much. It's one of the most common code smells, because functions rarely start long. They accumulate a line here and an `if` there.

Signs:

- You have to scroll to see it all.
- It has sections separated by blank lines or comments like `# validate`, `# calculate`, `# save`.
- Its name is vague (`process`, `handle`, `run`), because it does many things.
- It mixes levels of detail: business rules next to string formatting and database calls.
- It's hard to test, because every test must set up everything.

```python
def place_order(request):
    # validate
    ...30 lines...
    # compute prices and discounts
    ...40 lines...
    # save
    ...20 lines...
    # send emails
    ...15 lines...
```

## The fix

Extract each section into a function named for its purpose ([extract function](/t/extract-function)):

```python
def place_order(request):
    order = validate(request)
    priced = apply_pricing(order)
    saved = save(priced)
    notify_customer(saved)
    return saved
```

Now the top-level function reads like an outline. Each piece is small, testable on its own and has a name that explains it.

## Rules of thumb

- **No hard line limit.** Many teams aim for functions that fit on one screen, and that you can describe in one sentence ([single responsibility](/t/single-responsibility-principle)).
- **Comments that label sections** are a hint to extract.
- **Deep nesting** often goes along with length ([deep nesting](/t/nesting-depth)).
- **Don't split mechanically.** Pieces should be meaningful units, not arbitrary slices with ten parameters each.
- Refactor with tests passing ([refactoring](/t/refactoring)).
