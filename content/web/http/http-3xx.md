---
title: "3xx Redirects"
summary: "301, 302, 307, 308 and when to use each one."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["301", "302", "307", "308", "redirect status codes"]
prereqs: ["http-status-codes"]
related: ["redirect", "http-2xx", "http-4xx", "http-caching", "https"]
---

Status codes in the 3xx range mean the client must take further action, usually by requesting a different URL. The new location is in the `Location` header.

| Code | Name | Meaning | Method kept? |
|---|---|---|---|
| **301** | Moved Permanently | the resource has a new permanent URL | `POST` may become `GET` |
| **302** | Found | temporarily at another URL | `POST` may become `GET` |
| **303** | See Other | go to another URL with a `GET` (after a form post) | becomes `GET` |
| **307** | Temporary Redirect | temporary, **same method** and body | yes |
| **308** | Permanent Redirect | permanent, **same method** and body | yes |
| **304** | Not Modified | not a redirect: use your cached copy ([HTTP caching](/t/http-caching)) | |

```http
GET /old-page HTTP/1.1

HTTP/1.1 301 Moved Permanently
Location: https://example.com/new-page
```

## Choosing

- **Page permanently moved** (new URL structure, HTTP to HTTPS): **301** (or 308). Browsers and search engines remember it, and transfer ranking.
- **Temporary** (maintenance page, A/B test, login redirect): **302** or **307**.
- **After a form `POST`, send the user to a result page**: **303** (the "post/redirect/get" pattern), so a refresh doesn't resubmit.
- **When the method must be preserved** (an API with a `POST`): **307** or **308**.

## Gotchas

- **301s are cached hard.** A wrong permanent redirect can stick in browsers for a long time. Test with a 302 first.
- **Redirect loops** (A → B → A) cause "too many redirects". Check your rules, and [HTTPS](/t/https) and `www` settings.
- **Chains** (A → B → C) slow things down. Redirect straight to the final URL.
- **Open redirects**: never redirect to a URL taken from user input without checking it ([open redirect](/t/open-redirect)).
- **API clients** may or may not follow redirects by default, and some drop the `Authorization` header. Check your library ([`curl -L`](/t/curl)).

See [redirects](/t/redirect) for more.
