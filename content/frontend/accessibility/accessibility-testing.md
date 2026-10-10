---
title: "Accessibility Testing"
summary: "Automated checks like axe plus manual keyboard and screen reader testing."
levels: { frontend: mid-level }
aliases: ["accessibility testing", "a11y testing", "accessibility audit"]
prereqs: ["accessibility", "aria"]
related: ["screen-reader", "keyboard-navigation", "testing-library"]
---

**Accessibility testing** verifies disabled users can actually use the product — in three layers: automated checks (linters and audit tools catching missing labels, contrast, structure — fast, ~30% of issues), manual testing (keyboard-only navigation, screen-reader passes, zoom and reflow — the bulk), and disabled users testing (real barriers automation can't see).

```text
automated (CI, every commit) → manual (keyboard + SR passes, per feature)
→ users with disabilities (periodic, paid, listened to)
```

Automation gates regressions; humans find the actual barriers. A green audit with an unusable keyboard flow is the standard failure — the score is a floor, never a verdict.

The classic mistakes:

- Audit-score theatre. 100/100 automated with broken focus management and nonsense screen-reader output. Scores catch mechanics; humans judge usability.
- No keyboard testing. Tab through every feature per release — focus visible, trapped nowhere, order logical. Most barriers surface in ten keyboard minutes.
- Untested dynamic content. Modals, toasts, validation and live regions need screen-reader passes specifically; static audits miss dynamic behaviour entirely.
- One screen reader, one browser. VoiceOver/Safari and NVDA/Chrome behave differently enough to matter. Cover the pair your users use, minimum.
- Testing late. Accessibility bolted on pre-launch costs 10× early integration. Test per component (stories), per feature (manual passes), continuously (CI).
- Ignoring zoom and reflow. 200–400% zoom and 320px widths break layouts automation approves. Test reflow, not just code.
- No disabled testers. Simulating disability misses lived experience — workarounds, expectations, actual blockers. Pay disabled users to test; treat findings as bugs.

**The practice:** automated gates in CI, keyboard pass per feature, screen-reader passes per flow, disabled testers periodically. Layers catch different barriers; all three ship access.
