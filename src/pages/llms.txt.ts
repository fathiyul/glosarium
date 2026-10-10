import type { APIRoute } from 'astro';
import { loadGlossary } from '../lib/glossary';

// /llms.txt: a plain-text map of the site for AI assistants (https://llmstxt.org).
export const GET: APIRoute = async ({ site }) => {
  const { tracks, domains, topics } = await loadGlossary();
  const base = site!.origin;
  const lines = [
    '# Glosarium',
    '',
    '> A glossary of software, data and startup concepts, each placed at the career level (per track) where you actually need it.',
    '',
    `Every concept is at ${base}/t/<id> (HTML) and ${base}/t/<id>.md (Markdown). All concepts with their levels, prerequisites and learning order are in ${base}/api/index.json.`,
    '',
    '## Tracks',
    '',
    ...tracks.map((t) => `- [${t.data.title}](${base}/tracks/${t.id}): ${t.data.summary}`),
    '',
    ...domains.flatMap((d) => [
      `## ${d.data.title}`,
      '',
      ...topics.filter((t) => t.domain === d.id).map((t) => `- [${t.data.title}](${base}/topics/${t.id}): ${t.data.summary}`),
      '',
    ]),
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
