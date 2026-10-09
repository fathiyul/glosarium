---
title: "Phishing and Social Engineering"
summary: "Attacks that trick people instead of breaking code."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["social engineering", "spear phishing", "pretexting"]
prereqs: ["credential"]
related: ["mfa", "passkeys", "credential", "defense-in-depth", "least-privilege", "typosquatting", "security-champion"]
---

Phishing is an attack that tricks a person into giving up a secret or doing something harmful, usually through a message that looks legitimate: an email, SMS or chat. **Social engineering** is the wider category: any attack that targets people rather than code, including phone calls and someone just asking nicely.

Typical examples:

- An email that looks like it comes from IT, asking you to "verify your password" on a lookalike login page.
- A message that seems to come from your boss asking you to urgently buy gift cards or approve a payment.
- A fake "security alert" that makes you install something.
- **Spear phishing**: the same idea aimed at one person, using real details about them.

## Why developers should care

You hold powerful access: production, source code, cloud consoles, package registries. One stolen developer credential can become a company-wide incident. Attackers pick developers on purpose.

## Warning signs

- Urgency or threats ("act in 10 minutes").
- A request to do something unusual with money, access or credentials.
- A sender address or link that is slightly off. Hover over links and check the real domain before clicking; lookalike names are common (see [typosquatting](/t/typosquatting)).
- Unexpected attachments or login pages reached from a message.

## What to do

- **Don't click, verify**: contact the person through a channel you already trust.
- **Report it** to your security or IT team, even if you clicked. Fast reports limit the damage.
- Turn on [MFA](/t/mfa) everywhere. Hardware keys and [passkeys](/t/passkeys) are especially strong because they won't work on a fake site.
- Never share passwords or one-time codes with anyone, even someone claiming to be support.

Defences should assume someone will eventually be fooled; this is where [defense in depth](/t/defense-in-depth) and [least privilege](/t/least-privilege) help.
