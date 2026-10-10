import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";
import {
	fetchConceptText,
	levelTitle,
	line,
	loadGlossary,
	prereqChain,
	search,
	url,
	type Glossary,
	type Term,
	type Track,
} from "./glossary";

// Glosarium as an MCP server. The tools disclose progressively: tracks and lists return one line
// per concept (id, title, summary, level); only get_concept returns a page's full text. Orders match
// the site: a track's path is its track page, and next_concepts is the page's Previous/Next.

const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });
const fail = (t: string) => ({ content: [{ type: "text" as const, text: t }], isError: true });
const readOnly = { readOnlyHint: true, openWorldHint: false };

function findTrack(g: Glossary, id: string): Track | string {
	return g.trackById.get(id) ?? `Unknown track "${id}". Tracks: ${g.tracks.map((t) => t.id).join(", ")}.`;
}

function checkLevel(track: Track, level: string | undefined): string | undefined {
	if (level && !track.levels.some((l) => l.id === level))
		return `Track "${track.id}" has no level "${level}". Levels: ${track.levels.map((l) => l.id).join(", ")}.`;
}

function unknownConcept(g: Glossary, id: string) {
	const guesses = search(g, id.replace(/-/g, " "), () => true).slice(0, 5);
	return fail(
		`No concept with id "${id}".` +
			(guesses.length ? ` Did you mean: ${guesses.map((t) => `\`${t.id}\``).join(", ")}?` : " Try search_concepts."),
	);
}

function createServer(env: Env) {
	const site = env.SITE_URL.replace(/\/$/, "");
	const glossary = () => loadGlossary(site);

	const server = new McpServer({
		name: "Glosarium",
		version: "1.0.0",
	});

	server.registerTool(
		"list_tracks",
		{
			title: "List learning tracks",
			description:
				"List Glosarium's learning tracks (e.g. Backend Engineer, Tech Entrepreneur) with their levels in learning order and how many concepts each level has. Start here to find track and level ids for the other tools.",
			inputSchema: z.object({}),
			annotations: readOnly,
		},
		async () => {
			const g = await glossary();
			const out = g.tracks.map((track) => {
				const counts = track.levels.map((l) => {
					const n = track.path.filter((id) => g.termById.get(id)?.levels[track.id] === l.id).length;
					return `  - \`${l.id}\` ${l.title} (${n} concepts): ${l.summary}`;
				});
				return [`## ${track.title} (\`${track.id}\`)`, track.summary, ...counts].join("\n");
			});
			return text(out.join("\n\n"));
		},
	);

	server.registerTool(
		"list_topics",
		{
			title: "Browse domains and topics",
			description:
				"Browse the glossary by theme. Without a domain: lists domains. With a domain id: lists its topics and their concepts' ids and titles, in learning order.",
			inputSchema: z.object({
				domain: z.string().optional().describe("Domain id from a previous call, e.g. 'backend'"),
			}),
			annotations: readOnly,
		},
		async ({ domain }) => {
			const g = await glossary();
			if (!domain) {
				return text(
					g.domains
						.map((d) => {
							const n = g.terms.filter((t) => t.domain === d.id).length;
							return `- \`${d.id}\` **${d.title}** (${n} concepts): ${d.summary}`;
						})
						.join("\n"),
				);
			}
			const topics = g.topics.filter((t) => t.domain === domain);
			if (topics.length === 0) return fail(`Unknown domain "${domain}". Call list_topics without arguments.`);
			const out = topics.map((topic) => {
				const terms = g.readingOrder.filter((t) => t.topic === topic.id);
				return `## ${topic.title} (\`${topic.id}\`)\n${topic.summary}\n${terms.map((t) => `\`${t.id}\` ${t.title}`).join(" · ")}`;
			});
			return text(out.join("\n\n"));
		},
	);

	server.registerTool(
		"search_concepts",
		{
			title: "Search concepts",
			description:
				"Find concepts by name, alias or keyword. Returns one line per match: id, title, one-line summary and level. Optionally only concepts in a track (and level). Use get_concept for the full explanation.",
			inputSchema: z.object({
				query: z.string().min(1).describe("e.g. 'jwt', 'refresh token', 'cap table'"),
				track: z.string().optional().describe("Only concepts in this track"),
				level: z.string().optional().describe("Only this level of the track (needs track)"),
				limit: z.number().int().min(1).max(50).default(10),
			}),
			annotations: readOnly,
		},
		async ({ query, track: trackId, level, limit }) => {
			const g = await glossary();
			let track: Track | undefined;
			if (trackId) {
				const found = findTrack(g, trackId);
				if (typeof found === "string") return fail(found);
				track = found;
				const bad = checkLevel(track, level);
				if (bad) return fail(bad);
			}
			const results = search(g, query, (t) => !track || (track.id in t.levels && (!level || t.levels[track.id] === level)));
			if (results.length === 0) return text(`No concepts match "${query}".`);
			const shown = results.slice(0, limit);
			const more = results.length > shown.length ? `\n\n${results.length - shown.length} more; raise limit to see them.` : "";
			return text(shown.map((t) => line(g, t, track)).join("\n") + more);
		},
	);

	server.registerTool(
		"get_concept",
		{
			title: "Read a concept",
			description:
				"The full explanation of one concept, in Markdown: summary, levels per track, aliases, what to learn first, related concepts, and the body text with links.",
			inputSchema: z.object({ id: z.string().describe("Concept id, e.g. 'jwt'") }),
			annotations: readOnly,
		},
		async ({ id }) => {
			const g = await glossary();
			if (!g.termById.has(id)) return unknownConcept(g, id);
			return text(await fetchConceptText(site, id));
		},
	);

	server.registerTool(
		"get_learning_path",
		{
			title: "Learning path",
			description:
				"A track's concepts in the order to learn them, exactly as the site's track page lists them: level by level, core ('start here') concepts first. Optionally one level, core only, or grouped by topic. Paged.",
			inputSchema: z.object({
				track: z.string().describe("Track id, from list_tracks"),
				level: z.string().optional().describe("Only this level"),
				core_only: z.boolean().default(false).describe("Only the 'start here' concepts"),
				group: z.enum(["level", "topic"]).default("level").describe("Order by level (the track's path) or by topic"),
				offset: z.number().int().min(0).default(0),
				limit: z.number().int().min(1).max(200).default(60),
			}),
			annotations: readOnly,
		},
		async ({ track: trackId, level, core_only, group, offset, limit }) => {
			const g = await glossary();
			const track = findTrack(g, trackId);
			if (typeof track === "string") return fail(track);
			const bad = checkLevel(track, level);
			if (bad) return fail(bad);
			let terms = track.path.map((id) => g.termById.get(id)!).filter(Boolean);
			if (level) terms = terms.filter((t) => t.levels[track.id] === level);
			if (core_only) terms = terms.filter((t) => t.core.includes(track.id));
			if (group === "topic") terms = [...terms].sort((a, b) => a.r - b.r);
			const page = terms.slice(offset, offset + limit);
			// A heading whenever the level (or topic) changes; none for a single level, the title already says it.
			const out: string[] = [];
			let heading = "";
			for (const t of page) {
				const h = group === "topic" ? (g.topicById.get(t.topic)?.title ?? t.topic) : levelTitle(track, t.levels[track.id]);
				if (h !== heading && !(level && group === "level")) out.push(`\n## ${h}`);
				heading = h;
				out.push(line(g, t, track));
			}
			const end = offset + page.length;
			const footer =
				end < terms.length
					? `\n\nShowing ${offset + 1}–${end} of ${terms.length}. Next page: offset ${end}.`
					: `\n\n${terms.length} concepts in total.`;
			return text([`# ${track.title}${level ? ` · ${levelTitle(track, level)}` : ""}`, ...out].join("\n") + footer);
		},
	);

	server.registerTool(
		"next_concepts",
		{
			title: "What comes before and after",
			description:
				"For one concept: the previous and next concept on a track's path (or the site's reading path when no track is given), plus what to learn first and related concepts. Use it to walk through a track one concept at a time.",
			inputSchema: z.object({
				id: z.string(),
				track: z.string().optional(),
				level: z.string().optional().describe("Stay inside this level of the track"),
			}),
			annotations: readOnly,
		},
		async ({ id, track: trackId, level }) => {
			const g = await glossary();
			const term = g.termById.get(id);
			if (!term) return unknownConcept(g, id);
			let path: Term[] = g.readingOrder;
			let track: Track | undefined;
			if (trackId) {
				const found = findTrack(g, trackId);
				if (typeof found === "string") return fail(found);
				track = found;
				const bad = checkLevel(track, level);
				if (bad) return fail(bad);
				path = track.path.map((x) => g.termById.get(x)!).filter((t) => t && (!level || t.levels[track!.id] === level));
			}
			const i = path.indexOf(term);
			const names = (ids: string[]) =>
				ids.map((x) => g.termById.get(x)).filter((t): t is Term => !!t).map((t) => line(g, t, track));
			const out = [`# ${term.title} (\`${term.id}\`)`, url(g, term.id)];
			if (track && i < 0) out.push(`\nNot in the ${track.title}${level ? ` ${levelTitle(track, level)}` : ""} path.`);
			else {
				const where = track ? `${track.title}${level ? ` · ${levelTitle(track, level)}` : ""} path` : "site's reading path";
				out.push(`\nPosition ${i + 1} of ${path.length} on the ${where}.`);
				out.push(`\n## Previous\n${path[i - 1] ? line(g, path[i - 1], track) : "(start of the path)"}`);
				out.push(`\n## Next\n${path[i + 1] ? line(g, path[i + 1], track) : "(end of the path)"}`);
			}
			if (term.prereqs.length) out.push(`\n## Learn first\n${names(term.prereqs).join("\n")}`);
			if (term.related.length) out.push(`\n## Related\n${names(term.related).join("\n")}`);
			return text(out.join("\n"));
		},
	);

	server.registerTool(
		"prereq_chain",
		{
			title: "Prerequisite chain",
			description:
				"Everything to learn before a concept, following prerequisites all the way down, in an order where each concept comes after the ones it depends on.",
			inputSchema: z.object({ id: z.string() }),
			annotations: readOnly,
		},
		async ({ id }) => {
			const g = await glossary();
			const term = g.termById.get(id);
			if (!term) return unknownConcept(g, id);
			const chain = prereqChain(g, id);
			if (chain.length === 0) return text(`**${term.title}** has no prerequisites. Start with it directly.`);
			return text(
				`Learn these first, in order, before **${term.title}** (\`${term.id}\`):\n\n${chain.map((t) => line(g, t)).join("\n")}`,
			);
		},
	);

	server.registerTool(
		"whats_next",
		{
			title: "What to learn next",
			description:
				"Given the concepts someone already knows, suggest what to learn next on a track: concepts in track order whose prerequisites (within the track) are all known. Optionally within one level.",
			inputSchema: z.object({
				track: z.string(),
				known: z.array(z.string()).describe("Ids of concepts already known"),
				level: z.string().optional(),
				limit: z.number().int().min(1).max(50).default(10),
			}),
			annotations: readOnly,
		},
		async ({ track: trackId, known, level, limit }) => {
			const g = await glossary();
			const track = findTrack(g, trackId);
			if (typeof track === "string") return fail(track);
			const bad = checkLevel(track, level);
			if (bad) return fail(bad);
			const knownSet = new Set(known);
			const unknownIds = known.filter((k) => !g.termById.has(k));
			const inTrack = new Set(track.path);
			// A prerequisite outside this track doesn't block: the track doesn't teach it.
			const ready = track.path
				.map((x) => g.termById.get(x)!)
				.filter(
					(t) =>
						t &&
						!knownSet.has(t.id) &&
						(!level || t.levels[track.id] === level) &&
						t.prereqs.every((p) => knownSet.has(p) || !inTrack.has(p)),
				)
				.slice(0, limit);
			const note = unknownIds.length ? `\n\nIgnored unknown ids: ${unknownIds.join(", ")}.` : "";
			if (ready.length === 0) return text(`Nothing left to suggest on this path.${note}`);
			return text(`Ready to learn next on ${track.title}:\n\n${ready.map((t) => line(g, t, track)).join("\n")}${note}`);
		},
	);

	server.registerPrompt(
		"study_plan",
		{
			title: "Study plan",
			description: "Plan what to learn next on a Glosarium track, at a level, using the glossary tools.",
			argsSchema: z.object({
				track: z.string().describe("Track id, e.g. backend or tech-entrepreneur"),
				level: z.string().describe("Level id, e.g. junior or idea"),
				goal: z.string().optional().describe("What you want to be able to do, and how much time you have"),
			}),
		},
		({ track, level, goal }) => ({
			messages: [
				{
					role: "user",
					content: {
						type: "text",
						text: [
							`Make me a study plan for the ${track} track at the ${level} level of Glosarium.`,
							goal ? `My goal and time: ${goal}` : "",
							"Use get_learning_path (core_only first) to see what matters most, ask me which of those concepts I already know,",
							"then use whats_next to choose what comes next and get_concept to explain anything I ask about.",
							"Group the plan into short sessions, and link each concept's page.",
						]
							.filter(Boolean)
							.join(" "),
					},
				},
			],
		}),
	);

	return server;
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return createMcpHandler(() => createServer(env))(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
