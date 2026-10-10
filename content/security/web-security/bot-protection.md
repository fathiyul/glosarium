---
title: "Bot Protection and CAPTCHA"
summary: "Telling humans apart from automated abuse."
levels: { backend: mid-level, frontend: mid-level }
---

Bot protection aims to distinguish legitimate automation from abusive traffic such as credential attacks, scraping, spam, and inventory hoarding. There is no reliable universal test for “human”: attackers can imitate browser behavior, and legitimate users may browse with assistive technology, privacy tools, or unusual networks.

Layer controls according to the abuse you observe. Rate limits, account and device signals, reputation, behavioral analysis, and interactive challenges each cover different cases. A CAPTCHA can raise the cost of simple automation, but it can also exclude users, be solved by services, and create friction for real customers. Treat it as one signal rather than proof of identity.

For example, a sudden burst of account creation may justify a challenge or tighter limits on that flow, while a verified customer checking out should not be blocked just because their network is shared. Keep a path for users who cannot complete a challenge and monitor false positives as well as attacks.

Backend teams should make enforcement server-side and avoid trusting client-supplied “human” flags. Frontend teams should ensure challenges are accessible and explain recovery. The right mix depends on the value targeted, attacker adaptation, and the cost of blocking legitimate traffic; do not buy a bot product before defining the abuse and acceptable friction.

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
