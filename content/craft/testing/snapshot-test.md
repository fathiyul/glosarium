---
title: "Snapshot Test"
summary: "Comparing output to a saved snapshot."
levels: { backend: mid-level, frontend: junior, data-engineer: mid-level }
aliases: ["snapshot testing", "Jest snapshots", "golden file test"]
prereqs: ["unit-test"]
related: ["component-testing", "visual-regression-test", "unit-test", "test-fixture"]
---

A snapshot test saves the output of some code the first time it runs (the snapshot), then compares future output with it. If anything differs, the test fails, and you decide whether the change was intended.

```js
// Jest
test("renders the user card", () => {
  const tree = render(<UserCard user={{ name: "Ana" }} />);
  expect(tree).toMatchSnapshot();          // first run: writes the file; later runs: compares
});
```

```python
assert render_invoice(order) == read("invoice.golden.txt")      # a hand-rolled golden file
```

If the output changes on purpose, you update the snapshot (`jest -u`) and review the diff in the pull request.

## Good uses

- **Stable, structured output**: API responses, serialized data, error messages, generated code or SQL, configuration files.
- **Small components** where the markup is the point.
- **Catching accidental changes** you didn't expect, as a quick safety net around old code ([characterization tests](/t/characterization-test)).

## Why they get a bad reputation

- **Huge snapshots** nobody reads. Reviewers approve changes without looking, so bugs sail through.
- **Brittle**: a harmless change (a class name, whitespace) fails dozens of tests.
- **They record behavior, not correctness.** A snapshot of a wrong output happily passes.
- **Unstable data** (timestamps, random IDs) makes them fail randomly. Freeze or mask them.
- **They hide intent.** An assertion says what matters. A snapshot says "whatever this is".

## Using them well

- **Keep snapshots small and focused.** Snapshot one thing, not the whole page.
- **Review every snapshot change** like code.
- **Prefer explicit assertions** for the behavior that matters, and use snapshots for supporting detail ([component testing](/t/component-testing)).
- **For appearance**, compare images instead of markup ([visual regression tests](/t/visual-regression-test)).
