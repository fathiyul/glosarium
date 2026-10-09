---
title: "Web APIs"
summary: "The browser's built-in APIs: clipboard, geolocation, notifications and more."
levels: { frontend: junior }
aliases: ["browser APIs", "Web API", "Web Platform APIs"]
prereqs: ["javascript", "browser"]
related: ["dom-manipulation", "fetch-api", "browser-storage", "intersection-observer", "history-api"]
---

Web APIs are the features a browser provides to JavaScript, beyond the language itself. They aren't part of [ECMAScript](/t/ecmascript). They come from the browser (and some also exist in Node or other runtimes).

```js
// Examples, none of which are "JavaScript the language"
document.querySelector("h1");                            // DOM
await fetch("/api/orders");                              // network
localStorage.setItem("theme", "dark");                   // storage
navigator.clipboard.writeText("copied");                 // clipboard
navigator.geolocation.getCurrentPosition(onPosition);    // location
setTimeout(() => {}, 1000);                              // timers
```

## Groups worth knowing

| Area | APIs |
|---|---|
| Page | [DOM](/t/dom-manipulation), [MutationObserver](/t/mutation-observer), [IntersectionObserver](/t/intersection-observer), [ResizeObserver](/t/resize-observer) |
| Network | [Fetch](/t/fetch-api), WebSocket, Server-Sent Events |
| Navigation | [History API](/t/history-api), `location` |
| Storage | [localStorage, IndexedDB, cookies](/t/browser-storage) |
| Device | clipboard, geolocation, camera and microphone, notifications, vibration |
| Background | Service Workers, Web Workers |
| Media and graphics | Canvas, Web Audio, WebGL, WebRTC |
| Utilities | `URL`, `structuredClone`, `crypto.getRandomValues`, `AbortController` |

## Practical rules

- **Check support** before relying on one ([browser compatibility](/t/browser-compatibility)). Use feature detection: `if ("clipboard" in navigator)`.
- **Many need permission.** Location, notifications, camera and clipboard reads ask the user, who can say no. Handle denial gracefully.
- **Many need HTTPS** (secure contexts only).
- **Most are asynchronous** and return promises, so use `await` and handle errors.
- **Ask at the right moment**, after a user action, not on page load. Browsers may block unprompted requests.
- **Privacy**: collect only what you need.
- MDN is the reference for each API.
