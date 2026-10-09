---
title: "Internationalization (i18n)"
summary: "Preparing software for many languages and regions."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["i18n", "localization and internationalization", "l10n", "making software multilingual", "globalization"]
prereqs: ["unicode", "string"]
related: ["localization", "locale-formatting", "pluralization", "rtl-support", "character-encoding", "timezone"]
core: [frontend]
---

**Internationalization** (**i18n**: "i", 18 letters, "n") means designing software so it **can be adapted to different languages and regions without code changes**. **[Localization](/t/localization)** (**l10n**) is then doing that adaptation for a specific locale: translating text, formatting numbers and
dates, and adjusting cultural details. You internationalize once, and localize many times.

## What has to change in the code

**1. Don't hard-code user-facing text.** Put strings in message catalogs, keyed by ID, one per language:

```js
// Bad
button.textContent = "Welcome, " + name + "!";

// Good
t("welcome", { name });          // en: "Welcome, {name}!"   id: "Selamat datang, {name}!"
```

Don't build sentences by concatenating pieces. Word order differs between languages, so translators need the whole sentence with placeholders.

**2. Format by locale**, using built-in tools, not manual string work ([locale formatting](/t/locale-formatting)):

```js
new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(1234.5);   // "1.234,50 €"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(new Date());
```

**3. Handle plurals properly.** Languages have different plural rules (English has two forms, Arabic has six, some have one). Use a library that supports plural categories ([pluralization](/t/pluralization)).

**4. Support right-to-left languages** such as Arabic and Hebrew with logical CSS properties and mirrored layouts ([RTL support](/t/rtl-support)).

**5. Allow for text expansion.** Translations are often longer than English (German, Finnish). Don't size containers to the English text.

**6. Use Unicode (UTF-8) everywhere**, from the database to the HTTP headers ([Unicode](/t/unicode)). Be careful with string length, sorting and case conversion in other languages.

**7. Keep locale separate from language**, such as `en-US` vs `en-GB`, and from the user's **time zone** and **currency**, which are independent choices ([time zones](/t/timezone)).

## Practical points

- **Choose the locale** from user settings first, then the browser's `Accept-Language`, with a fallback. Let users change it.
- **Libraries** such as i18next, FormatJS (react-intl) and the framework-provided ones handle catalogs, interpolation and plurals.
- **Images and icons** may contain text or culturally specific content.
- **Names, addresses and phone numbers** have different structures around the world. Don't force Western formats.
- **Test with pseudo-localization** (accented, longer fake text) and an RTL language to find hard-coded strings and layout breakage early.
- Retrofitting i18n into an app that never planned for it is painful, so it's cheaper to externalize strings from the start if you might ever need it.
