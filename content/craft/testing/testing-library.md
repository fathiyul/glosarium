---
title: "Testing Library Philosophy"
summary: "Testing UI the way users use it, by role and text rather than internals."
levels: { frontend: junior , data-scientist: mid-level }
aliases: ["Testing Library", "React Testing Library", "user-centric testing", "Testing Library guiding principle"]
prereqs: ["component-testing"]
related: ["component-testing", "snapshot-test", "end-to-end-test", "visual-regression-test"]
core: [frontend]
---

Testing Library is a family of UI testing tools (for React, Vue, Angular and plain DOM) built
on one idea: **the more your tests resemble how users use your software, the more confidence
they give you.**

Users don't look for `div.btn-primary:nth-child(2)` or check component state. They find a
button that says "Save" and click it. So tests should too.

## Query by what the user perceives

In order of preference:

| Query | Finds |
|---|---|
| `getByRole("button", { name: /save/i })` | Elements by accessible role and name |
| `getByLabelText("Email")` | Form fields by their label |
| `getByText("Welcome back")` | Visible text |
| `getByTestId("save-btn")` | Last resort, with an explicit `data-testid` |

```tsx
await userEvent.type(screen.getByLabelText(/email/i), "ana@example.com");
await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
```

## Why this is good for you

- **Refactor-proof.** Renaming a CSS class or restructuring internals doesn't break tests,
  because behavior didn't change.
- **Accessibility for free.** If `getByRole` can't find your button, a screen reader
  probably can't either.
- **Readable tests**: they read like a description of the user's steps.

## What not to do

Don't test internal state, hooks or method calls directly, and don't use `container.querySelector`
unless you must. `findBy...` queries wait for elements to appear; use them for async UI instead
of arbitrary timeouts. See [component testing](/t/component-testing).
