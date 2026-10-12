---
title: "Static Analysis"
summary: "Finding bugs by analyzing code without running it."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["linting", "static analyzer"]
prereqs: ["compiler"]
related: ["language-server", "type-inference", "ci-pipeline", "git-hooks"]
---

Static analysis examines code without running it, looking for bugs, risky patterns and style problems. Linters, type checkers and security scanners are all forms of it. They can find things a test might never exercise, such as an unused variable, a possible null dereference, or a type mismatch in a rarely used branch.

```python
def average(values):
    total = sum(values)
    count = len(values)     # a checker can flag division by zero when values is empty
    return total / count
```

A type checker run on this code can flag mismatched types before any test runs. Linters run quickly and can be part of the editor and of the [CI pipeline](/t/ci-pipeline), so the same rules apply everywhere.

The trade-off is noise and false positives. A strict configuration catches more real problems but produces warnings that aren't bugs, and people learn to ignore a noisy tool. Tools also can't know what the code is meant to do, so they report patterns, not intent.

The classic mistake is turning on every rule at once, then suppressing the output until the tool is useless. Start with a small set of rules that catch real bugs, fix what they find, and add more gradually. Treat a suppression as a decision that needs a comment, not a way to make the warning go away. The same checks run live in the editor through the [language server](/t/language-server).
