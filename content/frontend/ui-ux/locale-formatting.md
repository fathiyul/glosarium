---
title: "Locale-Aware Formatting"
summary: "Formatting numbers, currencies and dates per locale with Intl."
levels: { backend: mid-level, frontend: junior }
aliases: ["Intl"]
prereqs: ["variable"]
related: ["ux-basics", "error-message-ux", "http-headers"]
---

Locale-aware formatting shows numbers, currencies, dates and times the way people in a given region expect them. Browsers provide this through the `Intl` API, so you don't need to write the rules yourself.

```js
const price = 1234.5;

new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
// e.g. "$1,234.50"

new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);
// e.g. "1.234,50 €"
```

The output depends on the locale you pass, so pick it from the user's language setting or profile, not from a hard-coded value.

On the backend, store dates and times in UTC with a clear time zone, and format them for the user when you display them. Don't bake one display format into the stored data. A request's `Accept-Language` header is one hint about what locale to use, but a saved user preference is usually more reliable.

The classic mistake is hard-coding one format everywhere, such as `MM/DD/YYYY` or a `$` sign in front of every price. The date `03/04/2026` means 3 April in one country and 4 March in another, so a hard-coded format can mislead users.
