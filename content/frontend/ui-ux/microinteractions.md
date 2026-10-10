---
title: "Microinteractions"
summary: "Small animations and feedback that make UI feel responsive."
levels: { frontend: mid-level }
aliases: ["microinteractions", "micro-interactions", "ui feedback"]
prereqs: ["css-animations", "visual-hierarchy"]
related: ["css-animations", "reduced-motion", "perceived-performance"]
---

**Microinteractions** are the small feedback moments around single actions: a button's press state, a toggle's slide, a like's burst, a copy button's "copied" confirmation, pull-to-refresh tension. Each has a trigger, rules, feedback and loops/modes — and together they carry the product's *feel*.

```text
trigger (tap like) → rules (toggle state, count+1) → feedback (burst + haptic)
→ loop/mode (persisted liked state)
```

Good ones confirm (action registered), orient (what changed), and delight sparingly (personality without ceremony). They're perceived-performance machinery too — instant acknowledgement makes waits tolerable. Treat each microinteraction as a tiny contract: trigger, honest feedback, settled state.

The classic mistakes:

- No feedback. Buttons that do nothing visible for 500ms get hammered repeatedly. Acknowledge every action within milliseconds.
- Gratuitous motion. Decorative animation on every control exhausts attention and insults reduced-motion users. Motion communicates; decoration distracts.
- Ignoring reduced motion. Microinteraction animation must honour the preference — instant state changes, not animated ones (see [reduced motion](/t/reduced-motion)).
- Feedback lying. Success animations for actions still pending (or failed) betray trust when reality differs. Confirm real outcomes; indicate pending honestly.
- Inconsistent language. Five different success animations for five features reads as five products. A shared motion vocabulary (durations, easings, patterns) unifies feel.
- Haptics thoughtlessness. Vibration for everything desensitises; vibration for nothing misses a channel. Reserve haptics for confirmations and warnings.
- Sound by default. Audio feedback unprompted embarrasses and annoys. Silent by default; sound opt-in.

**The craft:** instant acknowledgement, honest outcomes, shared motion language, reduced-motion respected. Microinteractions are the product's manners — felt everywhere, noticed when absent.
