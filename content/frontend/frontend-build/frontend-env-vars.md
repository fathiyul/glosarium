---
title: "Frontend Environment Variables"
summary: "Build-time variables, and why they're never secret in the browser."
levels: { frontend: junior }
aliases: ["VITE_ env variables", "NEXT_PUBLIC", "build-time environment variables", "client-side env vars", "import.meta.env"]
prereqs: ["environment-variable", "bundler"]
related: ["bundler", "vite", "app-configuration", "environments", "removing-secrets-from-history"]
core: [frontend]
---

Frontend apps also need configuration: the API URL, a feature switch, a public analytics key. Build tools offer
**environment variables**, but they work differently from the ones on a server, and the difference matters for security.

```js
// Vite
const api = import.meta.env.VITE_API_URL;

// Next.js
const api = process.env.NEXT_PUBLIC_API_URL;
```

## How they work

At **build time**, the bundler finds these names in your code and **replaces them with the actual values**. The final
JavaScript contains literal strings: `fetch("https://api.example.com/...")`.

Consequences:

- **Changing a value means rebuilding** (or redeploying), not just restarting.
- A different environment (staging vs production) needs its own build, or a runtime config file.
- Only variables with the **special prefix** (`VITE_`, `NEXT_PUBLIC_` and similar, which depends on the tool) are
  exposed to the browser code. The prefix is a guard against accidentally leaking others.

## The rule: nothing here is secret

Everything in the browser bundle can be read by anyone: open DevTools, search the JavaScript, or just look at the
network requests. So:

- **Never put secrets in frontend env vars**: API secret keys, database URLs, private tokens. A prefix like
  `VITE_` makes them *public*, not safe.
- **Safe to include**: values that are meant to be public, such as the API base URL, a public
  (publishable) key, a feature flag default, an analytics ID.
- If your app needs a secret to call a third-party API, **make the call from your server** and have the frontend
  call your server instead.

```
VITE_API_URL=https://api.example.com        # public: fine
VITE_STRIPE_SECRET_KEY=sk_live_...           # never: this ships to every visitor
```

If a secret has been bundled, treat it as leaked: **revoke and rotate it**. Deleting it from the repo later
doesn't undo the exposure. Keep local `.env` files out of Git ([.gitignore](/t/gitignore)), and see
[configuration](/t/app-configuration) and [environments](/t/environments).
