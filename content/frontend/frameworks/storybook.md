---
title: "Storybook"
summary: "Developing and documenting components in isolation."
levels: { frontend: mid-level }
aliases: ["storybook", "component storybook", "component explorer"]
prereqs: ["component-composition", "testing-library"]
related: ["testing-library", "design-system", "visual-regression-test"]
---

**Storybook** renders components in isolation as *stories* — each a state/variant (default, loading, error, empty, long-text) browsable, tweakable via controls, and reviewable without running the app. It's a workshop for building states, a catalogue for designers, and executable documentation for consumers.

```text
Button.stories: Default / Primary / Disabled / Loading / WithIcon
each: render + controls (props) + docs + visual snapshot target
```

Stories force state coverage (the empty and error states that apps forget), enable visual regression testing per component, and give design-system consumers a live reference better than any wiki.

The classic mistakes:

- Stories for happy paths only. Default-only stories document nothing about loading, error, empty and overflow states — the states that break in production. Story every meaningful state.
- Mock data fantasies. Pristine fixtures hide real-world breakage (long names, missing avatars, RTL). Use realistic, ugly data.
- Stories rotting. Stories importing app internals (stores, routers) break on refactors and get deleted rather than fixed. Keep stories self-contained with mocked boundaries.
- No visual regression. Stories without snapshot comparison catch nothing automatically. Wire chromatic/visual tests or stories are just a gallery.
- Knobs as API. Controls tweaking every internal prop invite consumers to depend on internals. Expose the public prop surface; keep experiments in private stories.
- Ignoring accessibility checks. Storybook's a11y addon audits each story cheaply — unwired, violations ship per component.
- Story sprawl. Auto-generated stories for every trivial wrapper bury meaningful ones. Curate: stories for reusable, stateful, visual components.

**How to use it:** stories per component per state, realistic data, visual regression wired, a11y checks on. It's the component contract made visible — build states here before users find the missing ones.
