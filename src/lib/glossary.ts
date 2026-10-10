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

  // Each topic's concepts in learning order (sidebar), and one reading path through the whole site
  // (prev/next links). The path visits each term once, in its home topic, so cross-listed terms don't repeat.
  const outline = new Map(topics.map((topic) => [topic.id, orderTopic(topic, termsInTopic(terms, topic.id), tracks)]));
  const readingOrder = topics.flatMap((topic) => outline.get(topic.id)!.filter((t) => t.topic === topic.id));
  const readingIndex = new Map(readingOrder.map((t, i) => [t.id, i]));
  // Each track's path, exactly as its track page lists it: level by level, core first, then the site's reading order.
  const trackOrder = new Map(
    tracks.map((track) => {
      const levelIndex = new Map(track.data.levels.map((l, i) => [l.id, i]));
      const key = (t: Term) => [levelIndex.get(t.data.levels[track.id])!, isCore(t, track) ? 0 : 1, readingIndex.get(t.id)!];
      const list = terms.filter((t) => track.id in t.data.levels);
      list.sort((a, b) => {
        const [ka, kb] = [key(a), key(b)];
        return ka[0] - kb[0] || ka[1] - kb[1] || ka[2] - kb[2];
      });
      return [track.id, list];
    }),
  );

  return { terms, topics, domains, tracks, termById, topicById, domainById, trackById, outline, readingOrder, readingIndex, trackOrder };
}

// A term's average level across its tracks, as a position in each track's ladder (0 = first level).
// Average, not minimum, so one track placing a term early doesn't pull it to the front everywhere.
function levelRank(term: Term, tracks: Track[]) {
  const ranks = Object.entries(term.data.levels).map(([trackId, level]) => {
    const track = tracks.find((tr) => tr.id === trackId);
    const i = track ? track.data.levels.findIndex((l) => l.id === level) : -1;
    return i < 0 ? 99 : i;
  });
  return ranks.reduce((a, b) => a + b, 0) / ranks.length;
}

// The topic's curated `sequence` first. Then the rest, foundations first: lowest level, then shortest
// prereq chain inside the topic, then title, with each term's unplaced in-topic prereqs pulled in
// right before it. Prereq cycles are broken where they're met, so they can't stall the order.
function orderTopic(topic: Topic, list: Term[], tracks: Track[]) {
  const byId = new Map(list.map((t) => [t.id, t]));
  const prereqsOf = (t: Term) => t.data.prereqs.filter((p) => p !== t.id && byId.has(p)).map((p) => byId.get(p)!);

  const depthMemo = new Map<string, number>();
  const depth = (t: Term, path = new Set<string>()): number => {
    if (depthMemo.has(t.id)) return depthMemo.get(t.id)!;
    if (path.has(t.id)) return 0;
    path.add(t.id);
    const d = Math.max(0, ...prereqsOf(t).map((p) => depth(p, path) + 1));
    path.delete(t.id);
    depthMemo.set(t.id, d);
    return d;
  };
  const rank = new Map(list.map((t) => [t.id, levelRank(t, tracks)]));
  const better = (a: Term, b: Term) =>
    rank.get(a.id)! - rank.get(b.id)! || depth(a) - depth(b) || a.data.title.localeCompare(b.data.title);

  const placed = new Set<string>();
  const out: Term[] = [];
  const place = (t: Term, path = new Set<string>()) => {
    if (placed.has(t.id) || path.has(t.id)) return;
    path.add(t.id);
    for (const p of prereqsOf(t).sort(better)) place(p, path);
    placed.add(t.id);
    out.push(t);
  };
  for (const id of topic.data.sequence) if (byId.has(id)) (placed.add(id), out.push(byId.get(id)!));
  for (const t of [...list].sort(better)) place(t);
  return out;
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
    const seen = new Set<string>();
    for (const id of topic.data.sequence) {
      const term = termById.get(id);
      if (!term) errors.push(`topic "${topic.id}": unknown term "${id}" in sequence`);
      else if (term.topic !== topic.id && !term.data.also.includes(topic.id))
        errors.push(`topic "${topic.id}": sequence lists "${id}", which isn't in this topic`);
      if (seen.has(id)) errors.push(`topic "${topic.id}": "${id}" appears twice in sequence`);
      seen.add(id);
    }
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
