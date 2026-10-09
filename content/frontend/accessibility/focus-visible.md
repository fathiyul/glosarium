---
title: "Visible Focus"
summary: "Never removing the focus outline without a replacement."
levels: { frontend: junior }
aliases: [":focus-visible", "focus ring"]
prereqs: ["dom"]
related: ["accessible-forms", "screen-reader", "keyboard-navigation"]
---

Focus is the element that will receive keyboard input right now, such as the button you've tabbed to or the text field you're typing in. Visible focus means the browser shows where that focus is, usually as an outline. Keyboard users rely on that outline to know where they are on the page.

```css
/* Keep a clear indicator for keyboard users */
button:focus-visible {
  outline: 3px solid #1a5fb4;
  outline-offset: 2px;
}
```

The `:focus-visible` selector applies the style when the browser decides focus should be shown, which is typically when someone is navigating with the keyboard rather than clicking.

The classic mistake is removing the outline because it looks untidy:

```css
/* Common mistake: keyboard users can no longer see where they are */
button:focus {
  outline: none;
}
```

If you remove the default outline, replace it with something just as clear: a border, a background change or a box shadow. Make sure it has enough contrast against the surrounding colours. The simplest test is to press Tab through your page and check that you can always tell which element is active.
