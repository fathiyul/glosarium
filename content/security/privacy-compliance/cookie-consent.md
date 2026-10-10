---
title: "Cookie Consent"
summary: "Asking permission before non-essential tracking."
levels: { frontend: mid-level , tech-entrepreneur: pmf }
---

Cookie consent is the process of informing people about cookies or similar technologies and, where required, obtaining permission before using those that are not essential to the service. Requirements vary by jurisdiction, technology, and purpose; a cookie banner alone does not make tracking compliant.

Separate essential storage from analytics, advertising, and other optional purposes. Where consent is required, do not set or read optional identifiers before the user has made a choice, and provide a way to change that choice later. Rejecting should be a real option, not a confusing path hidden behind extra screens. Record enough evidence to honor and audit the choice without collecting more than needed.

For example, a page may need a session cookie to keep a user signed in while a separate analytics tag is optional. Loading all scripts before showing the banner can already make the consent control ineffective. Check client-side tags, server-side tracking, embedded media, and third-party SDKs as part of the same review.

Frontend developers implement the interaction and block optional scripts; backend developers must also honor preferences in server-side collection. Consent does not replace transparency, purpose limitation, or security. Consult current local legal guidance for the product's audience and markets. See [GDPR](/t/gdpr) and [data minimization](/t/data-minimization).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.
