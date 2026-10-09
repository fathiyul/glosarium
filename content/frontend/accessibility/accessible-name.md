---
title: "Accessible Name"
summary: "The text assistive technology announces for an element."
levels: { frontend: mid-level }
aliases: ["accessible names", "name computation", "aria-label", "aria-labelledby", "accessible name and description"]
prereqs: ["semantic-html", "aria"]
related: ["aria", "screen-reader", "alt-text", "accessible-forms", "first-rule-of-aria", "accessibility-testing"]
core: [frontend]
---

The **accessible name** is the text that assistive technology, such as a screen reader, uses to identify an element. When a screen reader lands on a control it announces **role, name and state**: "Search, button", "Email, edit text, required".
An interactive element **without a name** is announced as just "button" or "link", and is unusable for someone who can't see it.

## Where the name comes from

The browser computes it from the first available source, in roughly this order:

1. **`aria-labelledby`**: points to other element(s) whose text is the name.
2. **`aria-label`**: a string attribute.
3. **Native source**: a `<label>` for a form field, `alt` on an image, the visible text content of a button or link, `<caption>` for tables, `<legend>` for fieldsets.
4. **`title`** or `placeholder`, as a last resort (unreliable).

```html
<button>Save</button>                                   <!-- name from content: "Save" -->
<button aria-label="Close dialog">✕</button>           <!-- icon-only: needs a label -->
<label for="email">Email</label> <input id="email">     <!-- name from the label -->
<img src="logo.svg" alt="Acme Hardware">                <!-- name from alt -->
<section aria-labelledby="h">
  <h2 id="h">Billing</h2> …
</section>
```

## Common failures

- **Icon-only buttons and links** with no text: `<button><svg>…</svg></button>`. Add `aria-label` or visually hidden text.
- **Inputs with only a placeholder.** Placeholders disappear and aren't reliable labels. Use a real `<label>` ([accessible forms](/t/accessible-forms)).
- **Vague link text** ("click here", "read more") out of context. A screen reader user often browses a list of links.
- **Images without `alt`** ([alt text](/t/alt-text)).
- **Name differs from the visible label.** Voice control users say what they see ("click Search"), so the accessible name should contain the visible text.

## Check it

- The **Accessibility** panel in browser DevTools shows the computed name, role and state for any element.
- Try a [screen reader](/t/screen-reader), and automated checks (axe, Lighthouse) catch many missing names ([accessibility testing](/t/accessibility-testing)).

## Habits

Prefer **native sources** (visible label text, `alt`, content) over ARIA attributes, per the [first rule of ARIA](/t/first-rule-of-aria). Use `aria-label` or `aria-labelledby` only where there's no visible text to rely on. Then the name stays correct for everyone and in sync when the text changes.
