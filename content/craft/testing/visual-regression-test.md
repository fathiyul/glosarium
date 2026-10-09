---
title: "Visual Regression Test"
summary: "Detecting unintended UI changes by comparing screenshots."
levels: { frontend: mid-level }
aliases: ["visual regression testing", "screenshot testing", "visual diff", "UI snapshot comparison", "visual testing"]
prereqs: ["component-testing"]
related: ["snapshot-test", "component-testing", "storybook", "end-to-end-test", "flaky-test", "design-system"]
core: [frontend]
---

A **visual regression test** takes **screenshots** of your UI and compares them to approved "baseline" images. If pixels differ beyond a threshold, the test fails and shows you the difference.
It catches what other tests can't: a layout shift, a missing icon, broken CSS, overlapping text, a wrong color.

```ts
// Playwright
test("pricing page looks right", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page).toHaveScreenshot("pricing.png");     // compares with a stored baseline
});
```

The first run saves the baseline. Later runs compare. If the change was intended (a redesign), you review the diff and **approve the new baseline**. If not, you've caught a
bug.

Services and tools in this space include Chromatic (for Storybook), Percy, and the screenshot assertions built into test frameworks like Playwright.

## What it's good for

- **CSS refactors and dependency upgrades**: did anything move?
- **Design systems and component libraries**: one change might affect hundreds of places ([design system](/t/design-system)).
- **Cross-browser and responsive layouts.**
- Things nobody would think to write an assertion for.

## The main problem: flakiness

Screenshots vary for reasons unrelated to bugs: fonts that load late, animations, carets blinking, dates and times, random or changing data, anti-aliasing differences between machines and
operating systems.

Make them stable:

- **Freeze time and randomness**, and use fixed, fake data.
- **Disable animations and transitions.**
- **Wait for fonts, images and network to settle** before capturing.
- **Run in the same environment every time** (a fixed browser version, a container in CI), since local and CI renderings differ.
- **Mask dynamic regions** (ads, timestamps).
- **Capture components in isolation** ([Storybook](/t/storybook)) instead of whole pages where possible. They're faster and less noisy.
- **Set a sensible threshold**, not zero tolerance.

## Process

- **Someone must review the diffs.** If people approve baselines without looking, the tests protect nothing.
- **Keep the number of screenshots manageable**, since each is a cost to review.
- **Don't treat them as a replacement** for behavior tests ([component testing](/t/component-testing), [end-to-end tests](/t/end-to-end-test)). They say "it looks the same", not
  "it works".

Compare with [snapshot tests](/t/snapshot-test) of markup or data, which are text-based and don't see rendering.
