---
title: "Feature Detection vs Browser Sniffing"
summary: "Checking whether a feature exists instead of guessing from the browser's name."
levels: { frontend: mid-level }
aliases: ["feature detection", "browser sniffing", "user agent sniffing"]
prereqs: ["browserslist", "progressive-enhancement"]
related: ["progressive-enhancement", "graceful-degradation", "browserslist"]
---

**Feature detection** asks "can you do X?" (`'IntersectionObserver' in window`) and adapts; **browser sniffing** asks "who are you?" (parsing the User-Agent) and assumes. Detection is robust — new browsers with the feature just work, and old ones get the fallback. Sniffing is brittle — UA strings lie (every browser claims Mozilla heritage), change without notice, and say nothing about the actual feature.

```text
detection:  if ('fetch' in window) … else fallback
sniffing:   if (ua.includes('Chrome')) … // breaks on every UA change
```

Detection pairs with progressive enhancement: build the baseline, layer capabilities where present. Sniffing survives only for the narrow cases detection can't answer (working around a specific browser bug, analytics) — and even there, version-sniffing rots fast.

The classic mistakes:

- UA parsing for features. A new browser version, a UA freeze (browsers now freeze UA strings for privacy), or a spoofed string silently misroutes users. Detect the feature.
- Detecting once, globally. Capabilities differ by context (a feature in the top window but not in an iframe, or gated by permissions). Detect where you use.
- All-or-nothing fallbacks. Missing one API shouldn't mean the legacy page. Scope fallbacks per feature so modern browsers get everything they support.
- Inference chains. "It's Safari, therefore no X" breaks the day Safari ships X. Capability checks never go stale this way.
- Ignoring the fallback quality. A fallback nobody tests rots; feature-detected paths need testing in both states (feature present and absent).
- Fingerprinting via detection. Probing dozens of APIs to identify users is tracking, not engineering. Detect what you use, nothing more.

**The rule:** capabilities, not identities. Detect features at point of use, enhance progressively, and reserve UA sniffing for bug workarounds with an expiry date.
