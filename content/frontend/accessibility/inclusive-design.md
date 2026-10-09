---
title: "Inclusive Design"
summary: "Designing for the full range of human ability from the start."
levels: { frontend: senior }
aliases: ["inclusive design principles", "designing for everyone", "universal design", "accessible design", "inclusive UX"]
prereqs: ["accessibility", "wcag"]
related: ["accessibility", "wcag", "keyboard-navigation", "color-contrast", "internationalization", "reduced-motion"]
core: [frontend]
---

**Inclusive design** is designing products so they work for **the widest range of people from the start**: different abilities, ages, languages, devices, environments and circumstances. It treats diversity as the normal case, not an edge case to patch later.

[Accessibility](/t/accessibility) (meeting specific standards such as [WCAG](/t/wcag)) is a major part of it. Inclusive design goes further: it asks **who is being left out, and why**, and designs around those reasons.

## The disability spectrum: permanent, temporary, situational

A useful lens: limitations aren't only permanent.

| Need | Permanent | Temporary | Situational |
|---|---|---|---|
| Using one hand | One arm | Broken arm | Holding a baby |
| Seeing the screen | Blind | Eye injury, dilated pupils | Bright sunlight |
| Hearing | Deaf | Ear infection | Noisy cafe, silent meeting |
| Understanding the language | Cognitive differences | Stress, fatigue, brain fog | Reading in a second language |

Features built for one group help many: captions help deaf users, people in noisy places and people learning the language. Keyboard support helps motor-impaired users, power users and anyone whose trackpad died.

## Principles often cited

- **Recognize exclusion.** Look at who's excluded by assumptions in the design (mouse use, fast reading, perfect vision, good connectivity).
- **Learn from diversity.** Involve people with different abilities and backgrounds early. They find problems you can't.
- **Solve for one, extend to many.** Designing for a specific constraint often yields better solutions for everyone.
- **Offer choices and flexibility** rather than one rigid way to do things.

## In practice, for frontend work

- **Semantic HTML, keyboard operability and clear focus** ([semantic HTML](/t/semantic-html), [keyboard navigation](/t/keyboard-navigation)).
- **Sufficient contrast and no color-only meaning** ([color contrast](/t/color-contrast)).
- **Text that can be resized and reflowed**, flexible layouts.
- **Captions, transcripts and text alternatives** ([alt text](/t/alt-text)).
- **Respect user preferences**: reduced motion, dark mode, larger text ([reduced motion](/t/reduced-motion)).
- **Plain language** and clear, forgiving forms and errors ([error message UX](/t/error-message-ux)).
- **Generous touch targets** and no hover-only interactions.
- **Performance on low-end devices and slow networks.**
- **Internationalization**: other languages, scripts and reading directions ([internationalization](/t/internationalization), [RTL support](/t/rtl-support)).
- **Avoid time limits and flashing content**, or let users extend and control them.
- **Representation and respect** in imagery, names, gender options and address formats, instead of assuming one default.

## Process

Include it in **research** (diverse participants), **design** (inclusive patterns, tested prototypes), **development** (standards and linting) and **QA** (assistive technology testing). Doing it early is far cheaper than retrofitting ([accessibility testing](/t/accessibility-testing)).

The test of an inclusive product isn't a checklist score. It's whether real, different people can accomplish what they came to do.
