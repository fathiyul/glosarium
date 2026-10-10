// "Viewing as" a track, and optionally one of its levels. The pages are static and identical for
// everyone; this script re-shapes them for the chosen view:
//   - sidebar: grouped by level (the track's path: level → core → more, by topic) or by topic
//     (domain → topic, only concepts in the view), instead of the full domain tree
//   - Previous/Next on concept pages: the same order as the sidebar, kept inside the chosen level
//   - topic pages: only the chosen track's section (and level)
//   - concept pages outside the view get a short note
// The view comes from ?track=&level=&group= (track pages link with ?track=) or, failing that, from what the
// reader picked last time. It's mirrored into the URL so a copied link opens the same view.

type Group = 'level' | 'topic';
type View = { track: string; level: string | null; group: Group };
type Term = { id: string; title: string; level: string; topic: string; r: number; core?: true };
type Path = {
  id: string;
  title: string;
  levels: { id: string; title: string }[];
  domains: { id: string; title: string }[];
  topics: { id: string; title: string; domain: string }[];
  terms: Term[];
};

const KEY = 'view';
const trackSelect = document.getElementById('view-track') as HTMLSelectElement | null;
const levelSelect = document.getElementById('view-level') as HTMLSelectElement | null;
const groupSwitch = document.querySelector<HTMLElement>('.view-group');
const pathBox = document.querySelector<HTMLElement>('.toc-path');
const domainTree = document.querySelector<HTMLElement>('.toc-domains');
const pager = document.querySelector<HTMLElement>('.pager[data-term]');
const defaultPager = pager?.innerHTML;
const currentTerm = pager?.dataset.term ?? (location.pathname.match(/^\/t\/([^/]+)/)?.[1] || undefined);
const knownTracks = new Set([...(trackSelect?.options ?? [])].map((o) => o.value).filter(Boolean));
const paths = new Map<string, Promise<Path>>();

function loadPath(track: string) {
  if (!paths.has(track)) {
    paths.set(
      track,
      fetch(`/paths/${track}.json`).then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      }),
    );
  }
  return paths.get(track)!;
}

function readView(): View | null {
  const params = new URLSearchParams(location.search);
  let view: View | null = null;
  let stored: View | null = null;
  try {
    stored = JSON.parse(localStorage.getItem(KEY) ?? 'null');
  } catch {}
  if (params.has('track')) {
    // A track link keeps the reader's grouping preference unless the URL names one.
    const group = params.get('group') ?? stored?.group;
    view = { track: params.get('track')!, level: params.get('level') || null, group: group === 'topic' ? 'topic' : 'level' };
  } else view = stored && { ...stored, group: stored.group === 'topic' ? 'topic' : 'level' };
  return view && knownTracks.has(view.track) ? view : null;
}

function saveView(view: View | null) {
  try {
    if (view) localStorage.setItem(KEY, JSON.stringify(view));
    else localStorage.removeItem(KEY);
  } catch {}
  const url = new URL(location.href);
  url.searchParams.delete('track');
  url.searchParams.delete('level');
  url.searchParams.delete('group');
  if (view) {
    url.searchParams.set('track', view.track);
    if (view.level) url.searchParams.set('level', view.level);
    if (view.group === 'topic') url.searchParams.set('group', 'topic');
  }
  history.replaceState(history.state, '', url);
}

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, props: Partial<HTMLElementTagNameMap[K]> = {}, ...kids: (Node | string)[]) => {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...kids);
  return node;
};

// Consecutive terms of one topic under a small topic label (terms arrive in reading order, so topics are contiguous).
function termLink(t: Term) {
  const a = el('a', { href: `/t/${t.id}`, textContent: t.title });
  if (t.id === currentTerm) a.setAttribute('aria-current', 'page');
  return el('li', {}, a);
}

function topicGroups(path: Path, terms: Term[]) {
  const topicTitle = new Map(path.topics.map((t) => [t.id, t.title]));
  const out: Node[] = [];
  let list: HTMLUListElement | null = null;
  let topic = '';
  for (const t of terms) {
    if (t.topic !== topic || !list) {
      topic = t.topic;
      out.push(el('p', { className: 'path-topic', textContent: topicTitle.get(t.topic)! }));
      list = el('ul', { className: 'toc-terms' });
      out.push(list);
    }
    list.append(termLink(t));
  }
  return out;
}

const count = (n: number) => el('span', { className: 'path-count', textContent: ` ${n}` });

// The concepts in the view, in the order the sidebar shows them (and Previous/Next follow).
function viewTerms(path: Path, view: View) {
  const terms = path.terms.filter((t) => !view.level || t.level === view.level);
  return view.group === 'topic' ? [...terms].sort((a, b) => a.r - b.r) : terms;
}

// By level: the track's path, level → core (by topic) → "N more".
function byLevel(path: Path, view: View, here: Term | undefined) {
  const levels = path.levels.filter((l) => !view.level || l.id === view.level);
  return levels.flatMap((level, i) => {
    const terms = path.terms.filter((t) => t.level === level.id);
    if (terms.length === 0) return [];
    const core = terms.filter((t) => t.core);
    const rest = terms.filter((t) => !t.core);
    const details = el('details', { className: 'path-level' });
    details.open = !!view.level || (here ? here.level === level.id : i === 0);
    details.append(el('summary', {}, level.title, count(terms.length)));
    if (core.length > 0 && rest.length > 0) {
      details.append(...topicGroups(path, core));
      const more = el('details', { className: 'path-more' });
      more.open = !!here && rest.includes(here);
      more.append(el('summary', { textContent: `${rest.length} more` }), ...topicGroups(path, rest));
      details.append(more);
    } else details.append(...topicGroups(path, terms));
    return [details];
  });
}

// By topic: domain → topic → concepts, like the default sidebar but only what's in the view.
function byTopic(path: Path, view: View, here: Term | undefined) {
  const terms = viewTerms(path, view);
  return path.domains.flatMap((domain) => {
    const topics = path.topics
      .filter((t) => t.domain === domain.id)
      .map((topic) => ({ topic, terms: terms.filter((t) => t.topic === topic.id) }))
      .filter((g) => g.terms.length > 0);
    if (topics.length === 0) return [];
    const details = el('details', { className: 'path-level' });
    details.open = !!here && topics.some((g) => g.topic.id === here.topic);
    details.append(el('summary', {}, domain.title, count(topics.reduce((n, g) => n + g.terms.length, 0))));
    const list = el('ul', { className: 'toc-topics' });
    for (const { topic, terms } of topics) {
      const sub = el('details', {});
      sub.open = !!here && here.topic === topic.id;
      sub.append(el('summary', {}, topic.title, count(terms.length)), el('ul', { className: 'toc-terms' }, ...terms.map(termLink)));
      list.append(el('li', {}, sub));
    }
    details.append(list);
    return [details];
  });
}

function renderSidebar(path: Path, view: View) {
  if (!pathBox) return;
  const here = viewTerms(path, view).find((t) => t.id === currentTerm);
  pathBox.replaceChildren(...(view.group === 'topic' ? byTopic(path, view, here) : byLevel(path, view, here)));
  pathBox.hidden = false;
  if (domainTree) domainTree.hidden = true;
  const current = pathBox.querySelector<HTMLElement>('[aria-current="page"]');
  const scroller = pathBox.closest('nav');
  if (scroller) scroller.scrollTop = current ? current.offsetTop - scroller.clientHeight / 3 : 0;
}

function pagerLink(dir: 'prev' | 'next', href: string, title: string, label: string) {
  return el(
    'a',
    { href, className: `pager-${dir}`, rel: dir },
    el('span', { className: 'pager-label', textContent: label }),
    el('span', { className: 'pager-title', textContent: title }),
  );
}

function renderPager(path: Path, view: View) {
  if (!pager) return;
  document.querySelector('.view-note')?.remove();
  const terms = viewTerms(path, view);
  const i = terms.findIndex((t) => t.id === currentTerm);
  const topicTitle = (id: string) => path.topics.find((t) => t.id === id)!.title;
  const levelTitle = (id: string) => path.levels.find((l) => l.id === id)!.title;
  const viewName = view.level ? `${path.title} · ${levelTitle(view.level)}` : path.title;
  if (i < 0) {
    // This concept isn't in the view: keep the default links, and say so.
    pager.innerHTML = defaultPager ?? '';
    const reset = el('button', { type: 'button', className: 'linkish', textContent: 'Show all concepts' });
    reset.addEventListener('click', () => setView(null));
    pager.before(el('p', { className: 'view-note' }, `Not in your ${viewName} view. `, reset));
    return;
  }
  const here = terms[i];
  const back = `/tracks/${path.id}${view.level ? `#${view.level}` : ''}`;
  // On a boundary, the label names what you're moving into: the level, or (grouped by topic) the topic.
  const note = (t: Term) =>
    view.group === 'topic'
      ? t.topic === here.topic ? path.title : `${path.title} · ${topicTitle(t.topic)}`
      : t.level === here.level ? path.title : `${path.title} · ${levelTitle(t.level)}`;
  const prev = terms[i - 1];
  const next = terms[i + 1];
  // At either end of the path, the link leads back to the track page.
  pager.replaceChildren(
    prev ? pagerLink('prev', `/t/${prev.id}`, prev.title, `← Previous · ${note(prev)}`) : pagerLink('prev', back, viewName, '← Back to track'),
    next ? pagerLink('next', `/t/${next.id}`, next.title, `Next · ${note(next)} →`) : pagerLink('next', back, viewName, 'Back to track →'),
  );
}

// Topic pages: show only the chosen track's section (and level); say so if nothing is left.
function filterTopicPage(view: View | null) {
  const sections = document.querySelectorAll<HTMLElement>('.track-section[data-track]');
  if (sections.length === 0) return;
  document.querySelector('.view-empty')?.remove();
  let visible = 0;
  sections.forEach((s) => {
    const levels = s.querySelectorAll<HTMLElement>('section[data-level]');
    let shownLevels = 0;
    levels.forEach((l) => {
      l.hidden = !!view?.level && s.dataset.track === view.track && l.dataset.level !== view.level;
      if (!l.hidden) shownLevels++;
    });
    s.hidden = !!view && (s.dataset.track !== view.track || shownLevels === 0);
    if (!s.hidden) visible++;
  });
  if (view && visible === 0) {
    const reset = el('button', { type: 'button', className: 'linkish', textContent: 'Show all concepts' });
    reset.addEventListener('click', () => setView(null));
    sections[0].before(el('p', { className: 'view-empty empty' }, 'This topic has no concepts in your current view. ', reset));
  }
}

function fillLevels(path: Path, view: View) {
  if (!levelSelect) return;
  levelSelect.replaceChildren(
    el('option', { value: '', textContent: 'All levels' }),
    ...path.levels.map((l) => el('option', { value: l.id, textContent: l.title })),
  );
  levelSelect.value = view.level ?? '';
  levelSelect.hidden = false;
  if (groupSwitch) {
    groupSwitch.hidden = false;
    groupSwitch.querySelectorAll<HTMLButtonElement>('button').forEach((b) => b.setAttribute('aria-pressed', String(b.value === view.group)));
  }
}

function resetToDefault() {
  if (pathBox) pathBox.hidden = true;
  if (domainTree) domainTree.hidden = false;
  if (levelSelect) levelSelect.hidden = true;
  if (groupSwitch) groupSwitch.hidden = true;
  if (pager && defaultPager !== undefined) pager.innerHTML = defaultPager;
  document.querySelector('.view-note')?.remove();
}

let active: View | null = null;

async function setView(view: View | null) {
  active = view;
  saveView(view);
  if (trackSelect) trackSelect.value = view?.track ?? '';
  filterTopicPage(view);
  if (!view) return resetToDefault();
  try {
    const path = await loadPath(view.track);
    if (active !== view) return; // a newer choice arrived while this one loaded
    if (view.level && !path.levels.some((l) => l.id === view.level)) view.level = null;
    fillLevels(path, view);
    renderSidebar(path, view);
    renderPager(path, view);
  } catch {
    resetToDefault();
  }
}

trackSelect?.addEventListener('change', () =>
  setView(trackSelect.value ? { track: trackSelect.value, level: null, group: active?.group ?? 'level' } : null),
);
levelSelect?.addEventListener('change', () => active && setView({ ...active, level: levelSelect.value || null }));
groupSwitch?.addEventListener('click', (e) => {
  const button = (e.target as HTMLElement).closest('button');
  if (button && active) setView({ ...active, group: button.value === 'topic' ? 'topic' : 'level' });
});

const initial = readView();
if (initial) setView(initial);
