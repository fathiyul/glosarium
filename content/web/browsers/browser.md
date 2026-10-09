---
title: "Web Browser"
summary: "The program that fetches, renders and runs web pages."
levels: { backend: junior, frontend: junior }
aliases: ["web browser", "Chrome", "Firefox", "Safari"]
prereqs: ["http", "html"]
related: ["dom", "javascript-engine", "critical-rendering-path", "same-origin-policy", "browser-devtools"]
---

A web browser is the program that fetches web pages, renders them and runs their JavaScript. Chrome, Safari, Firefox and Edge are the common ones.

Inside, a browser does several jobs:

- **Networking**: requests pages and resources over HTTP and HTTPS ([what happens when you type a URL](/t/what-happens-when-you-type-url)).
- **Parsing and rendering**: turns HTML and CSS into the [DOM](/t/dom) and the pixels on screen ([critical rendering path](/t/critical-rendering-path)).
- **Running code**: a [JavaScript engine](/t/javascript-engine) executes scripts.
- **Enforcing security**: the [same-origin policy](/t/same-origin-policy), sandboxing, HTTPS checks.
- **Storing data**: caches, cookies and storage ([browser storage](/t/browser-storage)).
- **Developer tools**: built-in inspection and debugging ([DevTools](/t/browser-devtools)).

## Engines

Browsers share a few rendering engines:

| Engine | Used by |
|---|---|
| Blink | Chrome, Edge, Opera, Brave and others |
| WebKit | Safari (and every browser on iOS) |
| Gecko | Firefox |

So there are really three engines to test against ([browser compatibility](/t/browser-compatibility)).

## Why developers care

- **Your frontend runs on machines you don't control**: different browsers, versions, screen sizes and settings.
- **The browser is a hostile environment for secrets.** Anything sent to it can be read by the user.
- **Behavior differs** around features, caching and security. Test on the ones your users have.
- **DevTools** are your main debugging tool.

The browser's security rules (origins, CORS, cookies, CSP) explain many "why won't this request work?" problems ([CORS](/t/cors)).
