---
title: "Content Security Policy"
summary: "A header restricting which scripts and resources a page may load."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["CSP", "Content-Security-Policy header", "script-src", "CSP header"]
prereqs: ["xss", "http-headers"]
related: ["xss", "security-headers", "subresource-integrity", "output-encoding", "same-origin-policy", "clickjacking"]
core: [frontend]
---

A **Content Security Policy (CSP)** is an HTTP response header that tells the browser **which sources of scripts, styles, images and other resources the page is allowed to load or run**. It's a second line of defense against [cross-site scripting (XSS)](/t/xss): even if an attacker injects markup into your page, the browser refuses to run
scripts that the policy doesn't allow.

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com; img-src 'self' data:; object-src 'none'; frame-ancestors 'none'
```

This says: by default, load things only from my own origin. Scripts may come from my origin and one CDN. Images from my origin or data URLs. No plugins. And nobody may embed this page in a frame.

## Key directives

| Directive | Controls |
|---|---|
| `default-src` | The fallback for resource types you don't list |
| `script-src` | Where JavaScript can come from (and whether inline scripts run) |
| `style-src` | Stylesheets |
| `img-src`, `font-src`, `media-src` | Those resource types |
| `connect-src` | Where `fetch`, XHR and WebSocket may connect |
| `frame-src` / `frame-ancestors` | What you can embed, and who may embed you (a [clickjacking](/t/clickjacking) defense) |
| `object-src` | Plugins (set to `'none'`) |
| `base-uri`, `form-action` | Limit `<base>` tags and where forms can submit |

## The important part: inline scripts

The classic XSS payload is an inline script (`<script>…</script>` or `onerror="…"`). A strict policy **blocks inline scripts** unless you explicitly allow them with a **nonce** or **hash**:

```html
<!-- header: script-src 'nonce-r4nd0m123' 'strict-dynamic' -->
<script nonce="r4nd0m123">initApp()</script>      <!-- allowed: matches the per-response nonce -->
<script>stealData()</script>                      <!-- injected, no nonce: blocked -->
```

The nonce must be a fresh, unguessable value **per response**. Avoid `'unsafe-inline'` and `'unsafe-eval'`, which switch off most of the protection.

## Rolling it out safely

1. Start with **`Content-Security-Policy-Report-Only`**, which reports violations without blocking anything, and set up a reporting endpoint.
2. Fix legitimate violations (third-party scripts, inline handlers).
3. Tighten, then **enforce**.

## Realistic expectations

- It's **defense in depth**, not a replacement for escaping output and sanitizing input ([output encoding](/t/output-encoding)).
- **Third-party scripts** (analytics, ads, widgets) complicate it. Each allowed source is trusted code on your page.
- Overly broad allow-lists (`*`, whole CDNs hosting arbitrary user content) can be bypassed.
- It's one of several [security headers](/t/security-headers). For third-party files you can also use [Subresource Integrity](/t/subresource-integrity).
