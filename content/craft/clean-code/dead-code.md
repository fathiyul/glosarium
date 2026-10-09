---
title: "Dead Code"
summary: "Code that never runs and should be deleted."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["unused code", "unreachable code"]
prereqs: ["refactoring"]
related: ["technical-debt", "linter", "refactoring", "boy-scout-rule", "feature-flag-cleanup"]
---

Dead code is code that never runs or whose result is never used: unreachable branches, unused functions, variables nobody reads, old feature-flag paths, commented-out blocks.

```python
def total(items):
    legacy_total = sum(i.old_price for i in items)    # never used
    return sum(i.price for i in items)

    print("done")                                      # unreachable, after return

# def old_discount(order): ...                         # commented out "just in case"
```

## Why remove it

- **It costs reading time.** Every reader wonders whether it matters.
- **It misleads**, and rots. It's no longer tested or maintained, so it quietly becomes wrong.
- **It hides real code** in search results and complicates refactoring.
- **It carries risk**: dead code can still hold old vulnerabilities, or be revived by accident.

## Why it's safe to delete

Version control remembers everything. If you ever need it, `git log` and `git show` bring it back, so don't comment out code to keep it ([Git](/t/git)).

## Finding it

- **Linters and editors** flag unused variables, imports and unreachable statements ([linters](/t/linter)).
- **Coverage reports** show lines that no test reaches ([test coverage](/t/test-coverage)), though untested isn't always dead.
- **Search for usages** before deleting a function, including dynamic calls, reflection, configuration and other repositories.
- **Logs or metrics** can show whether an endpoint is still hit in production.
- Old [feature flags](/t/feature-flags) leave dead branches. Remove them when a rollout is done ([flag cleanup](/t/feature-flag-cleanup)).

## Deleting carefully

- Remove it in a **small, separate commit**, so it's easy to revert.
- Run the tests, and check that nothing refers to it dynamically.
- For public APIs, deprecate first, because outside users may depend on it ([deprecation](/t/deprecation)).

Deleting code is a legitimate, valuable contribution. Less code means fewer bugs ([boy scout rule](/t/boy-scout-rule)).
