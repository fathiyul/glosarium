---
title: "URL Encoding"
summary: "Escaping special characters in URLs as %XX."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["percent-encoding", "URL escaping", "%20", "encodeURIComponent"]
prereqs: ["url"]
related: ["query-string", "url", "character-encoding", "path-vs-query-parameters", "xss"]
---

URLs can only safely contain a limited set of characters. URL encoding (also called percent-encoding) replaces other characters with a `%` followed by their two-digit hexadecimal byte value.

| Character | Encoded |
|---|---|
| space | `%20` (or `+` in form and query data) |
| `&` | `%26` |
| `=` | `%3D` |
| `?` | `%3F` |
| `#` | `%23` |
| `/` | `%2F` |
| `é` | `%C3%A9` (its UTF-8 bytes, [UTF-8](/t/utf-8)) |

```
https://shop.example.com/search?q=steel kettle & lids
→ https://shop.example.com/search?q=steel%20kettle%20%26%20lids
```

## Why it's needed

Some characters have special meaning in a URL: `&` separates parameters, `=` splits key from value, `#` starts a fragment, `/` separates path parts. If your data contains them, they must be encoded, or they'll be read as structure.

```
?name=Tom & Jerry          → parsed as name="Tom " and a stray key " Jerry"
?name=Tom%20%26%20Jerry    → name = "Tom & Jerry"
```

## How to do it

Don't build URLs by hand. Use library functions:

```js
encodeURIComponent("Tom & Jerry");        // "Tom%20%26%20Jerry"
new URLSearchParams({ q: "steel kettle" }).toString();   // "q=steel+kettle"
```

```python
from urllib.parse import quote, urlencode
quote("Tom & Jerry")                  # 'Tom%20%26%20Jerry'
urlencode({"q": "steel kettle"})      # 'q=steel+kettle'
```

## Pitfalls

- **Encode each value separately**, not the whole URL, or you'll encode the `?`, `/` and `&` that should stay.
- **Double encoding**: encoding an already-encoded string turns `%20` into `%2520`. Encode once, at the point of building.
- **`+` vs `%20`**: `+` means a space only in form-style query strings. In paths, it's a literal plus.
- **`encodeURI` vs `encodeURIComponent`** in JavaScript: use the Component version for values.
- **Decoding on the server** should use your framework, and happens before routing. Be careful with encoded slashes and dots in paths ([path traversal](/t/path-traversal)).
- **Non-ASCII characters** are encoded as UTF-8 bytes.
- Encoded data in URLs is not encrypted. Anyone can read it.

See [query strings](/t/query-string).
