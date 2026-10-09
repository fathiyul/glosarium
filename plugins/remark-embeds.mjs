import { visit } from 'unist-util-visit';

// Turns a paragraph that contains nothing but a YouTube URL into an embedded player,
// Notion-style. Paste the link on its own line; anything else stays a normal link.
const YOUTUBE =
  /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})(?:[&?#].*)?$/;

function youtubeId(node) {
  if (node.children.length !== 1) return null;
  const child = node.children[0];
  if (child.type !== 'link') return null;
  return child.url.match(YOUTUBE)?.[1] ?? null;
}

export default function remarkEmbeds() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      const id = youtubeId(node);
      if (!id || !parent) return;
      parent.children[index] = {
        type: 'html',
        value:
          `<div class="embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" ` +
          `title="YouTube video" loading="lazy" allowfullscreen ` +
          `allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`,
      };
    });
  };
}
