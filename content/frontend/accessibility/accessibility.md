---
title: "Accessibility (a11y)"
summary: "Making software usable by people with disabilities."
levels: { backend: junior, frontend: junior }
aliases: ["a11y", "web accessibility", "digital accessibility", "WCAG compliance"]
prereqs: ["semantic-html"]
related: ["wcag", "alt-text", "color-contrast", "keyboard-navigation", "screen-reader", "aria", "accessibility-testing"]
core: [frontend]
---

**Accessibility** (often written **a11y**, "a" + 11 letters + "y") means building software that people with
disabilities can use: people who are blind or have low vision, are deaf, have motor or cognitive differences, or
use a keyboard, a screen reader or voice control instead of a mouse.

It also helps many others: someone with a broken arm, a bright screen outdoors, a slow connection, or
who just prefers the keyboard. Disabilities can be permanent, temporary or situational.

## The basics that cover most issues

| Practice | What it means |
|---|---|
| [**Semantic HTML**](/t/semantic-html) | Real `<button>`, `<nav>`, headings and labels, so assistive tech understands the page |
| [**Keyboard access**](/t/keyboard-navigation) | Every action works without a mouse, with a visible focus indicator |
| [**Alt text**](/t/alt-text) | Images have text alternatives |
| [**Contrast**](/t/color-contrast) | Text is readable against its background |
| **Labels** | Every form field has a connected `<label>` ([accessible forms](/t/accessible-forms)) |
| **Don't rely on color alone** | An error needs an icon or text, not just red |
| **Respect user settings** | Text zoom, reduced motion ([reduced motion](/t/reduced-motion)) |
| **Captions and transcripts** | For audio and video |

```html
<!-- inaccessible: a div pretending to be a button -->
<div class="btn" onclick="save()">Save</div>

<!-- accessible: focusable, keyboard-operable and announced correctly for free -->
<button type="button" onclick="save()">Save</button>
```

## The standard

The **WCAG** guidelines ([WCAG](/t/wcag)) define testable criteria at levels A, AA and AAA. Level AA is the common
target. Many countries have accessibility laws or procurement rules that reference it, so it can be a legal
requirement as well as a good practice.

## For everyone, not just frontend

Backend developers affect it too: clear error messages from APIs, readable emails and PDFs, no
CAPTCHAs without an alternative, and timeouts that give people enough time.

## Testing

Automated tools (axe, Lighthouse) catch only a portion of problems. Also:

- Unplug the mouse and use only the keyboard.
- Try a [screen reader](/t/screen-reader).
- Zoom to 200% and check the layout.

Build it in from the start. Fixing accessibility at the end costs far more than doing it as you go
([accessibility testing](/t/accessibility-testing)).
