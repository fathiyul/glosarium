---
title: "Input Types"
summary: "email, number, date and others, with the keyboards and validation they bring."
levels: { frontend: junior }
aliases: ["HTML input types", "input type attribute", "email input", "date input"]
prereqs: ["html-forms"]
related: ["html-forms", "form-validation", "html-attribute", "accessible-forms", "semantic-html"]
---

The `type` attribute of an `<input>` decides what kind of field it is. Choosing the right type gives you better keyboards on phones, built-in validation and often a better user interface.

```html
<input type="text" name="name">
<input type="email" name="email" required>
<input type="password" name="password" minlength="8">
<input type="number" name="qty" min="1" max="10" step="1">
<input type="date" name="birthday">
<input type="tel" name="phone">
<input type="url" name="website">
<input type="search" name="q">
<input type="checkbox" name="newsletter">
<input type="radio" name="plan" value="pro">
<input type="file" name="avatar" accept="image/*">
<input type="range" name="volume" min="0" max="100">
<input type="color" name="theme">
<input type="hidden" name="csrf_token" value="...">
```

## What you get

| Type | Benefit |
|---|---|
| `email` | email keyboard on mobile, basic format check |
| `number` | numeric keypad, min/max/step checks |
| `tel` | phone keypad (no format enforced) |
| `date`, `time` | a native picker |
| `password` | masked characters, password-manager support |
| `file` | file chooser, with `accept` and `multiple` |
| `checkbox`, `radio` | on/off and one-of-many choices |
| `search` | a clear button in some browsers |

## Combine with attributes

`required`, `min`, `max`, `minlength`, `pattern`, `autocomplete` and `inputmode` refine behavior ([form validation](/t/form-validation)). `autocomplete="email"` or `"one-time-code"` helps browsers and password managers.

## Cautions

- **Types give hints, not security.** `type="number"` doesn't stop someone sending text directly. Validate on the server ([never trust the client](/t/never-trust-the-client)).
- **`number` isn't right for everything.** IDs, phone numbers, card numbers and postal codes shouldn't be numbers (leading zeros, spinners, scroll-wheel changes). Use `type="text"` with `inputmode="numeric"`.
- **`email` validation is lenient.** A passing value may not be a real address.
- **Date pickers look different** between browsers, so test them.
- **Always pair inputs with a `<label>`** ([accessible forms](/t/accessible-forms)).
- **The submitted value is always a string**, whatever the type.
