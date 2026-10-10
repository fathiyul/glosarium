import type { APIRoute } from 'astro';
import { isCore, loadGlossary } from '../../lib/glossary';

// One track's reading path, for the "Viewing" picker: the sidebar and Previous/Next are rebuilt
// from this when a reader views the site as a track (and optionally one level).
export async function getStaticPaths() {
  const { tracks } = await loadGlossary();
  return tracks.map((track) => ({ params: { track: track.id } }));
}

export const GET: APIRoute = async ({ params }) => {
  const { trackById, trackOrder, topics, domains, readingIndex } = await loadGlossary();
  const track = trackById.get(params.track!)!;
  const terms = trackOrder.get(track.id)!;
  const used = new Set(terms.map((t) => t.topic));
  const usedTopics = topics.filter((t) => used.has(t.id));
  const usedDomains = new Set(usedTopics.map((t) => t.domain));
  // Terms come in track order (grouped by level). `r` is the site-wide reading position, used to
  // re-sort them when the reader groups the sidebar by topic. Topics and domains are in site order.
  const body = {
    id: track.id,
    title: track.data.title,
    levels: track.data.levels.map((l) => ({ id: l.id, title: l.title })),
    domains: domains.filter((d) => usedDomains.has(d.id)).map((d) => ({ id: d.id, title: d.data.title })),
    topics: usedTopics.map((t) => ({ id: t.id, title: t.data.title, domain: t.domain })),
    terms: terms.map((t) => ({
      id: t.id,
      title: t.data.title,
      level: t.data.levels[track.id],
      topic: t.topic,
      r: readingIndex.get(t.id)!,
      ...(isCore(t, track) && { core: true }),
    })),
  };
  return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } });
};
