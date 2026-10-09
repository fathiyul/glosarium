---
title: "The Cascade"
summary: "How origin, specificity and order combine to resolve styles."
levels: { frontend: junior }
aliases: ["CSS cascade", "cascade order", "style precedence"]
prereqs: ["css", "css-selector"]
related: ["specificity", "css-inheritance", "css-architecture", "css-variables"]
---

The cascade is how CSS decides which value wins when several rules set the same property on the same element. Rules are compared in a fixed order of tie-breakers.

1. **Importance and origin**: `!important` declarations beat normal ones. Author styles (yours) beat the browser's defaults.
2. **Layers**: with `@layer`, later layers beat earlier ones (for normal declarations).
3. **[Specificity](/t/specificity)**: a more specific selector beats a less specific one. An ID beats a class, and a class beats a tag.
4. **Source order**: if everything else is equal, the rule written last wins.

```css
p { color: black; }
.note { color: gray; }        /* wins: class beats tag */
p { color: navy; }            /* equal to the first; later, but .note is still more specific */
```

```html
<p class="note">Gray</p>
```

## Inheritance is separate

If no rule targets an element for a property, an inheritable one comes from the parent ([inheritance](/t/css-inheritance)). Any matching rule beats an inherited value.

## Why it matters

Most "my CSS isn't working" problems are cascade problems:

- A more specific rule elsewhere overrides yours.
- Your rule comes earlier in the file than a rival of equal specificity.
- A third-party stylesheet is loaded after yours.
- Inline styles (`style="..."`) beat selectors.

## Debugging

DevTools shows the matched rules in order, and strikes through the ones that lost ([DevTools](/t/browser-devtools)). Read the list from top to bottom to see why.

## Working with it

- **Keep specificity low and flat**, using single classes ([BEM](/t/bem)).
- **Avoid `!important`** except for deliberate utility overrides. It starts an arms race.
- **Order stylesheets** deliberately: resets, base, components, then utilities.
- **Use `@layer`** to control order explicitly, regardless of specificity ([CSS architecture](/t/css-architecture)).

The "C" in CSS is the cascade, and understanding it is what separates guessing from knowing.
