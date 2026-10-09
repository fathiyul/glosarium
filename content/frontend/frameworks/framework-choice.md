---
title: "Choosing a Framework"
summary: "Choosing between React, Vue, Svelte and Angular based on team and product needs."
levels: { frontend: senior }
aliases: ["choosing a framework", "React vs Vue", "React vs Angular", "picking a frontend framework", "framework selection"]
prereqs: ["ui-framework"]
related: ["ui-framework", "meta-framework", "reactivity", "virtual-dom", "signals", "component-library"]
core: [frontend]
---

React, Vue, Svelte, Angular, Solid and others all solve the same core problem: building UIs from components and keeping them in sync with state ([UI frameworks](/t/ui-framework)). No framework is best in all situations, and the "right" choice is mostly about **fit**, not features.

## What to weigh

| Factor | Questions |
|---|---|
| **Team skills** | What does the team already know? Retraining costs months, and familiarity usually beats a theoretical advantage |
| **Hiring and community** | How easy is it to hire people with this experience? How large and healthy is the community, and how good is learning material? |
| **Ecosystem** | Are there mature libraries for routing, forms, data fetching, UI components, testing and accessibility? ([component libraries](/t/component-library)) |
| **Product needs** | SEO and fast first loads (server rendering, [meta-frameworks](/t/meta-framework))? A highly interactive app? Mostly static content? Mobile apps? |
| **Performance needs** | Bundle size and runtime performance matter for some audiences. Check real measurements, not slogans |
| **Maturity and stability** | Release cadence, breaking changes, long-term support, and who backs it |
| **Opinionation** | A full framework (routing, forms, DI included) gives structure. A library gives freedom and requires assembling the rest |
| **Existing code** | Migrating a working app is costly. Frameworks can often coexist for a while |
| **Longevity** | Will it likely be maintained in five years? (Hard to know, but look at governance and adoption) |

## Broad characterizations (generalizations, not rules)

- **React**: very large ecosystem and hiring pool. A library at its core, with many ways to assemble an app. Often used with a meta-framework.
- **Vue**: approachable, with a cohesive official ecosystem. Template-based, with a gentle learning curve.
- **Angular**: full, opinionated framework with TypeScript and dependency injection built in. Common in large enterprises.
- **Svelte**: compiles components to efficient code, with less boilerplate. A smaller ecosystem.
- **Solid and others**: fine-grained reactivity (signals), with a focus on performance ([signals](/t/signals), [reactivity](/t/reactivity)).

These are impressions that change over time. Check current information.

## A sensible process

1. **List requirements and constraints** (team, deadlines, SEO, devices).
2. **Shortlist two or three** options that fit.
3. **Build a small prototype** of something representative, such as a real page with data fetching, forms and a tricky interaction. Compare developer experience and results.
4. **Decide, and write it down**, with the reasons ([architecture decision record](/t/architecture-decision-record)).
5. **Don't relitigate** without a real reason.

## Cautions

- **Avoid choosing by hype** or by what's trending on social media.
- **Don't over-index on benchmarks**. Most apps' performance problems come from architecture and data, not the framework.
- **Avoid framework lock-in where it's cheap to avoid**: keep business logic outside components, and use standard web features.
- **Fundamentals transfer.** Components, state, props, effects and routing are shared concepts. Learn them well, and switching is much easier.

For most teams, the team's existing skill and the ecosystem matter more than small technical differences.
