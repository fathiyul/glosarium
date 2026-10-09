---
title: "Data Attributes"
summary: "Custom data-* attributes for storing extra info on elements."
levels: { frontend: junior }
aliases: ["data-* attributes", "dataset", "custom attributes"]
prereqs: ["html-attribute"]
related: ["html-attribute", "dom-manipulation", "css-selector", "event-delegation", "semantic-html"]
---

Data attributes are custom HTML attributes starting with `data-`, for storing extra information on an element. The HTML standard reserves the prefix, so they won't clash with future attributes.

```html
<button class="add" data-product-id="7" data-price="29.99" data-in-stock>
  Add kettle
</button>
```

## Reading them in JavaScript

```js
const btn = document.querySelector(".add");
btn.dataset.productId;        // "7"  (data-product-id becomes productId: camelCase)
btn.dataset.price;            // "29.99", always a string
btn.dataset.inStock;          // "" (present, empty value)
btn.dataset.note = "gift";    // sets data-note="gift"
```

Hyphenated names become camelCase on `dataset`.

## Using them in CSS

```css
button[data-in-stock] { opacity: 1; }
.card[data-state="open"] { max-height: 20rem; }
```

## Good uses

- **Hand data from the server to JavaScript**: IDs and settings for a component.
- **Event delegation**: one listener on a list reads `event.target.dataset.id` to know which item was clicked ([event delegation](/t/event-delegation)).
- **State hooks for styling**: `data-state="loading"`.
- **Test selectors**: `data-testid="save-button"`, a stable hook for UI tests ([Testing Library](/t/testing-library)).

## Cautions

- **Values are always strings.** Convert numbers and booleans yourself.
- **Visible to everyone.** Anyone can read and edit them in DevTools. Never store secrets, and don't trust them as input on the server ([never trust the client](/t/never-trust-the-client)).
- **Not for large data.** Use JSON in a script tag, or fetch it.
- **Not for styling content or accessibility.** Use real attributes (`aria-*`, `hidden`) for those.
- **Escape untrusted values** when generating HTML.
- Frameworks often have better ways (props, state), so use `data-*` where plain HTML is involved.
