---
title: "Timing Attack"
summary: "Leaking secrets through how long comparisons take."
levels: { backend: senior }
---

A timing attack infers secret information from differences in how long a system takes to respond. A classic example is comparing a supplied authentication code byte by byte and returning as soon as a mismatch appears; repeated measurements may reveal how many leading bytes were correct.

Use constant-time comparison functions provided by cryptographic libraries for secret values such as MACs, tokens, and password-derived verifiers. Avoid writing your own comparison loop. Constant-time behavior is difficult to guarantee at the whole-system level: network noise, caching, branching, and runtime behavior can affect measurements, and not every timing difference is practically exploitable.

Timing leaks can also reveal account existence if one login path performs expensive password verification and another returns immediately. Equalizing the work or using generic responses may reduce that signal, but measure the application and consider rate limits as well. Do not assume that adding a fixed sleep solves the issue; it can be bypassed statistically and may waste resources.

Backend developers should use vetted crypto APIs and review response paths that depend on secret-dependent values. Frontend developers should avoid exposing sensitive comparisons to untrusted scripts or channels. Focus effort on realistic attacker access and secret value, but do not dismiss an avoidable leak in authentication code. See [HMAC](/t/hmac) and [secure random](/t/secure-random).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.
