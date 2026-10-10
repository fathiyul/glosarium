---
title: "Slugs and Readable URLs"
summary: "Turning titles into URL-safe identifiers, and handling duplicates and renames."
levels: { backend: junior, frontend: junior }
aliases: ["URL slug", "slugify"]
prereqs: ["url"]
related: ["url", "redirect", "seo", "url-encoding"]
---

A slug is the part of a URL that identifies a page in a readable way, such as `hello-world` in `/blog/hello-world`. Slugs are usually made from a title: lowercase it, replace spaces and punctuation with hyphens, and drop anything else.

```python
import re

def slugify(title):
    s = title.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)   # runs of other characters become one hyphen
    return s.strip("-")

slugify("Hello, World!")  # e.g. "hello-world"
```

This simple version drops letters outside a-z, so a title in another language would lose most of its characters. For non-English content, decide how to transliterate or keep Unicode, and test it on real titles.

Two cases need a rule. Duplicate titles need a unique slug, typically with a suffix such as `hello-world-2`, or by including the ID. Renames need a plan: when a title changes, keep the old slug working by answering it with a permanent [redirect](/t/redirect) to the new one, so existing links and search results don't break.

The classic mistake is regenerating the slug from the title every time the title is edited, which silently breaks every link to that page. Store the slug once, and change it only on purpose, with a redirect. Readable URLs also help [SEO](/t/seo), but the redirect matters more.
