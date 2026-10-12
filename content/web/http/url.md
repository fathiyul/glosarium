---
title: "URL"
summary: "The address of a resource: scheme, host, path, query and fragment."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["Uniform Resource Locator", "web address", "link", "URI"]
related: ["http", "path-vs-query-parameters", "query-string", "url-encoding", "domain-name", "origin"]
core: [backend, frontend]
---

A **URL** is the address of a resource on the internet. Every part has a job:

```
https://user@shop.example.com:8443/products/42?color=red&page=2#reviews
└─┬─┘   └─┬─┘ └──────┬───────┘└─┬─┘└────┬────┘└──────┬───────┘└──┬───┘
scheme  user   host (domain)  port  path       query         fragment
```

| Part | Meaning |
|---|---|
| **Scheme** | The protocol: `https`, `http`, `ftp`... |
| **Host** | The server's [domain name](/t/domain-name) or IP address |
| **Port** | Which service on that host (omitted when it's the default: 80 for HTTP, 443 for HTTPS) |
| **Path** | Which resource: `/products/42` |
| **Query** | Extra parameters after `?`, as `key=value` pairs joined by `&` |
| **Fragment** | A spot within the page, after `#`. **The browser doesn't send it to the server** |

## Practical points

- **Special characters must be encoded** (`a b` → `a%20b`). See [URL encoding](/t/url-encoding).
- **Absolute vs relative.** `https://example.com/a` is complete; `/a` is relative to the current host;
  `../a` relative to the current path.
- **Don't build or parse URLs with string tricks.** Use the language's URL tools:

```js
const url = new URL("https://example.com/search");
url.searchParams.set("q", "red kettle");
url.toString();      // "https://example.com/search?q=red+kettle"
```

```python
from urllib.parse import urlparse, urlencode
urlparse("https://example.com/a?x=1").netloc      # 'example.com'
```

- **Don't put secrets in URLs.** They're logged, saved in history and sent in referrer headers.
- Two URLs with different [origins](/t/origin) are treated separately by the browser's security rules.

"URI" is the broader term (it includes names without a location); in everyday use, people say URL and
mean the same thing.
