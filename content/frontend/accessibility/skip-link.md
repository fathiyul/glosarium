---
title: "Skip Link"
summary: "A link that jumps past navigation to the main content."
levels: { frontend: mid-level }
aliases: ["skip link", "skip to content", "skip navigation"]
prereqs: ["accessibility", "landmarks"]
related: ["landmarks", "keyboard-navigation", "focus-management"]
---

A **skip link** ("Skip to main content") sits first in tab order, letting keyboard and screen-reader users bypass headers and navigation straight to the content — instead of tabbing through dozens of links on every page. Invisible until focused, indispensable when needed.

```html
<a class="skip" href="#main">Skip to main content</a>
…
<main id="main" tabindex="-1">…</main>
```

The mechanics are small and exact: first focusable element, visually hidden until focus, target focusable (`tabindex="-1"` so focus lands programmatically without entering tab order), and focus actually *moved* (browsers scroll on anchor jump but don't always move focus — script the focus for reliability).

The classic mistakes:

- No skip link. The most common failure — keyboard users tab the whole nav per page. One link fixes the top keyboard complaint.
- Display:none until focus. `display: none` removes it from tab order entirely. Hide visually (clip/position) while keeping it focusable; reveal on `:focus`.
- Target not focusable. Jumping to a non-focusable `<main>` scrolls without moving focus — screen readers stay put. `tabindex="-1"` on the target.
- Skip link pointing nowhere. Hrefs to missing ids fail silently. Pair with a real, single `<main>` landmark.
- Single skip for complex pages. Huge apps benefit from several ("skip to search," "skip to results") — one content skip is the minimum, not the ceiling.
- Hiding it always. Some designs keep skip links permanently subtle-visible; always-hidden-until-focus is standard, but never-hidden serves discoverability. Either beats absent.
- Untested with keyboards. Mouse testing never touches it. Tab from page load, every template, verify focus lands in content.

**The practice:** first in tab order, hidden-until-focused, targeting a focusable main, verified by keyboard. Thirty minutes of work, daily benefit for keyboard users.
