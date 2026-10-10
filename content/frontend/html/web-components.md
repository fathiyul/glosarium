---
title: "Web Components"
summary: "Browser-native custom elements with encapsulated styles."
levels: { frontend: senior }
aliases: ["web components", "custom elements", "webcomponents"]
prereqs: ["shadow-dom", "dom"]
related: ["shadow-dom", "template-element", "javascript"]
---

**Web Components** are the platform's component model: **custom elements** (your own tags with lifecycle callbacks), Shadow DOM (encapsulation), and templates (inert markup) — composing into reusable widgets that work in any framework or none, versioned and shipped like any script.

```text
custom element (define tag + behaviour)
  + shadow DOM (isolated internals)
  + <template>/<slot> (markup + composition)
  = <date-picker> usable in React, Vue, plain HTML…
```

Their superpower is interop: a design-system widget written once embeds in every consumer's stack. Their gaps are ecosystem convenience — no built-in reactivity, templating ergonomics, or SSR story as rich as frameworks' — which libraries and framework integrations increasingly fill.

The classic mistakes:

- Rebuilding a framework badly. Hand-rolled reactivity, routing and state atop custom elements recreates React poorly. Use web components at boundaries (design systems, embeds); frameworks for apps.
- Ignoring SSR. Custom elements render client-side by default — SSR/declarative shadow DOM stories exist but need deliberate setup, or first paint and SEO suffer.
- Attribute/property impedance. Attributes are strings; properties can be anything. Design the component's API across both (reflected attributes for declarative use, properties for rich data).
- Styling from outside assumed. Consumers expect theming — expose custom properties and parts, document them, or every adoption forks the styles.
- Form and a11y gaps. Keyboard, roles, focus and form participation need explicit implementation. Native elements remain the accessibility benchmark — match them.
- Versioning collisions. Two versions of a component on one page share the tag registry (first definition wins). Namespace or coordinate major versions.
- Framework wrapper churn. Thin framework adapters rot when either side updates. Keep adapters minimal or consume the components directly.

**When to choose them:** shared widgets across heterogeneous consumers — design systems, embeds, micro-frontend composition. For single-framework apps, the framework's components are usually the better tool.
