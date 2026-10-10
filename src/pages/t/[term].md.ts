import type { APIRoute } from 'astro';
import { loadGlossary, levelTitle, type Term } from '../../lib/glossary';

// Each concept as plain Markdown at /t/<id>.md, for AI tools and the MCP server: a short header
// (title, summary, levels, links) and the body, with site-relative links made absolute.
export async function getStaticPaths() {
  const { terms } = await loadGlossary();
  return terms.map((term) => ({ params: { term: term.id }, props: { term } }));
}

export const GET: APIRoute = async ({ props, site }) => {
  const { term } = props as { term: Term };
  const { trackById, termById, topicById } = await loadGlossary();
  const base = site!.origin;
  const absolute = (md: string) => md.replace(/\]\(\/(?!\/)/g, `](${base}/`);
  const names = (ids: string[]) => ids.map((id) => `[${termById.get(id)!.data.title}](${base}/t/${id})`).join(', ');
  const levels = Object.entries(term.data.levels)
    .map(([trackId, level]) => {
      const track = trackById.get(trackId)!;
      return `${track.data.title}: ${levelTitle(track, level)}${term.data.core.includes(trackId) ? ' (core)' : ''}`;
    })
    .join('; ');
  const lines = [
    `# ${term.data.title}`,
    '',
    `> ${term.data.summary}`,
    '',
    `- URL: ${base}/t/${term.id}`,
    `- Topic: ${topicById.get(term.topic)!.data.title}`,
    `- Levels: ${levels}`,
    term.data.aliases.length > 0 && `- Also known as: ${term.data.aliases.join(', ')}`,
    term.data.prereqs.length > 0 && `- Learn first: ${names(term.data.prereqs)}`,
    term.data.related.length > 0 && `- Related: ${names(term.data.related)}`,
    '',
    term.written ? absolute((term.body ?? '').trim()) : '_Not written yet. Only the summary above exists so far._',
    '',
  ].filter((l) => l !== false);
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
