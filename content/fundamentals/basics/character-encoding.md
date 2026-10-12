---
title: "Character Encoding"
summary: "How characters map to bytes: ASCII, UTF-8, UTF-16."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["text encoding", "encoding", "charset", "character set", "UTF-8 vs UTF-16"]
prereqs: ["string", "bits-and-bytes"]
related: ["ascii", "unicode", "utf-8", "string", "mime-type"]
---

Computers store bytes, not letters. A **character encoding** is the rule for **mapping characters to bytes** and back. To read text correctly, you must know which encoding wrote it.

```python
"é".encode("utf-8")      # b'\xc3\xa9'   two bytes
"é".encode("latin-1")    # b'\xe9'       one byte
b"\xc3\xa9".decode("latin-1")   # 'Ã©'   wrong encoding → garbled text
```

## Common encodings

| Encoding | Notes |
|---|---|
| **[ASCII](/t/ascii)** | 128 characters, English only |
| **Latin-1 / Windows-1252** | Older single-byte sets for Western European languages |
| **[UTF-8](/t/utf-8)** | Variable length (1-4 bytes per character), ASCII-compatible, the standard for the web and most systems |
| **UTF-16** | 2 or 4 bytes per character, used internally by Windows, Java and JavaScript |

Behind these sits [Unicode](/t/unicode), the universal list of characters. Encodings are ways to turn Unicode into bytes.

## Symptoms of a mismatch

- `Ã©` instead of `é`, or `�` (replacement characters): text decoded with the wrong encoding ("mojibake").
- `UnicodeDecodeError` in Python when bytes aren't valid in the chosen encoding.
- A file that works in one editor and breaks in another.
- Question marks in a database where non-English text was stored.

## Rules of thumb

- **Use UTF-8 everywhere**: files, databases, APIs, source code.
- **Declare it**: `Content-Type: text/html; charset=utf-8`, `<meta charset="utf-8">`, database and connection settings, and `open(path, encoding="utf-8")` in Python.
- **Decode bytes to text at the edges** (input), work with text inside, and encode at the output.
- **Don't guess**: if the encoding is unknown, find out from the source.
- A BOM (byte order mark) at the start of a file can show up as odd characters in some tools ([CSV](/t/csv-format)).
