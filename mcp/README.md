# Glosarium MCP server

A remote [MCP](https://modelcontextprotocol.io) server that lets AI assistants search Glosarium, read
concepts and walk its learning paths. It's a stateless Cloudflare Worker, made from Cloudflare's
`remote-mcp-authless` template, with no auth (the content is public).

It holds no data of its own. It reads the site's static exports, built by the Astro site in the repo root:

- `/api/index.json`: every concept's metadata, the tracks with their paths, topics and domains
- `/t/<id>.md`: one concept's text

The index is cached for 5 minutes per Worker instance, so a site deploy reaches the server without
redeploying it. Redeploy the Worker only when this folder changes.

## Tools

| Tool | What it returns |
|---|---|
| `list_tracks` | tracks and their levels, with concept counts |
| `list_topics` | domains, or one domain's topics and concepts |
| `search_concepts` | matches by name, alias or keyword, optionally within a track and level |
| `get_concept` | one concept's full text in Markdown |
| `get_learning_path` | a track's concepts in learning order (as on its track page), by level or topic, paged |
| `next_concepts` | previous/next on a track's path (the site's Previous/Next), plus prerequisites and related |
| `prereq_chain` | everything to learn before a concept, in order |
| `whats_next` | concepts whose prerequisites someone already knows |

Plus one prompt, `study_plan(track, level, goal?)`.

Lists return one line per concept (id, title, summary, level); only `get_concept` returns full text.

## Develop

```sh
npm install
npm run dev                                       # http://localhost:8787/mcp, reading the live site
npm run dev -- --var SITE_URL:http://localhost:4321   # read a local site instead
npm run type-check
```

To serve a local site with the exports, run `npm run build && npm run preview` in the repo root (or `npm run dev` there).

## Deploy

```sh
npx wrangler deploy
```

The server is then at `https://glosarium-mcp.<your-subdomain>.workers.dev/mcp`. Run `npx wrangler types`
after changing `wrangler.jsonc`.

## Connect

- **Claude Code:** `claude mcp add --transport http glosarium https://glosarium-mcp.<your-subdomain>.workers.dev/mcp`
- **Claude (web, desktop):** Settings → Connectors → Add custom connector, with the URL above.
- **Other clients:** any client that supports remote MCP over Streamable HTTP. For stdio-only clients,
  use [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) as a bridge.
