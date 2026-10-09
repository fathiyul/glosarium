---
title: "Sass / CSS Preprocessors"
summary: "Languages adding variables, nesting and mixins that compile to CSS."
levels: { frontend: junior }
aliases: ["Sass", "SCSS", "Less", "Stylus", "CSS preprocessors"]
prereqs: ["css", "css-variables"]
related: ["css-variables", "css-architecture", "utility-first-css", "transpiler"]
---

A CSS preprocessor is a language that adds features CSS once lacked, like variables, nesting, mixins and functions, and compiles to ordinary CSS. The best known is Sass (with `.scss` syntax). Less and Stylus are others.

```scss
$accent: #2f5bd3;

@mixin card($pad: 1rem) {
  padding: $pad;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.product {
  @include card(1.5rem);
  color: $accent;

  &:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); }
  .title { font-size: 1.25rem; }       // compiles to .product .title
}
```

The build step turns that into plain CSS the browser understands ([build tools](/t/build-tool)).

## What they add

- **Variables** (`$accent`)
- **Nesting** of rules
- **Mixins and functions** for reusable chunks
- **Partials and imports** for splitting files (`@use`)
- **Math and color functions**, loops and conditions

## Do you still need one?

Browsers have caught up on much of this:

- [CSS variables](/t/css-variables) are native, and change at runtime (Sass variables vanish at compile time).
- Native CSS nesting is now supported in current browsers.
- `calc()` and modern color functions cover much of the math.

Preprocessors still help with mixins, loops that generate classes, and large codebases. For new small projects, plain CSS is often enough.

## Cautions

- **Deep nesting** creates long, high-specificity selectors that are hard to override. Keep it to 2-3 levels ([specificity](/t/specificity)).
- **Don't generate huge CSS** with careless mixins.
- **Debug compiled output**: source maps let DevTools show your original lines.
- **Only the compiled CSS is shipped**, so slow builds are the cost, not slow pages.

Sass appears in plenty of existing projects, so it's worth recognizing. See also [CSS architecture](/t/css-architecture).
