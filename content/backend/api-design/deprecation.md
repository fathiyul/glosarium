---
title: "Deprecation"
summary: "Marking something for removal and giving users time to migrate."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["api deprecation", "deprecation", "sunsetting an api"]
prereqs: ["backward-compatibility", "api-contract"]
related: ["api-lifecycle", "breaking-change", "api-documentation"]
---

**Deprecation** is the process of retiring part of an API — an endpoint, a field, a version — without surprising anyone. Something has to go; deprecation is how you signal it early, give consumers time to move, and finally switch it off. It's the opposite of an abrupt removal.

A workable sequence:

1. Announce — document the deprecation, say why and give a **sunset** date.
2. Warn programmatically — return a `Deprecation` header (and often a `Sunset` header, and a link to migration docs) so clients can detect it automatically.
3. Track usage — monitor who's still calling it. You can't safely remove what you can't see.
4. Remind and support — contact heavy users, provide the replacement and a migration guide.
5. Remove — after the window, once usage is zero or the deadline passes.

```text
Deprecation: true
Sunset: Wed, 01 Jan 2027 00:00:00 GMT
Link: <https://docs.example.com/migrate>; rel="deprecation"
```

The classic mistakes:

- Removing without warning. The classic betrayal: a field disappears and integrations break overnight. Deprecate first.
- Deprecating with no deadline. An open-ended "deprecated" notice lingers forever; nothing forces migration. A sunset date creates urgency.
- No replacement documented. Telling consumers something is going away without saying what to use instead turns deprecation into a puzzle.
- Not measuring residual usage. Blind removal breaks the one client still on the old path. Watch usage until it's truly zero.
- Crying wolf. Deprecating things and never removing them trains consumers to ignore deprecation notices, so the real one is missed.
- Confusing deprecation with removal. Deprecated means "still works, going away"; it's gone only when sunsetting completes.

**How to do it well:** as soon as you know something must go, announce it, expose machine-readable warnings, help consumers migrate, and hold to the sunset. It's the graceful end of a [breaking change](/t/breaking-change) and a normal stage of the [API lifecycle](/t/api-lifecycle) — not a failure.
