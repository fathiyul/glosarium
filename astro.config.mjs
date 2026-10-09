import { defineConfig } from 'astro/config';
import remarkEmbeds from './plugins/remark-embeds.mjs';

export default defineConfig({
  site: 'https://annotatedmind.com',
  markdown: {
    remarkPlugins: [remarkEmbeds],
  },
});
