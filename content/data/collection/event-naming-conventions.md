---
title: "Event Naming Conventions"
summary: "Consistent names like order_completed so events are findable and comparable."
levels: { data-engineer: junior, backend: junior }
aliases: ["event naming", "analytics event names", "tracking event names", "naming events"]
prereqs: ["instrumentation"]
related: ["tracking-plan", "instrumentation", "client-vs-server-tracking", "naming", "data-product"]
core: [data-engineer]
---

Analytics events (`order_completed`, `video_played`) are only useful if people can **find them, understand them and compare
them**. Without conventions you end up with `Click`, `button_click`, `clicked_button` and `ClickedBuyNow2` all meaning the same thing, and
a dashboard nobody trusts.

## A common convention: object + past-tense action

```
order_completed
cart_item_added
video_played
account_created
subscription_cancelled
```

- **Format**: `snake_case`, lowercase, no spaces or special characters. Pick one style and keep it.
- **Past tense**, because the event records something that already happened (`added`, not `add`).
- **Object first, then action**, so related events sort together and are easy to search (`cart_item_added`, `cart_item_removed`).
- **Specific, not generic.** `checkout_started` tells a story; `click` tells nothing.

## Put details in properties, not in the name

```
// bad: a new event name per button
clicked_blue_signup_button_on_homepage

// good: one event, with properties
signup_button_clicked   { location: "homepage", variant: "blue" }
```

Names stay few and stable, and properties carry the detail. Use consistent property names as well (`user_id`, not
`userId` in one place and `uid` in another), consistent types (an amount is always a number, in the same units) and
consistent values (`"USD"`, not sometimes `"usd"`).

## Habits

- **Document every event** in a [tracking plan](/t/tracking-plan): name, when it fires, properties and types, owner.
- **Don't rename events casually.** Old and new names split your history. If you must, handle the mapping in the
  pipeline and note the change date.
- **Review new events** the way you review API changes.
- **Don't encode data in the name** (user IDs, dates, A/B variants).
- **Keep personal data out of names and properties** unless you have a clear need and consent
  ([consent at collection](/t/consent-at-collection)).
- **Distinguish where the event came from** (client or server) when it matters
  ([client vs server tracking](/t/client-vs-server-tracking)).

Naming is the same discipline as naming in code ([naming things](/t/naming)). The difference is that event names are a contract
many other people's queries depend on, so changes are costly.
