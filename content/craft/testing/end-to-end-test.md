---
title: "End-to-End Test"
summary: "A test of the whole system through its real interface."
levels: { backend: mid-level, frontend: junior, data-engineer: mid-level }
aliases: ["E2E test", "E2E tests", "end to end testing", "browser test", "UI automation test"]
prereqs: ["integration-test"]
related: ["testing-pyramid", "testing-trophy", "smoke-test", "flaky-test", "acceptance-test"]
core: [backend]
---

An **end-to-end (E2E) test** exercises the whole system the way a real user would, through the **real interface**: a browser clicking through your web app, or an API client calling a deployed
service, with real (or realistic) databases and services behind it.

```ts
// Playwright
test("user can sign up and place an order", async ({ page }) => {
  await page.goto("/signup");
  await page.getByLabel("Email").fill("ana+e2e@example.com");
  await page.getByLabel("Password").fill("correct-horse-battery");
  await page.getByRole("button", { name: "Create account" }).click();

  await page.getByRole("link", { name: "Kettle" }).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("button", { name: "Checkout" }).click();

  await expect(page.getByText("Order confirmed")).toBeVisible();
});
```

Common tools: Playwright, Cypress, Selenium. For backend systems, E2E may mean sending a real request through the gateway and checking the full chain, including queues and databases.

## What they're good for

They give the **highest confidence** that the pieces really work together: routing, frontend, API, database, third-party integrations, configuration. They catch problems that unit and
integration tests can't see.

## What they cost

- **Slow** (seconds to minutes each).
- **Brittle**: UI changes, timing and test data break them.
- **Flaky**: random failures from timing and shared state erode trust ([flaky tests](/t/flaky-test)).
- **Hard to debug**: a failure could be anywhere in the stack.
- **Expensive to maintain** and to run.

## So use few, and use them wisely

Keep **a small number covering the critical user journeys** (sign up, log in, checkout, the core money path). Test details at lower, faster levels
([testing pyramid](/t/testing-pyramid)).

## Making them reliable

- **Wait for conditions, never for fixed sleeps** (`await expect(...).toBeVisible()`, not `sleep(3000)`).
- **Find elements by role, label or text**, or by stable test IDs, not by fragile CSS paths ([Testing Library philosophy](/t/testing-library)).
- **Create the data a test needs, itself**, and clean up, so tests don't depend on each other or on order.
- **Run in an isolated, production-like environment**, not on the live system.
- **Quarantine or fix flaky tests quickly.**
- **Run them in CI**, with screenshots and traces saved on failure.
- A fast **smoke test** after every deploy ([smoke tests](/t/smoke-test)) is a minimal E2E check.
