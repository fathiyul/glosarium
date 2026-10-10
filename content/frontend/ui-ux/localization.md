---
title: "Localization (l10n)"
summary: "Translating and adapting software for a specific locale."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["localization", "l10n", "internationalization vs localization"]
prereqs: ["pluralization", "timezone"]
related: ["pluralization", "rtl-support", "locale-formatting"]
---

**Localization (l10n)** adapts a product to a locale: translated strings, date/number/currency formats, time zones, reading direction, imagery and legal bits — built on internationalization (i18n, the architecture that makes locales *possible*: externalised strings, Unicode throughout, locale-aware formatting).

```text
i18n (architecture): external strings, ICU messages, locale-aware APIs
l10n (per locale):   translations, formats, RTL layout, local conventions
```

Quality localizations read native — plural rules, gender, formality and date conventions vary per language — and layout survives translation (German runs long, Arabic mirrors, CJK sets differently). Pseudolocalization (`[!! ßêta !!]`) in development exposes hardcoded strings and breakage early.

The classic mistakes:

- Concatenated sentences. `"You have " + n + " messages"` untranslatable as a unit — word order differs. Single ICU messages with variables and plurals, always.
- Hardcoded strings. UI copy in code can't be extracted, translated or reviewed. Externalise from the first commit.
- Locale-unaware formatting. Dates, numbers and currencies formatted one way globally confuse or mislead (month/day order, decimal separators, currency placement). Format via locale APIs.
- Fixed-size layouts. Translated strings expand 30–100%; rigid buttons and fixed widths clip them. Flexible layouts, tested in long languages.
- Direction blindness. LTR-assumed layouts break in RTL. Logical properties and RTL testing from the start (see [RTL support](/t/rtl-support)).
- Untranslated fallbacks failing. Missing keys showing blanks or crashing beats showing the source language. Fallback chains (locale → base language → key) never render nothing.
- Images and icons with text. Embedded text can't translate; culture-specific imagery offends or confuses. Localise assets, not just strings.
- Legal/currency afterthoughts. Taxes, consent wording, payment methods and address formats differ per market. Involve local expertise before launch, not after complaints.

**The practice:** i18n architecture first (ICU messages, locale APIs, flexible RTL-ready layouts), professional translation workflows, pseudolocale testing, per-market review. Fluency in every locale is a feature — ship it like one.
