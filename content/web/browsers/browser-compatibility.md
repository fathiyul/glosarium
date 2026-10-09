---
title: "Browser Compatibility"
summary: "Making sure features work across browsers, e.g. by checking caniuse."
levels: { frontend: junior }
aliases: ["cross-browser compatibility", "caniuse", "browser support"]
prereqs: ["html-element", "css"]
related: ["polyfill", "feature-detection", "transpiler", "responsive-design", "browserslist"]
---

Browser compatibility means making sure your site works across the browsers and versions your users actually have. Browsers follow the same standards, but they implement new features at different times, and sometimes differently.

A feature that works in Chrome may be missing or buggy in Safari or an older Firefox. Mobile browsers and in-app browsers add more variety.

## Finding out what's supported

- **[Can I use](https://caniuse.com)** shows support tables for CSS, JavaScript and HTML features.
- **MDN's browser compatibility tables** at the bottom of each reference page.
- **Your own analytics**: which browsers and versions do your users have?

## Decide your targets

Choose which browsers you support, based on your audience, and write it down. A common way is a `browserslist` configuration that build tools use to decide how much to transform and polyfill ([browserslist](/t/browserslist)):

```
> 0.5%, last 2 versions, not dead
```

## Handling gaps

| Technique | How |
|---|---|
| **Feature detection** | check that the feature exists before using it: `if ("IntersectionObserver" in window)` ([feature detection](/t/feature-detection)) |
| **[Polyfills](/t/polyfill)** | add a missing API |
| **[Transpiling](/t/transpiler)** | convert new syntax to older syntax at build time |
| **Progressive enhancement** | work with the basics, and add extras where supported |
| **CSS fallbacks** | declare a simple value first, then the modern one |
| **Autoprefixing** | tooling adds vendor prefixes for CSS |

```css
.card { display: block; }
@supports (display: grid) {
  .card { display: grid; }
}
```

## Testing

- Test in real browsers and devices (at least Chrome, Safari, Firefox, and a mobile browser), not only the one you develop in.
- Use cloud device services for wide coverage.
- Check [responsive layouts](/t/responsive-design) at real sizes.
- Automated tests can run across engines (Playwright supports Chromium, Firefox and WebKit).

## Tips

- Don't use browser sniffing (the [user agent](/t/user-agent)). Detect features.
- Keep dependencies updated, since many fixes live there.
- Safari on iOS lags on some features, and all iOS browsers use its engine, so test it.
- Don't spend effort on browsers nobody uses. Let the data decide.
