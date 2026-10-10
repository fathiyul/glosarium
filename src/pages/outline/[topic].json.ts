import type { APIRoute } from 'astro';
import { loadGlossary } from '../../lib/glossary';

// One small JSON file per topic, fetched by the sidebar when a reader expands a topic that isn't
// the current one. Keeps every page from carrying the full ~2,400-link tree.
export async function getStaticPaths() {
  const { topics } = await loadGlossary();
  return topics.map((topic) => ({ params: { topic: topic.id } }));
}

export const GET: APIRoute = async ({ params }) => {
  const { outline } = await loadGlossary();
  const list = outline.get(params.topic!)!.map((t) => ({ id: t.id, title: t.data.title }));
  return new Response(JSON.stringify(list), { headers: { 'Content-Type': 'application/json' } });
};
