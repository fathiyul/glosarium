---
title: "UTF-8"
summary: "The dominant variable-length encoding of Unicode."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["UTF8", "Unicode Transformation Format 8"]
prereqs: ["unicode", "character-encoding"]
related: ["unicode", "ascii", "character-encoding", "string", "mime-type"]
---

UTF-8 is the dominant way to store [Unicode](/t/unicode) text as bytes. It's variable length: each character takes 1 to 4 bytes.

| Characters | Bytes | Example |
|---|---|---|
| ASCII (U+0000-007F) | 1 | `A` → `41` |
| Latin accents, Greek, Cyrillic, Hebrew, Arabic | 2 | `é` → `C3 A9` |
| Most other scripts, including CJK | 3 | `中` → `E4 B8 AD` |
| Emoji and rare characters | 4 | `😀` → `F0 9F 98 80` |

```python
"é".encode("utf-8")      # b'\xc3\xa9'
b"\xc3\xa9".decode("utf-8")
```

## Why it won

- **Backward compatible with [ASCII](/t/ascii).** Any ASCII text is already valid UTF-8, so old files and protocols keep working.
- **Compact for English and code**, since common characters take one byte.
- **Self-synchronizing.** You can find character boundaries from any byte, so a corrupted byte damages only one character.
- **No byte-order problems** (unlike UTF-16 and UTF-32).
- It handles every Unicode character.

## What to know

- **Bytes aren't characters.** `len(b"...")` counts bytes, and `len("é")` counts code points. They differ for anything non-ASCII.
- **Slicing bytes can cut a character in half** and produce invalid data.
- **Always declare it**: `charset=utf-8` in HTTP and HTML, and `encoding="utf-8"` when opening files. Don't rely on the platform default.
- **Invalid byte sequences** raise errors when decoding. Decide whether to fail, replace (`�`) or ignore, rather than guessing.
- A BOM (a marker at the start of a file) is allowed but usually unnecessary, and can confuse tools.
- MySQL's old `utf8` stores only 3 bytes per character, so use `utf8mb4` for emoji.

Use UTF-8 for files, databases, APIs and source code unless you have a reason not to.
