---
title: "Pixel Perfect vs Good Enough"
summary: "Knowing when to match a design exactly and when to push back."
levels: { frontend: junior }
prereqs: ["css"]
related: ["ux-basics", "responsive-images", "accessible-forms"]
---

"Pixel perfect" means matching a design exactly: the same spacing, sizes and colours, down to the pixel. Designers care about this, and a close match is part of doing the job well. But an exact copy is not always the right goal.

Focus your effort on the things that matter to users:

- **Layout, hierarchy and spacing rhythm**, so the page reads the way the designer intended.
- **States**, such as hover, error, empty and loading. These are often missing from a design and matter a lot to users.
- **Text and touch targets** that stay usable when users change their text size or use a phone.

Push back when an exact match would cause a problem. A fixed height can cut off text when a user increases their font size:

```css
/* Matches the design at the default text size, but clips when text grows */
.label { height: 18px; }

/* Keeps the design's size as a minimum, and grows with the content */
.label { min-height: 18px; }
```

The classic mistake is spending hours on one-pixel differences that no user will notice, while missing the error and loading states entirely. When the design uses a value your system doesn't have, raise it early and suggest the closest existing one. That's usually better than a one-off value that's hard to maintain.
