---
title: "Pluralization and ICU Messages"
summary: "Handling plural rules that differ between languages."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["pluralization", "icu messages", "plurals i18n"]
prereqs: ["localization", "javascript"]
related: ["localization", "locale-formatting", "rtl-support"]
---

**Pluralization** selects the right word form by count — and counts work differently per language (English: one/other; French: 0/1 singular; Russian/Arabic: several plural categories). **ICU messages** encode the rules declaratively: `{count, plural, one {# item} other {# items}}`, with the runtime picking the locale-correct branch.

```text
ICU: "{n, plural, one {# message} other {# messages}}"
n=1 → "1 message"   n=5 → "5 messages"   (Russian/Arabic pick more branches)
```

Naive `n === 1 ? singular : plural` breaks beyond English — and string concatenation breaks translation generally. ICU (via `Intl.PluralRules` or FormatJS-style libraries) keeps whole sentences translatable with variables, plurals, selects (gender) and number formatting composed.

The classic mistakes:

- English-only ternaries. `count === 1` logic shipped globally mistranslates most languages. ICU plural blocks from the start.
- Split sentences. `"You have" + n + "messages"` can't reorder for languages with different word order. One message, variables inside.
- Ignoring `Intl` APIs. Hand-rolled plural maps duplicate `Intl.PluralRules` badly. Use the platform's locale data.
- Zero handling. "0 items" vs "no items" — some locales (and styles) prefer explicit zero forms. Design the zero case deliberately.
- Gender and selects. Beyond plurals, gendered adjectives and formality need `select` branches. Collect translator requirements per language, not per English assumption.
- Untranslated fallback. Missing plural translations shouldn't crash or blank. Fallback chains to base language, never to nothing.
- Testing English only. Plural bugs hide until real locales render. Test with plural-rich locales (Russian, Arabic) and pseudolocales in CI.

**The rule:** whole sentences as ICU messages, plurals/selects/numbers inside, platform locale data underneath. Counts are grammar — conjugate them properly.
