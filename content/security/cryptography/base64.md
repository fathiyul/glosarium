---
title: "Base64"
summary: "An encoding of bytes as text; not encryption."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Base 64", "base64 encoding"]
prereqs: ["bits-and-bytes"]
related: ["hashing-vs-encryption", "basic-auth", "jwt", "url-encoding", "character-encoding"]
---

Base64 turns arbitrary bytes into text made of 64 safe characters (`A-Z`, `a-z`, `0-9`, `+`, `/`, with `=` padding). It lets binary data travel through places built for text: JSON, email, URLs, HTTP headers.

```python
import base64
base64.b64encode(b"hello")     # b'aGVsbG8='
base64.b64decode(b"aGVsbG8=")  # b'hello'
```

```sh
echo -n hello | base64         # aGVsbG8=
```

## The classic mistake: treating it as security

Base64 is an **encoding**, not encryption. There is no key, and anyone can reverse it in one line. A password or token in Base64 is a password in plain sight. See [hashing vs encryption](/t/hashing-vs-encryption). This is why [Basic auth](/t/basic-auth) only makes sense over HTTPS, and why you can read the contents of a [JWT](/t/jwt) by decoding it.

## Facts that are useful to know

- **It makes data bigger**: about a third larger, since every 3 bytes become 4 characters.
- **Base64URL** is a variant that swaps `+` and `/` for `-` and `_` (and often drops the padding), so the result is safe in URLs. JWTs use it.
- **Bytes in, bytes out.** To encode a string, you first need bytes, which means picking a [character encoding](/t/character-encoding) such as UTF-8.

Typical uses: embedding a small image in HTML or CSS as a `data:` URL, sending file contents in a JSON API, and transporting binary keys or signatures as text. For large files, upload them as binary instead; the size overhead adds up.
