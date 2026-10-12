---
title: "Testing Trophy"
summary: "A frontend-oriented model that favors integration tests."
levels: { frontend: mid-level , data-scientist: mid-level }
aliases: ["testing trophy model"]
prereqs: ["test-double"]
related: ["testing-pyramid", "integration-test", "unit-test", "test-double"]
---

The testing trophy is a model of how to split tests across a project. Its widest layer is integration tests, which check components working together. It's named after its shape, with a smaller layer of unit tests below, a thin layer of end-to-end tests above, and static checks such as types and linting at the base. It was popularized by Kent C. Dodds as a response to the classic testing pyramid, which puts most effort into unit tests.

For a frontend, integration tests are often the most valuable. A test that renders a form, types into it, and checks the result in the page exercises the component, its state and the rendering together, and it depends less on how the component is built internally.

```javascript
// Integration-style: render and interact the way a user would
render(<SignupForm />);
await userEvent.type(screen.getByLabelText("Email"), "ana@example.com");
await userEvent.click(screen.getByRole("button", { name: "Sign up" }));
expect(await screen.findByText("Check your inbox")).toBeInTheDocument();
```

The trade-off is speed and precision. Integration tests run slower than unit tests, and when one fails, the cause can be harder to locate. Unit tests are quick and precise, but they can pass while the pieces fail to work together. The trophy argues for putting most effort where the user's view of the system is checked, not for dropping unit tests.

The classic mistake is treating the model as a rule to skip unit tests entirely. Use the shape to guide where to spend effort, and keep fast unit tests for logic that has many cases. Test the user-visible behaviour, and avoid tests that only mirror component internals, as discussed in [over-mocking](/t/over-mocking).
