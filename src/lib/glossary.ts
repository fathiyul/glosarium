import { getCollection, type CollectionEntry } from 'astro:content';

export type Term = CollectionEntry<'terms'> & { domain: string; topic: string; written: boolean };
export type Topic = CollectionEntry<'topics'> & { domain: string };
export type Domain = CollectionEntry<'domains'>;
export type Track = CollectionEntry<'tracks'>;

// "content/<domain>/<topic>/<file>.md" → [domain, topic]
function pathParts(filePath: string | undefined) {
  const parts = (filePath ?? '').split('/');
  return { domain: parts[1], topic: parts[2] };
}

let cache: Promise<ReturnType<typeof build>> | undefined;

async function build() {
  const [rawTerms, rawTopics, domains, tracks] = await Promise.all([
    getCollection('terms'),
    getCollection('topics'),
    getCollection('domains'),
    getCollection('tracks'),
  ]);

  const terms: Term[] = rawTerms.map((t) => ({
    ...t,
    ...pathParts(t.filePath),
    written: (t.body ?? '').trim().length > 0,
  }));
  const topics: Topic[] = rawTopics.map((t) => ({ ...t, domain: pathParts(t.filePath).domain }));

  const termById = new Map(terms.map((t) => [t.id, t]));
  const topicById = new Map(topics.map((t) => [t.id, t]));
  const domainById = new Map(domains.map((d) => [d.id, d]));
  const trackById = new Map(tracks.map((t) => [t.id, t]));

  validate(terms, topics, termById, topicById, domainById, trackById);

  const byTitle = (a: { data: { title: string } }, b: { data: { title: string } }) =>
    a.data.title.localeCompare(b.data.title);
  const byOrder = (a: { data: { order: number; title: string } }, b: { data: { order: number; title: string } }) =>
    a.data.order - b.data.order || byTitle(a, b);

  terms.sort(byTitle);
  domains.sort(byOrder);
  // Topics follow their domain's order first, so a track page reads domain by domain.
  const domainRank = new Map(domains.map((d, i) => [d.id, i]));
  topics.sort((a, b) => domainRank.get(a.domain)! - domainRank.get(b.domain)! || byOrder(a, b));

  return { terms, topics, domains, tracks, termById, topicById, domainById, trackById };
}

// Fail the build on broken references instead of shipping dead links.
function validate(
  terms: Term[],
  topics: Topic[],
  termById: Map<string, Term>,
  topicById: Map<string, Topic>,
  domainById: Map<string, Domain>,
  trackById: Map<string, Track>,
) {
  const errors: string[] = [];
  for (const topic of topics) {
    if (!domainById.has(topic.domain)) errors.push(`topic "${topic.id}": missing content/${topic.domain}/index.md`);
  }
  for (const term of terms) {
    if (!topicById.has(term.topic)) errors.push(`term "${term.id}": missing topic index.md for "${term.topic}"`);
    for (const ref of [...term.data.prereqs, ...term.data.related]) {
      if (!termById.has(ref)) errors.push(`term "${term.id}": unknown term "${ref}"`);
    }
    for (const [trackId, level] of Object.entries(term.data.levels)) {
      const track = trackById.get(trackId);
      if (!track) errors.push(`term "${term.id}": unknown track "${trackId}"`);
      else if (!track.data.levels.some((l) => l.id === level))
        errors.push(`term "${term.id}": track "${trackId}" has no level "${level}"`);
    }
    for (const topicId of term.data.also) {
      if (!topicById.has(topicId)) errors.push(`term "${term.id}": unknown topic "${topicId}" in also`);
      else if (topicId === term.topic) errors.push(`term "${term.id}": also lists its own topic "${topicId}"`);
    }
    for (const trackId of term.data.core) {
      if (!(trackId in term.data.levels)) errors.push(`term "${term.id}": core in "${trackId}" but has no level there`);
    }
  }
  if (errors.length) throw new Error(`Glossary content errors:\n  ${errors.join('\n  ')}`);
}

export function loadGlossary() {
  cache ??= build();
  return cache;
}

/** Terms grouped by the track's levels, in learning order. Empty levels are kept so gaps are visible. */
export function groupByLevel(track: Track, terms: Term[]) {
  return track.data.levels.map((level) => ({
    level,
    terms: terms.filter((t) => t.data.levels[track.id] === level.id),
  }));
}

/** Terms that live in a topic or are cross-listed there via `also`. */
export function termsInTopic(terms: Term[], topicId: string) {
  return terms.filter((t) => t.topic === topicId || t.data.also.includes(topicId));
}

export function isCore(term: Term, track: Track) {
  return term.data.core.includes(track.id);
}

export function levelTitle(track: Track, levelId: string) {
  return track.data.levels.find((l) => l.id === levelId)?.title ?? levelId;
}
