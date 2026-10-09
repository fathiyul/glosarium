---
title: "Query String"
summary: "Key-value parameters after the ? in a URL."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["query parameters", "URL parameters", "querystring"]
prereqs: ["url"]
related: ["path-vs-query-parameters", "url-encoding", "url", "http-request", "rest"]
---

The query string is the part of a URL after the `?`: a list of key=value pairs separated by `&`. It's how you pass optional parameters in a request.

```
https://shop.example.com/search?q=steel+kettle&category=kitchen&page=2
                                └──────────────┬──────────────────┘
                                   q = "steel kettle", category = "kitchen", page = "2"
```

## Reading and building them

```js
const url = new URL("https://shop.example.com/search?q=kettle&page=2");
url.searchParams.get("q");          // "kettle"
url.searchParams.set("page", "3");
url.toString();
```

```python
from urllib.parse import urlparse, parse_qs, urlencode
parse_qs(urlparse("https://x.com/s?q=kettle&tag=a&tag=b").query)
# {'q': ['kettle'], 'tag': ['a', 'b']}
urlencode({"q": "steel kettle", "page": 2})      # 'q=steel+kettle&page=2'
```

## Typical uses

- **Search terms, filters and sorting**: `?q=...&sort=price`.
- **Pagination**: `?page=2&limit=20`.
- **Tracking and campaign tags** (`utm_source=...`).
- **Keeping view state in the URL**, so links can be shared ([URL as state](/t/url-as-state)).

Use the **path** for which resource, and the **query** for how to filter or shape it ([path vs query parameters](/t/path-vs-query-parameters)).

## Things to remember

- **Everything is a string.** Convert and validate numbers and booleans.
- **Encode special characters** (spaces, `&`, `=`, `#`, non-ASCII): use a library, not string concatenation ([URL encoding](/t/url-encoding)).
- **Repeated keys and lists** have no single standard (`tag=a&tag=b`, `tag[]=a`, `tag=a,b`). Check what your framework expects.
- **Order isn't guaranteed to matter**, but caching treats different orders as different URLs.
- **Don't put secrets in the query string.** URLs are logged, stored in history and sent in referrer headers ([secrets in URLs](/t/never-trust-the-client)).
- **Length limits** exist (a few thousand characters is safe). Put big data in the body.
- It's untrusted input: validate it ([input validation](/t/input-validation)).
