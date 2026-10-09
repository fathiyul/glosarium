---
title: "User-Agent"
summary: "The header identifying the client software."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["User-Agent header", "UA string", "browser string"]
prereqs: ["http-headers"]
related: ["http-headers", "http-request", "bot-protection", "content-negotiation", "browser-compatibility"]
---

The `User-Agent` header is a string in a request that identifies the client software: the browser, the app or the library making the call.

```http
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
User-Agent: curl/8.5.0
User-Agent: python-requests/2.32.0
User-Agent: Googlebot/2.1 (+http://www.google.com/bot.html)
```

Browser strings are famously messy: nearly every one begins with `Mozilla/5.0`, for historical compatibility reasons.

## What it's used for

- **Logs and analytics**: which browsers and devices visit.
- **Identifying bots and crawlers**, to allow, throttle or block them ([bot protection](/t/bot-protection)).
- **Debugging**: "which client sent this request?"
- **Courtesy for API providers**, who ask API clients to set a descriptive user agent with contact details.

## Why not to depend on it

- **It's trivially faked.** Any client can send any string. Never use it for security decisions.
- **Browser sniffing is fragile**: new versions and unknown browsers break rules. Prefer **feature detection** ([feature detection](/t/feature-detection)).
- **It's being reduced.** Browsers are freezing parts of the string to limit tracking (fingerprinting), and offer **client hints** (`Sec-CH-UA`) as a structured, opt-in alternative.
- **It tells you nothing reliable** about the person.

## Good practice

- **Set a meaningful `User-Agent`** when your code calls other people's APIs (`my-app/1.2 (contact@example.com)`), since some services block empty or default ones.
- **Log it** for debugging, but don't use it to gate functionality.
- **Handle bots**: crawlers identify themselves, but bad ones lie, so verify (by reverse DNS) if it matters.
- **Mobile vs desktop**: use responsive design and media queries, not user-agent checks ([responsive design](/t/responsive-design)).

See [HTTP headers](/t/http-headers) and [requests](/t/http-request).
