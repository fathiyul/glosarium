import type { APIRoute } from 'astro';
import { loadGlossary } from '../../lib/glossary';

// Everything about the glossary except page text, for the MCP server in mcp/ (and anyone else).
// Page text is at /t/<id>.md. `r` is a concept's position on the site's reading path (the order of
// the sidebar and Previous/Next); `version` changes on every deploy, so readers know to refresh.
export const GET: APIRoute = async ({ site }) => {
  const { terms, topics, domains, tracks, readingIndex, trackOrder } = await loadGlossary();
  const base = site!.origin;
  const body = {
    version: process.env.CF_PAGES_COMMIT_SHA ?? new Date().toISOString(),
    site: base,
    tracks: tracks.map((t) => ({
      id: t.id,
      title: t.data.title,
      summary: t.data.summary,
      levels: t.data.levels,
      // The track's path, as on its track page: level by level, core first.
      path: trackOrder.get(t.id)!.map((term) => term.id),
    })),
    domains: domains.map((d) => ({ id: d.id, title: d.data.title, summary: d.data.summary })),
    topics: topics.map((t) => ({ id: t.id, title: t.data.title, summary: t.data.summary, domain: t.domain })),
    terms: [...terms]
      .sort((a, b) => readingIndex.get(a.id)! - readingIndex.get(b.id)!)
      .map((t) => ({
        id: t.id,
        title: t.data.title,
        summary: t.data.summary,
        domain: t.domain,
        topic: t.topic,
        also: t.data.also,
        levels: t.data.levels,
        core: t.data.core,
        aliases: t.data.aliases,
        prereqs: t.data.prereqs,
        related: t.data.related,
        written: t.written,
        r: readingIndex.get(t.id)!,
      })),
  };
  return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } });
};
