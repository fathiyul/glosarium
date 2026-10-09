---
title: "CSRF"
summary: "Cross-Site Request Forgery: tricking a logged-in browser into sending a request the user didn't intend."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["Cross-Site Request Forgery", "XSRF", "CSRF attack", "cross site request forgery", "session riding"]
prereqs: ["cookie", "http-methods"]
related: ["samesite-cookie", "cookie", "xss", "same-origin-policy", "cors", "session"]
core: [backend, frontend]
also: [web-security]
---

**CSRF** (Cross-Site Request Forgery) tricks a logged-in user's **browser** into sending a request they didn't intend, to a site where they're authenticated. It works because browsers **automatically attach cookies** to requests for a site, no matter which page triggered the request.

An attack:

1. You're logged in to `bank.example` (your session cookie is stored).
2. You visit `evil.example`, which contains a hidden form:

```html
<form action="https://bank.example/transfer" method="POST">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="1000">
</form>
<script>document.forms[0].submit()</script>
```

3. Your browser sends `POST /transfer` to the bank **with your cookie**. The bank sees a valid session and performs the transfer.

The attacker can't read the response (the [same-origin policy](/t/same-origin-policy) blocks that), but they don't need to. The damage is the state-changing action.

## Defenses

**1. `SameSite` cookies.** Mark the session cookie `SameSite=Lax` or `Strict`, so the browser doesn't send it on cross-site requests such as the form post above ([SameSite cookies](/t/samesite-cookie)). Current browsers default to `Lax` for cookies without the attribute, which blocks many attacks, but set it explicitly and don't rely on the default
alone.

```
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

**2. CSRF tokens.** The server gives each session (or form) a secret random token, and requires it on every state-changing request, in a hidden field or a header. A forged cross-site request can't know the token.

```html
<input type="hidden" name="csrf_token" value="b7f3...">
```

**3. Check the `Origin` (or `Referer`) header** on state-changing requests, and reject ones from unexpected sites.

**4. Require a custom header** (such as `X-Requested-With` or a JSON content type) for API calls. Cross-site forms can't set them without a CORS preflight that the server would deny ([CORS](/t/cors)).

**5. Use re-authentication** for sensitive actions (password change, money movement).

## Rules of thumb

- **Never change state with `GET`.** Links and images can trigger them easily ([HTTP methods](/t/http-methods)).
- **APIs that authenticate with a token in the `Authorization` header** (not a cookie) aren't vulnerable in the same way, since the browser doesn't attach that header automatically. If you also accept cookies, you're back in scope.
- Most web frameworks provide CSRF protection. **Turn it on and don't disable it** to "fix" a failing request.
- **CSRF is different from [XSS](/t/xss)**: XSS runs the attacker's script on your site, and can read data and bypass CSRF tokens. Fix both.
