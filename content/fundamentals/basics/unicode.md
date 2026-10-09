---
title: "Unicode"
summary: "The universal character set, and why string length is trickier than it looks."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["code point", "Unicode standard"]
prereqs: ["character-encoding"]
related: ["utf-8", "ascii", "character-encoding", "string", "internationalization"]
---

Unicode is the universal catalogue of characters. It gives every character in nearly every writing system, plus symbols and emoji, a unique number called a code point, written like `U+0041` (A) or `U+1F600` (😀).

Unicode defines **which characters exist**. An encoding such as [UTF-8](/t/utf-8) defines **how to store those numbers as bytes** ([character encoding](/t/character-encoding)).

```python
ord("A")        # 65      U+0041
ord("é")        # 233     U+00E9
ord("😀")       # 128512  U+1F600
"é"        # "é"
```

## Why string length isn't simple

What a person sees as one character can be several code points.

```python
len("é")        # 1 if written as one code point
len("é")        # 2 if written as "e" + a combining accent mark
len("👨‍👩‍👧")      # 5: three people joined by invisible joiners
```

JavaScript strings count UTF-16 units, so `"😀".length` is `2`. So:

- **Length, slicing and reversing** can break characters apart.
- **Two strings that look identical may compare as different.** Normalize them (NFC or NFD) before comparing.
- **Case rules vary.** `"ß".upper()` is `"SS"`, and the Turkish `I` is special.
- **Sorting** depends on the language, not just the numbers.

## Practical advice

- Use **UTF-8 everywhere** and decode bytes to text early.
- Use your language's Unicode-aware functions, and a library for grapheme-level work (user-perceived characters).
- Test with names like `José`, `Zoë`, `Müller`, and non-Latin scripts and emoji.
- Don't assume one character is one byte, or that `s[0]` is a whole letter.
- Beware of look-alike characters in usernames and URLs.
