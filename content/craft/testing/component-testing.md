---
title: "Component Testing"
summary: "Testing a UI component in isolation with user-like interactions."
levels: { frontend: junior }
aliases: ["UI component testing", "React component testing", "frontend component tests"]
prereqs: ["unit-test"]
related: ["testing-library", "unit-test", "end-to-end-test", "snapshot-test", "visual-regression-test"]
core: [frontend]
---

A component test renders one UI component, on its own, and interacts with it the way a user
would: clicking, typing, reading what's on screen.

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

test("shows an error for an empty email", async () => {
  render(<LoginForm onSubmit={jest.fn()} />);

  await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
});
```

## What to test

- What the user **sees** for given props or state (empty, loading, error, filled).
- What happens when they **interact**: the right callback is called with the right data.
- **Conditional UI**: disabled buttons, hidden sections.

## What to avoid

- **Testing implementation details**, such as internal state or class names. Those tests
  break when you refactor even though behavior is unchanged. Find elements as a user would, by
  role, label and text (see [testing library philosophy](/t/testing-library)).
- **Snapshot tests of everything.** Big snapshots get approved without being read.
- **Real network calls.** Replace them with a [mock server](/t/mock-server) or a stub.

Component tests sit between [unit tests](/t/unit-test) of functions and
[end-to-end tests](/t/end-to-end-test) of the whole app: faster than the browser, but more
realistic than testing logic alone. They run in a simulated DOM (such as jsdom) or in a real
browser, depending on the tool.
