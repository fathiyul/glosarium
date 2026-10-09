---
title: "Head and Meta Tags"
summary: "Title, description, viewport and other page metadata."
levels: { backend: junior, frontend: junior }
aliases: ["head tag", "meta tags", "title tag", "viewport meta"]
prereqs: ["html-element"]
related: ["viewport-meta", "open-graph", "script-loading", "responsive-design", "character-encoding"]
---

The `<head>` of an HTML page holds information about the page that isn't displayed in the page itself: its title, character set, links to stylesheets and scripts, and metadata for browsers, search engines and social sites.

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Steel Kettle · Shop</title>
  <meta name="description" content="A 1.7 L steel kettle with auto shut-off.">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" href="/favicon.ico">
  <link rel="canonical" href="https://shop.example.com/kettle">
  <script src="/app.js" defer></script>
</head>
```

## The important pieces

| Tag | Purpose |
|---|---|
| `<meta charset="utf-8">` | the text encoding. Put it first, within the first 1,024 bytes ([character encoding](/t/character-encoding)) |
| `<meta name="viewport" ...>` | makes pages scale properly on phones ([viewport meta](/t/viewport-meta), [responsive design](/t/responsive-design)) |
| `<title>` | shown in browser tabs, bookmarks and search results. Make it specific per page |
| `<meta name="description">` | the snippet search engines often show |
| `<link rel="stylesheet">` | loads CSS |
| `<script ... defer>` | loads JavaScript ([script loading](/t/script-loading)) |
| `<link rel="icon">` | the tab icon |
| `<link rel="canonical">` | the preferred URL, to avoid duplicate-content confusion |
| Open Graph and Twitter tags | link previews when shared ([Open Graph](/t/open-graph)) |
| `<meta name="robots">` | indexing instructions for crawlers |
| `<meta name="theme-color">` | browser UI color on mobile |

## Tips

- **Every page needs a unique, descriptive title.** It matters for usability, accessibility and search.
- **Don't forget the viewport tag**, or mobile pages look tiny.
- **Set the language** on `<html lang="en">`, which helps screen readers and translation.
- **Order matters a little**: charset first, then critical styles, with scripts deferred.
- **Single-page apps** must update the title and meta tags when the route changes, and server-render them for crawlers and link previews.
- Don't put user input into head tags without escaping.
