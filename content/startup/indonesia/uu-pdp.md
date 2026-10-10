---
title: "UU PDP"
summary: "Indonesia's Personal Data Protection Law: consent, data subject rights and breach duties."
levels: { tech-entrepreneur: mvp }
aliases: ["UU PDP", "Indonesian data protection law", "UU Pelindungan Data Pribadi"]
prereqs: ["privacy-policy", "pse-registration"]
related: ["privacy-policy", "gdpr", "cookie-consent", "data-processing-agreement"]
also: [legal-finance]
core: [tech-entrepreneur]
---

Indonesia's **UU PDP (Personal Data Protection Law)** governs how companies collect, use, store and share personal data: lawful bases including consent, rights for data subjects (access, correction, deletion, portability, objection), breach notification duties, and cross-border transfer rules. It applies to electronic system operators ([PSE](/t/pse-registration)) and effectively every digital business handling Indonesian users' data.

```text
duties:  lawful basis + purpose limitation + security + subject rights + breach response
enforcement: phased in with grace periods — track current effective dates, not headlines
```

For startups the practical core is small: collect only what you need, get real consent where required, honor deletion/access requests through a real process, secure the data ([baseline](/t/startup-security-baseline)), and have a breach playbook before the breach. Enterprise customers increasingly demand evidence of all five before signing.

The classic mistakes:

- "We'll comply later." Data collected unlawfully cannot be laundered later, and retrofitting consent/deletion into architecture is brutal. Design lawful bases and subject-rights flows from the first schema.
- Consent theater. Pre-ticked boxes and bundled consents fail the law's validity tests and erode trust. Granular, revocable, documented consent — or another lawful basis used honestly.
- No breach playbook. Discovering notification duties mid-incident, while the clock runs. Write the response plan (who decides, who notifies, templates ready) before you need it.
- Vendor blindness. Processors and sub-processors (analytics, cloud, support tools) handle your users' data under your responsibility. Contract them properly ([DPA](/t/data-processing-agreement)) and know where data physically goes.
- Assuming GDPR compliance suffices. Overlapping but distinct regimes — local specifics (institutional roles, sectoral rules, phased timelines) need local advice.

**Get local counsel early** on bases, rights processes and transfers; keep a living data inventory (what, where, why, how long) as the operational backbone. See [privacy policy](/t/privacy-policy) for the public-facing half.
