---
title: "Progressive Enhancement"
summary: "A baseline that works without JavaScript, enhanced when it's available."
levels: { frontend: mid-level }
aliases: ["progressive enhancement", "baseline first", "layered experience"]
prereqs: ["feature-detection", "accessibility"]
related: ["graceful-degradation", "feature-detection", "htmx"]
---

**Progressive enhancement** builds the working baseline first — semantic HTML that submits, links and reads everywhere — then layers CSS and JavaScript where supported. A form posts natively; JS upgrades it to inline validation and AJAX. Core function never depends on the enhancement layers.

```text
layer 0: HTML works (links, forms, content) — everywhere, always
layer 1: CSS beautifies (unloaded → still usable)
layer 2: JS enhances (fails → baseline still works)
```

Its mirror is graceful degradation (start rich, handle failure); enhancement starts from guaranteed function. The payoff is resilience: failed scripts, blocked CDNs, exotic browsers and assistive tech all get the working core.

The classic mistakes:

- JS-required rendering. Client-only apps with blank `<div id="root">` and no SSR fail every baseline — crawlers, no-JS users, failed bundles all see nothing. Render core content server-side.
- Enhancement-only features. Critical actions (checkout, auth) implemented solely as JS behaviours exclude baseline users from what matters most. Core flows work natively.
- Assuming failure modes. "CDN never fails" and "everyone runs our JS" are the assumptions enhancement exists to survive. Test with JS off and assets blocked.
- All-or-nothing layering. One giant bundle that either works or doesn't wastes the layering. Split critical enhancement from nice-to-have; isolate failures.
- Forgetting form semantics. Divs with click handlers instead of forms/buttons break baseline submission, keyboard and assistive tech simultaneously. Native controls first.
- Enhancement hiding content. JS that *replaces* server content on load (rather than enhancing it) flashes and fails. Enhance in place; don't swap foundations.
- No testing of layers. Baselines untested rot (broken forms nobody notices until the CDN does). Test each layer: HTML alone, +CSS, +JS.

**The discipline:** HTML carries function, CSS carries presentation, JS carries enhancement — each valuable alone. Resilience isn't a feature; it's the architecture.
