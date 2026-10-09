---
title: "ASCII"
summary: "The original 7-bit character set that UTF-8 is backward compatible with."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["ASCII table", "ASCII code", "American Standard Code for Information Interchange", "7-bit ASCII"]
prereqs: ["character-encoding"]
related: ["unicode", "utf-8", "character-encoding", "string", "bits-and-bytes", "binary-number"]
---

**ASCII** (American Standard Code for Information Interchange) is the original, simple scheme for **representing text as numbers**. It assigns a number from **0 to 127** to each of 128 characters, which fits in **7 bits**. It's the foundation that later encodings, including [UTF-8](/t/utf-8), were built on.

```
'A' = 65     'B' = 66     ...     'Z' = 90
'a' = 97     'b' = 98     ...     'z' = 122
'0' = 48     '1' = 49     ...     '9' = 57
' ' (space) = 32     '\n' (newline) = 10
```

```python
ord("A")      # 65
chr(97)       # 'a'
```

## What's in the table

| Range | Contents |
|---|---|
| **0-31 and 127** | **Control characters**: not printable text. Newline (10), carriage return (13), tab (9), null (0), escape (27), delete (127) |
| **32-126** | **Printable characters**: space, digits, uppercase and lowercase English letters, and punctuation and symbols |

Notable patterns:

- **Digits** `'0'`-`'9'` are consecutive (48-57), so `ord(c) - ord("0")` converts a digit character to its number.
- **Letters** are in alphabetical order, so sorting by code point sorts alphabetically, with all uppercase before lowercase (`"Z" < "a"`).
- **Upper and lowercase differ by 32**, a single bit (`'a'` is 97, `'A'` is 65), which is why some tricks can flip case with a bit operation ([bitwise operations](/t/bitwise-operation)).

## Limits

ASCII covers **only English**: no accented letters (é, ñ), no other alphabets (Cyrillic, Arabic, Chinese, Thai), no emoji, and few symbols. Different regions made **extended 8-bit encodings** that used the values 128-255 for their own characters, but those **conflicted with each other** (the same byte meant different characters in different encodings), which caused years of garbled text ("mojibake").

[**Unicode**](/t/unicode) solved this with one universal set of characters, and **UTF-8** encodes it in a way that is **backward compatible with ASCII**: any valid ASCII text is also valid UTF-8, byte for byte. Characters beyond ASCII use several bytes ([character encoding](/t/character-encoding)).

## Why it still matters

- **Protocols and formats** (HTTP headers, many file formats, source code identifiers) are largely ASCII.
- **Debugging**: knowing that `0x41` is `A`, or that `\r\n` are 13 and 10, helps you read raw data and hex dumps.
- **Encoding errors**: "it works for English text but breaks for names with accents" usually means an ASCII assumption somewhere.
- **Sorting and comparison** behave differently for ASCII-order versus locale-aware order.
- **Security**: don't assume input is ASCII. Validate and handle Unicode properly.

When in doubt, use UTF-8 everywhere, and remember that ASCII is its simple, English-only subset.
