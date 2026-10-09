---
title: "Hyrum's Law"
summary: "With enough users, every observable behavior becomes something someone depends on."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["Hyrum's Law", "law of implicit interfaces", "implicit dependencies", "observable behavior dependency"]
prereqs: ["api-design", "backward-compatibility"]
related: ["api-design", "backward-compatibility", "breaking-change", "postels-law", "principle-of-least-astonishment", "deprecation"]
core: [backend, frontend]
---

**Hyrum's Law**, named after Hyrum Wright, a software engineer at Google, says in essence:

> **With enough users of an API, it doesn't matter what you promise in the contract. Every observable behavior of your system will be depended on by somebody.**

If something can be seen, relied on, or accidentally leaned on, someone will, even if your documentation says "don't".

## Examples

- **Ordering**: your function returns items "in no particular order", but in practice they come back sorted. Callers start depending on it. Later, you change the implementation, and their code breaks. (This is why Go deliberately randomizes map iteration order: so that nobody can depend on it.)
- **Error messages**: you reword a message to be clearer, and a client that parsed the old text with a regex breaks.
- **Timing**: a call that "usually takes 50 ms" gets built into another system's timeouts and retry logic.
- **Extra fields and quirks**: a response includes an undocumented field, and clients use it.
- **Undefined behavior**: calling with invalid input used to return an empty list instead of an error, and someone relies on that.
- **Response size, headers, whitespace, key order in JSON, rate-limit behavior.**

## Why it matters

- **"Compatible" is relative.** A change that obeys your documented contract can still break real users. Your *effective* contract is everything they can observe.
- **Changes get harder as adoption grows.** The bigger the user base, the more implicit dependencies exist, and the more "small" changes become breaking ([breaking changes](/t/breaking-change)).
- **Deprecation is slow and painful** for the same reason ([deprecation](/t/deprecation)).

## What to do about it

- **Expose less.** Don't return fields, behaviors or details you aren't prepared to support. Everything public is a commitment ([API design](/t/api-design)).
- **Be deliberate with what you document, and keep the documented contract small.**
- **Make undefined things clearly undefined**: sometimes by deliberately varying them (randomized ordering, injected delays in test environments) so no one can lean on one outcome.
- **Test compatibility, not just the spec**: run consumers' tests against changes ([contract testing](/t/contract-testing)), and use staged rollouts and monitoring to spot surprise breakage ([canary releases](/t/canary-release)).
- **Version and communicate changes** ([API versioning](/t/api-versioning), [backward compatibility](/t/backward-compatibility)).
- **Treat error formats and codes as part of the interface**, and keep them stable ([error response format](/t/error-response-format)).
- **Be a careful consumer**: don't depend on behavior that isn't promised.

It's a reminder that the real interface of any widely used software is larger than what's written down. It also explains why [Postel's law](/t/postels-law) ("be liberal in what you accept") cuts both ways: tolerance today becomes a dependency tomorrow.
