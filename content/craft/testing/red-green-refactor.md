---
title: "Red, Green, Refactor"
summary: "The three-step TDD cycle."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["TDD cycle", "red-green-refactor cycle"]
prereqs: ["unit-test"]
related: ["given-when-then", "deterministic-tests", "over-mocking", "bdd"]
---

Red, green, refactor is the cycle used in test-driven development (TDD). You write a failing test first (red), write the least code needed to make it pass (green), and then clean up the code while keeping the tests passing (refactor). Then you repeat for the next small behaviour.

```python
# Red: the test fails, because slugify doesn't exist yet
def test_slugify_replaces_spaces():
    assert slugify("Hello World") == "hello-world"

# Green: the simplest code that passes
def slugify(text):
    return text.lower().replace(" ", "-")

# Refactor: tidy the code, rerun the test, and keep it green
```

The first step matters. Seeing the test fail confirms that it can fail, and that it checks the behaviour you intend. A test that never went red may pass for the wrong reason.

The trade-off is pace against design time. TDD can feel slow for code you already understand, and writing tests before you know the shape of the solution can produce tests that lock in the wrong design. It works best for well-defined behaviour, such as calculations, parsers and rules, and less well for exploratory UI work.

The classic mistake is skipping the refactor step, so the green code stays messy, or writing a large batch of tests at once and then the code, which isn't TDD in practice. Keep each cycle small, and refactor while the tests protect you. Keep the tests clear with a [given/when/then](/t/given-when-then) structure, and keep them [deterministic](/t/deterministic-tests). For the same discipline at the scenario level, see [behavior-driven development](/t/bdd).
