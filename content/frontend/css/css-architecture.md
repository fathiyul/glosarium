---
title: "CSS Architecture"
summary: "Organizing styles so a large codebase stays maintainable."
levels: { frontend: senior }
aliases: ["CSS organization", "CSS methodology", "scalable CSS", "BEM architecture", "CSS at scale"]
prereqs: ["specificity", "css-selector"]
related: ["bem", "css-modules", "utility-first-css", "css-in-js", "css-layers", "design-tokens", "specificity"]
core: [frontend]
---

CSS is global by default, and every rule can affect any element. In a small site that's fine. In a large codebase with many people, it leads to the familiar mess: specificity wars, `!important` everywhere, styles that can't be deleted because nobody knows what uses them, and changes that break unrelated pages. **CSS architecture** is how you organize styles so the codebase **stays maintainable as it grows**.

## The problems an architecture solves

- **Global scope**: a generic `.title` in one place affects another.
- **Specificity conflicts**: ever-stronger selectors fighting each other ([specificity](/t/specificity)).
- **Order dependence**: results change depending on which stylesheet loads last.
- **Dead code**: unused rules that nobody dares to remove.
- **Inconsistency**: ten slightly different blues and nine spacing values ([design tokens](/t/design-tokens)).
- **Unclear ownership**: where do I put this style?

## Approaches

| Approach | Idea |
|---|---|
| **Naming conventions** ([BEM](/t/bem)) | Name classes predictably (`card__title--large`), so they're unique, flat and low-specificity |
| **Scoped styles** ([CSS Modules](/t/css-modules), component-scoped styles in frameworks) | Styles are local to a component by construction, with generated unique class names |
| **Utility-first CSS** ([utility-first CSS](/t/utility-first-css)) | Compose small single-purpose classes (`p-4 flex gap-2`) in markup, with no custom CSS growth |
| **CSS-in-JS** ([CSS-in-JS](/t/css-in-js)) | Styles written in JavaScript alongside components, with scoping and dynamic values |
| **Cascade layers** ([layers](/t/css-layers)) | Declare explicit priority between groups (reset, base, components, utilities), regardless of selector specificity |
| **Design tokens and variables** ([CSS variables](/t/css-variables)) | One source for colors, spacing and type |

They aren't mutually exclusive. A project might use tokens, layers, scoped component styles and a few utilities.

## Principles that hold across approaches

- **Keep specificity low and flat.** Style with single classes. No IDs, no deep nesting, and `!important` only in deliberate utility cases.
- **Scope by component**, so deleting a component deletes its styles.
- **Separate concerns**: base/reset, layout, components, utilities, themes.
- **Use tokens** instead of raw values.
- **Make layout the parent's job.** A component shouldn't set its own outer margin. Callers control spacing.
- **Prefer composition** to overriding. Provide variants and props rather than letting callers hack styles.
- **Be consistent** and document the convention. Enforce with linting ([linters](/t/linter)).
- **Plan for theming** (dark mode, brands) through tokens.
- **Watch performance**: CSS size, runtime cost of CSS-in-JS, unused CSS.

## Choosing

Match it to your stack and team: a component framework often suggests scoped styles, and a design-system-heavy team may like utilities plus tokens. The wrong choice is *no deliberate choice*, where each developer invents their own approach. Pick one, write it down and keep it consistent ([following conventions](/t/following-conventions)).
