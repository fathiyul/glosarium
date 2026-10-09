---
title: "Accessible Forms"
summary: "Labels, error messages and instructions that are announced correctly."
levels: { frontend: junior }
aliases: ["form accessibility"]
prereqs: ["screen-reader"]
related: ["screen-reader", "focus-visible", "controlled-vs-uncontrolled", "lighthouse"]
---

An accessible form lets everyone understand each field, know what to type, and fix mistakes. Screen reader users depend on the code to say the label and the error out loud. Sighted users benefit too: a clear label is easier to read than a placeholder that disappears when they start typing.

Every input needs a label that is connected to it:

```html
<label for="email">Email address</label>
<input id="email" name="email" type="email" required
       aria-describedby="email-hint email-error">
<p id="email-hint">We'll only use this to send your receipt.</p>
<p id="email-error" role="alert">Enter an email address like name@example.com.</p>
```

Connect the error message with `aria-describedby` so it's read with the field. Mark required fields with `required` or `aria-required`, and don't rely on colour alone to show an error.

The classic mistake is using a placeholder as the only label. It vanishes once the user types, and many screen readers don't announce it reliably. Also, a `<div>` styled to look like an input has no role, label or keyboard behaviour unless you add them. A native `<input>` gives you all of that for free. See [screen readers](/t/screen-reader) for how the page is announced.
