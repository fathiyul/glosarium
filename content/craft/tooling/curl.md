---
title: "curl"
summary: "The command-line tool for making HTTP requests."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["cURL", "curl command"]
prereqs: ["http", "basic-shell-commands"]
related: ["http-client-tools", "http-methods", "http-headers", "json", "fetch-api"]
---

`curl` is a command-line tool for making requests to a URL. It's the quickest way to try an API, check a response or debug a network problem, from any terminal.

```sh
curl https://api.example.com/users/42                  # a GET request

curl -i https://example.com                            # include response headers
curl -v https://example.com                            # verbose: shows the whole exchange
curl -s https://api.example.com/status | jq .          # silent; pipe JSON to jq

curl -X POST https://api.example.com/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"item_id": 7, "quantity": 2}'                   # POST with a JSON body

curl -L http://example.com                             # follow redirects
curl -o page.html https://example.com                  # save to a file
curl -fsS https://example.com/health                   # fail on HTTP errors, quiet, but show errors
curl -w "%{http_code} %{time_total}s\n" -o /dev/null -s https://example.com   # status and timing
```

## Flags worth knowing

| Flag | Does |
|---|---|
| `-X METHOD` | sets the method |
| `-H` | adds a header |
| `-d` | sends a body (and implies POST) |
| `-i` / `-v` | shows headers / everything |
| `-L` | follows redirects |
| `-f` | exits non-zero on HTTP errors (useful in scripts) |
| `-u user:pass` | basic auth |

## Tips

- **Browser requests as curl**: DevTools can copy any request as a curl command ([network tab](/t/network-tab)).
- **Quote the URL** when it contains `&` or `?`, or the shell will misread it.
- **Don't paste tokens** into shared shells or history. Use an environment variable.
- **A 200 with an error body** isn't an error to curl. Check the response.
- For a visual or saved-collection workflow, see [HTTP client tools](/t/http-client-tools).
