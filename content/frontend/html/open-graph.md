---
title: "Open Graph Tags"
summary: "Metadata controlling how links preview on social media."
levels: { frontend: junior }
aliases: ["OG tags", "og:title", "link preview", "social cards"]
prereqs: ["html-head-meta"]
related: ["html-head-meta", "seo", "server-side-rendering", "image-optimization"]
---

Open Graph tags are `<meta>` tags that control how a link looks when it's shared on social networks and chat apps: the title, description and preview image of the card.

```html
<head>
  <meta property="og:title" content="Steel Kettle · Shop">
  <meta property="og:description" content="A 1.7 L steel kettle with auto shut-off.">
  <meta property="og:image" content="https://shop.example.com/img/kettle-1200x630.jpg">
  <meta property="og:url" content="https://shop.example.com/kettle">
  <meta property="og:type" content="product">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

Facebook introduced the format, and most platforms (LinkedIn, Slack, Discord, iMessage and others) read it. X/Twitter has its own `twitter:*` tags, and falls back to Open Graph when they're missing.

## Tags that matter

| Tag | Purpose |
|---|---|
| `og:title` | the headline of the card |
| `og:description` | a short summary |
| `og:image` | the preview image (use an absolute URL; around 1200×630 pixels is a common size) |
| `og:url` | the canonical URL |
| `og:type` | `website`, `article`, `product`... |

## Things to get right

- **The crawler doesn't run your JavaScript** in most cases. The tags must be in the **HTML the server sends**. A client-rendered single-page app often shows no preview, so use server-side rendering or static generation ([server-side rendering](/t/server-side-rendering)).
- **Use absolute URLs** for images, publicly reachable (no login).
- **Keep titles and descriptions short**, since cards truncate them.
- **Per-page values**, not the same card for every page.
- **Caching**: platforms cache previews. Use their debugger tools to refresh after changes.
- **Optimize the image**: file size and dimensions ([image optimization](/t/image-optimization)).
- **Don't put private information** in them. They're public.

See [head and meta tags](/t/html-head-meta) for the rest of the head.
