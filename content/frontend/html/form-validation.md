---
title: "Form Validation"
summary: "Checking input in the browser and, always, again on the server."
levels: { backend: junior, frontend: junior }
aliases: ["input validation", "client-side validation", "HTML5 validation", "validating forms"]
prereqs: ["html-forms"]
related: ["input-types", "html-forms", "semantic-html", "html-attribute", "http-status-codes"]
core: [frontend]
---

**Form validation** checks that what a user typed makes sense before it's accepted. There are two
places to do it, and you need both.

## In the browser: for the user's convenience

HTML has built-in checks, and no JavaScript is needed:

```html
<form>
  <input type="email" name="email" required>
  <input type="password" name="password" minlength="8" required>
  <input type="number" name="age" min="13" max="120">
  <input name="zip" pattern="[0-9]{5}" title="Five digits">
  <button>Sign up</button>
</form>
```

The browser blocks submission and shows a message if a field breaks a rule. With JavaScript you can
check validity (`input.validity`, `form.checkValidity()`) and show your own messages
(`input.setCustomValidity("...")`).

Good UX: say **what's wrong and how to fix it** ("Password must be at least 8 characters"), put the message
next to the field, don't wipe what the user typed, and avoid yelling about a field before the user has
finished typing in it.

## On the server: for correctness and security

**Browser checks can be skipped.** Anyone can edit the page, or call your API directly with `curl`. The
server must validate everything again, and it must treat all input as untrusted.

```python
def create_user(data):
    if "@" not in data.get("email", ""):
        return {"error": "Invalid email"}, 400
    if len(data.get("password", "")) < 8:
        return {"error": "Password too short"}, 400
```

Return a clear error (usually [400 or 422](/t/http-status-codes)) and display it in the form.

## What to check

- **Required fields** and correct **types** and formats.
- **Length and range limits**, which also protect your database.
- **Business rules** that only the server knows, such as a username already taken.

Don't over-validate. Email addresses and names come in more shapes than most patterns allow, and
rejecting valid ones frustrates real users. Checking that an email *works* means sending a message to it.

Rule of thumb: client-side validation is for helping people, server-side validation is for protecting the system.
