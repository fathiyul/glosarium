---
title: "Live Regions"
summary: "Announcing dynamic updates to screen reader users."
levels: { frontend: senior }
aliases: ["ARIA live regions", "aria-live", "role=status", "role=alert", "screen reader announcements"]
prereqs: ["aria", "screen-reader"]
related: ["aria", "screen-reader", "focus-management", "accessible-forms", "loading-error-states", "optimistic-update"]
core: [frontend]
---

A screen reader announces what's in focus and what the user navigates to. But in a dynamic page, things change **elsewhere**: a form error appears, a cart count updates, "3 results found" shows after a search, a toast says "Saved". A sighted user sees it. A screen reader user hears nothing, unless the change is marked as a **live region**.

A **live region** is an element whose content changes the browser reports to assistive technology, which then **announces them**, without moving focus.

```html
<div aria-live="polite" id="status"></div>

<script>
  document.getElementById("status").textContent = "3 results found";   // announced
</script>
```

## The key attribute: politeness

| Value | Behavior | Use for |
|---|---|---|
| `aria-live="polite"` | Announced when the user is idle, without interrupting | Status updates: "Saved", "3 results", "Item added to cart" |
| `aria-live="assertive"` | Interrupts the current speech | Urgent, time-sensitive messages: serious errors, session expiring |
| `aria-live="off"` (default) | Not announced | Everything else |

Two convenient roles with built-in live behavior:

- **`role="status"`**: polite, for non-critical status messages.
- **`role="alert"`**: assertive, for important errors and warnings.

```html
<p role="status">Your changes were saved.</p>
<p role="alert">Payment failed. Check your card details.</p>
```

## Making it work reliably

- **The live region must exist in the DOM before** you change its content. If you insert a brand-new element that already contains text, many screen readers won't announce it. Render an empty container on page load, and fill it later.
- **Change the text, rather than the element.** Update `textContent` of the existing region.
- **Keep messages short and meaningful.** Long or frequent announcements annoy users and drown out everything else.
- **Don't announce everything.** A stream of live updates (a ticking clock, a live chat feed with rapid messages) becomes noise. Use `aria-live="off"`, or let users pause it.
- **Use assertive sparingly.** Interrupting speech is disruptive.
- **`aria-atomic="true"`** makes the whole region be read, rather than only the changed part. **`aria-relevant`** controls which kinds of changes are reported (additions, removals, text).
- **Don't use a live region as a replacement for managing focus.** A modal opening or a navigation needs focus management ([focus management](/t/focus-management)). A live region is for updates that don't move focus.
- **Test with real screen readers**, since announcement behavior varies between combinations of browsers and screen readers.

## Typical uses

- **Form validation messages** after submit, and loading, success and error states ([accessible forms](/t/accessible-forms), [loading, error and empty states](/t/loading-error-states)).
- **Search result counts and filters applied.**
- **Notifications and toasts**, and the result of [optimistic updates](/t/optimistic-update) or failures.
- **Progress indicators** and asynchronous completion ("Report is ready").
- **Single-page app route changes**, announcing the new page title.

Done well, live regions give screen reader users the same awareness of changes that sighted users get visually.
