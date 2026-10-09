---
title: "Never Trust the Client"
summary: "Anything from the browser can be forged, so validate on the server."
levels: { backend: junior, frontend: junior }
aliases: ["don't trust client input", "client-side security", "trust boundary", "untrusted input"]
prereqs: ["http", "request-response-body"]
related: ["input-validation", "idor", "trust-boundary", "form-validation", "broken-access-control", "mass-assignment"]
core: [backend, frontend]
---

Your server can't trust anything that comes from the client: browser, mobile app or script. Anyone can open DevTools, edit the
page, replay a request with `curl`, or write their own client. **All client-side code runs on the user's machine, under the
user's control.**

That includes:

- form fields, including hidden ones and disabled buttons,
- query parameters, JSON bodies and headers (`User-Agent`, `Referer`, `X-Forwarded-For`...),
- cookies and local storage values,
- file names, content types and sizes,
- JWT claims, until you've verified the signature,
- *"the app only sends valid data"* assumptions.

## Examples of the mistake

```js
// Browser sends the price
fetch("/checkout", { method: "POST", body: JSON.stringify({ itemId: 7, price: 0.01 }) });
```

If the server charges whatever `price` it receives, anyone can buy anything for a cent. The server must look up the price itself.

| Client-side only | What an attacker does | Server must |
|---|---|---|
| `maxlength` and JavaScript validation | Send a longer or invalid value directly | Validate again |
| Hidden `<input name="role" value="user">` | Change it to `admin` | Never take roles from the request |
| Hiding the Delete button for non-admins | Call `DELETE /posts/5` directly | Check permissions per request |
| `isPremium: true` in local storage | Edit it | Look up the plan from the database |

## What to do

- **Validate all input on the server** ([input validation](/t/input-validation)), and keep client validation only for
  usability ([form validation](/t/form-validation)).
- **Do authorization on the server** for every action, and every object
  ([IDOR](/t/idor)).
- **Compute sensitive values yourself**: prices, totals, discounts and permissions. Accept only the *intent* ("buy item 7")
  from the client.
- **Be careful with what you bind** from requests to your models, so users can't set fields like `is_admin`
  ([mass assignment](/t/mass-assignment)).
- **Verify signatures** on tokens and webhooks, and don't read unverified data.
- **Never put secrets in client code**. They can be extracted.

The line between what you control (your server) and what you don't (everything outside it) is a **trust boundary**
([trust boundary](/t/trust-boundary)). Check data when it crosses it.
