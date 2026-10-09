---
title: "WCAG"
summary: "The Web Content Accessibility Guidelines and their A, AA and AAA levels."
levels: { frontend: mid-level }
aliases: ["Web Content Accessibility Guidelines", "WCAG 2.2", "WCAG 2.1", "WCAG AA", "accessibility guidelines"]
prereqs: ["accessibility"]
related: ["accessibility", "color-contrast", "keyboard-navigation", "alt-text", "accessibility-testing", "inclusive-design"]
core: [frontend]
---

**WCAG** (Web Content Accessibility Guidelines) is the international standard, published by the W3C, for making web content accessible. It's the benchmark that legal requirements, procurement rules and audits usually refer to. It exists in versions (2.0, 2.1,
2.2), each building on the last.

## Organized by four principles (POUR)

| Principle | Means content is... | Examples |
|---|---|---|
| **Perceivable** | Presentable in ways users can sense | Text alternatives for images, captions, sufficient [contrast](/t/color-contrast), resizable text |
| **Operable** | Usable with different inputs | Everything works by [keyboard](/t/keyboard-navigation), enough time, no seizure-inducing flashes, clear focus |
| **Understandable** | Predictable and clear | Readable language, consistent navigation, helpful error messages and labels |
| **Robust** | Interpretable by assistive technology | Valid markup, correct names, roles and states ([ARIA](/t/aria)) |

Under them sit testable **success criteria**, such as "text has a contrast ratio of at least 4.5:1" or "all functionality is available from a keyboard".

## Conformance levels

| Level | Meaning |
|---|---|
| **A** | The minimum. Basic barriers removed |
| **AA** | The common target, and what most laws and policies require. Includes contrast, resize, focus visibility |
| **AAA** | The highest. Not required in full for most sites, because some criteria can't apply to all content |

Version 2.2 added criteria such as a minimum **target size** for pointer inputs (24 by 24 CSS pixels at AA, with exceptions), focus that isn't hidden behind sticky elements, simpler authentication without cognitive tests, and less repeated data entry.

## Using it in practice

- **Aim for AA** unless you're told otherwise, and check which version your requirements name.
- **Build it in from the start** ([accessibility](/t/accessibility)), through semantic HTML, a design system with accessible components, and testing in the workflow.
- **Combine testing types**: automated scanners catch a portion of issues, and keyboard testing, screen reader testing and review catch the rest ([accessibility testing](/t/accessibility-testing)).
- **Read the criteria you're failing**, since the guidance documents explain intent and give techniques. Don't just chase the checker's wording.
- **Document known gaps** and a plan to fix them.

A site can pass automated checks and still be unusable. WCAG compliance is a floor for access, and real usability with real assistive technology is the goal ([inclusive design](/t/inclusive-design)). Legal requirements differ by country and sector, so check the rules that apply to you.
