---
title: "Error Messages"
summary: "Messages that say what went wrong and how to fix it."
levels: { backend: mid-level, frontend: junior }
prereqs: ["ux-basics"]
related: ["error-response-format", "accessible-forms", "empty-state", "loading-error-states"]
---

An error message tells the user what went wrong and what to do next. The best ones are specific and written in plain language.

```
Vague:     "Invalid input."
Specific:  "Enter a date in the format DD/MM/YYYY."
```

On the frontend, put the message next to the field it's about, and connect it to that field so screen readers announce it too (see [accessible forms](/t/accessible-forms)). On the backend, return errors in one consistent shape, so the frontend can show the right message for each field. Here is one possible shape:

```json
{ "error": "validation_failed", "field": "email", "message": "Enter an email address like name@example.com." }
```

The consistent format is covered in [error response format](/t/error-response-format). The `message` is for people, and the `error` code is for your code.

The classic mistake is showing raw technical text to users, such as a stack trace, a database error or "NullReferenceException". Those details belong in your logs, where developers can read them, while the user gets a message they can act on. Also avoid blaming the user ("You entered the wrong data") and keep the tone neutral. Say what happened, then say what to try next.
