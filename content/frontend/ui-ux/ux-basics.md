---
title: "UX Basics"
summary: "Usability, feedback, affordances and consistency."
levels: { backend: mid-level, frontend: junior }
prereqs: ["dom"]
related: ["error-message-ux", "empty-state", "pixel-perfect", "accessible-forms"]
---

User experience (UX) basics are the principles that make an interface easy to use. Most of them come down to one question: can the user tell what's possible, and what just happened?

- **Feedback.** Every action gets a visible response. A button that shows "Saving…" and then "Saved" tells the user the click worked. Silence makes people click again.
- **Affordances.** Things look like what they do. A button looks pressable and a link looks like a link. Don't make essential actions depend on hidden hover menus, which touch screens and keyboard users can't reach easily.
- **Consistency.** The same action looks and behaves the same way everywhere. If delete is a red button on one screen, don't make it a grey link on another.

On the backend, feedback starts with honest responses. If a task takes a while, return `202 Accepted` with a way to check its progress, so the frontend can show that something is happening. See [HTTP status codes](/t/http-status-codes).

The classic mistake is designing for the happy path only. Users will mistype, lose connection and change their minds. Plan what the screen shows when things go wrong, using [error messages](/t/error-message-ux) and [empty states](/t/empty-state).
