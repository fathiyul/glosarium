// The glossary data, read from the site's static exports (built by the Astro site in the repo root):
//   /api/index.json   every concept's metadata, tracks with their paths, topics, domains
//   /t/<id>.md        one concept's text
// The index is cached per Worker instance and refreshed every few minutes, so a site deploy reaches
// the MCP server without redeploying it.

export type Level = { id: string; title: string; summary: string };
export type Track = { id: string; title: string; summary: string; levels: Level[]; path: string[] };
export type Domain = { id: string; title: string; summary: string };
export type Topic = { id: string; title: string; summary: string; domain: string };
export type Term = {
	id: string;
	title: string;
	summary: string;
	domain: string;
	topic: string;
	also: string[];
	levels: Record<string, string>;
	core: string[];
	aliases: string[];
	prereqs: string[];
	related: string[];
	written: boolean;
	r: number; // position on the site's reading path
};
type Index = { version: string; site: string; tracks: Track[]; domains: Domain[]; topics: Topic[]; terms: Term[] };

export type Glossary = Index & {
	termById: Map<string, Term>;
	topicById: Map<string, Topic>;
	trackById: Map<string, Track>;
	readingOrder: Term[];
};

const TTL_MS = 5 * 60 * 1000;
let cache: { glossary: Glossary; loadedAt: number } | undefined;

export async function loadGlossary(site: string): Promise<Glossary> {
	if (cache && Date.now() - cache.loadedAt < TTL_MS) return cache.glossary;
	try {
		const res = await fetch(`${site}/api/index.json`);
		if (!res.ok) throw new Error(`index.json: HTTP ${res.status}`);
		const index = (await res.json()) as Index;
		const glossary: Glossary = {
			...index,
			termById: new Map(index.terms.map((t) => [t.id, t])),
			topicById: new Map(index.topics.map((t) => [t.id, t])),
			trackById: new Map(index.tracks.map((t) => [t.id, t])),
			readingOrder: [...index.terms].sort((a, b) => a.r - b.r),
		};
		cache = { glossary, loadedAt: Date.now() };
		return glossary;
	} catch (error) {
		if (cache) return cache.glossary; // the site is unreachable: serve the last good copy
		throw error;
	}
}

export async function fetchConceptText(site: string, id: string) {
	const res = await fetch(`${site}/t/${encodeURIComponent(id)}.md`);
	if (!res.ok) throw new Error(`${id}.md: HTTP ${res.status}`);
	return res.text();
}

export const url = (g: Glossary, id: string) => `${g.site}/t/${id}`;

export function levelTitle(track: Track, levelId: string) {
	return track.levels.find((l) => l.id === levelId)?.title ?? levelId;
}

/** "Backend Engineer: Junior (core); Data Analyst: Mid-level" */
export function levelsText(g: Glossary, term: Term) {
	return Object.entries(term.levels)
		.map(([trackId, level]) => {
			const track = g.trackById.get(trackId);
			if (!track) return `${trackId}: ${level}`;
			return `${track.title}: ${levelTitle(track, level)}${term.core.includes(trackId) ? " (core)" : ""}`;
		})
		.join("; ");
}

/** One line per concept, the unit every list tool returns. */
export function line(g: Glossary, term: Term, track?: Track) {
	const where = track
		? `${levelTitle(track, term.levels[track.id])}${term.core.includes(track.id) ? ", core" : ""}`
		: levelsText(g, term);
	const stub = term.written ? "" : " (not written yet)";
	return `- \`${term.id}\` **${term.title}**: ${term.summary} [${where}]${stub}`;
}

const normalize = (s: string) =>
	s
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[^\p{L}\p{N}]+/gu, " ")
		.trim();

/** Rank concepts for a free-text query: exact names first, then title matches, then aliases and summaries. */
export function search(g: Glossary, query: string, filter: (t: Term) => boolean) {
	const q = normalize(query);
	const words = q.split(" ").filter(Boolean);
	if (words.length === 0) return [];
	const scored: { term: Term; score: number }[] = [];
	for (const term of g.terms) {
		if (!filter(term)) continue;
		const title = normalize(term.title);
		const aliases = term.aliases.map(normalize);
		const id = term.id.replace(/-/g, " ");
		const haystack = `${title} ${id} ${aliases.join(" ")} ${normalize(term.summary)}`;
		if (!words.every((w) => haystack.includes(w))) continue;
		let score = 0;
		if (title === q || id === q || aliases.includes(q)) score += 100;
		else if (title.startsWith(q)) score += 60;
		else if (title.includes(q)) score += 40;
		else if (aliases.some((a) => a.includes(q))) score += 30;
		score += words.filter((w) => title.includes(w)).length * 5;
		scored.push({ term, score });
	}
	return scored.sort((a, b) => b.score - a.score || a.term.r - b.term.r).map((s) => s.term);
}

/** Everything to learn before `id`, deepest prerequisites first, each listed once (cycles are cut). */
export function prereqChain(g: Glossary, id: string) {
	const out: Term[] = [];
	const done = new Set<string>();
	const visit = (term: Term, path: Set<string>) => {
		if (done.has(term.id) || path.has(term.id)) return;
		path.add(term.id);
		for (const p of term.prereqs) {
			const pre = g.termById.get(p);
			if (pre) visit(pre, path);
		}
		path.delete(term.id);
		done.add(term.id);
		out.push(term);
	};
	const start = g.termById.get(id);
	if (start) visit(start, new Set());
	return out.slice(0, -1); // the concept itself comes last; leave it out
}
