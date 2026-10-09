---
title: "Color Contrast"
summary: "Enough contrast between text and background to be readable."
levels: { frontend: junior }
aliases: ["contrast ratio", "text contrast", "WCAG contrast", "low contrast text"]
prereqs: ["accessibility"]
related: ["wcag", "dark-mode", "css-variables", "design-tokens", "accessibility-testing", "focus-visible"]
core: [frontend]
---

**Color contrast** is the difference in brightness between text and its background. Low contrast text is
hard or impossible to read for people with low vision or color-vision differences, and for everyone in bright
sunlight or on a poor screen.

It's measured as a ratio from 1:1 (no difference) to 21:1 (black on white).

## WCAG minimums (level AA)

| Content | Required ratio |
|---|---|
| Normal text | **4.5 : 1** |
| Large text (about 18pt, or 14pt bold, and up) | **3 : 1** |
| UI components and graphics (borders of inputs, icons that convey meaning, focus indicators) | **3 : 1** |

Level AAA asks for 7:1 for normal text. Logos and purely decorative elements are exempt.

```css
/* fails: light gray on white is about 2.3:1 */
.hint { color: #aaa; background: #fff; }

/* passes: about 7:1 */
.hint { color: #595959; background: #fff; }
```

## Habits

- **Check with a tool.** Browser DevTools show the contrast ratio in the color picker, and checkers
  such as WebAIM's, or Figma plugins, calculate it. Don't judge by eye.
- **Check all states**: hover, disabled, focus, placeholder text (frequently too pale), links within text, text over
  images or gradients.
- **Check dark mode separately** ([dark mode](/t/dark-mode)). A palette that passes in light mode may not in dark.
- **Don't use color as the only signal.** A red border alone doesn't tell color-blind users there's an error. Add an
  icon and text. Links in paragraphs need more than color to stand out, such as an underline.
- Build compliant palettes into your [design tokens](/t/design-tokens) so every use inherits them.

Make sure the focus ring is visible too ([focus-visible](/t/focus-visible)). Exact thresholds and exceptions are in
[WCAG](/t/wcag).
