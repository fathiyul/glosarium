---
title: "Screen Reader"
summary: "Software that reads the interface aloud for blind and low-vision users."
levels: { frontend: junior }
aliases: ["screen reader software", "assistive technology"]
prereqs: ["dom"]
related: ["accessible-forms", "focus-visible", "dom"]
---

A screen reader is software that speaks the content of a page aloud, or sends it to a braille display. Blind and low-vision users rely on it, and so do people who use voice control or are just reading with their eyes closed. Common examples include NVDA and JAWS on Windows, VoiceOver on macOS and iOS, and TalkBack on Android.

A screen reader doesn't read pixels. It reads the browser's accessibility tree, which is built from the [DOM](/t/dom) and its roles, names and states. If you build a button out of a `<div>`, the tree says "group" and not "button", and the user never learns it can be pressed.

```html
<!-- Announced as "Save, button" -->
<button type="button">Save</button>

<!-- Announced as a group with no name; nothing tells the user it's clickable -->
<div class="btn" onclick="save()">Save</div>
```

The classic mistake is assuming a page that looks right works for everyone. Use real elements (`<button>`, `<a>`, `<label>`, headings in order) so the browser provides the right roles and keyboard behaviour. Then test with a screen reader at least once, because the spoken output is often different from what you expected. See [accessible forms](/t/accessible-forms) for a concrete case and [focus visibility](/t/focus-visible) for keyboard users.
