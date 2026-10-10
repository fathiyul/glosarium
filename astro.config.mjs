import { defineConfig } from 'astro/config';
import remarkEmbeds from './plugins/remark-embeds.mjs';

export default defineConfig({
  site: 'https://glosarium.pages.dev',
  markdown: {
    remarkPlugins: [remarkEmbeds],
  },
});
