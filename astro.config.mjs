// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import fs from 'node:fs';
import path from 'node:path';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/karais89/astro' }],
      components: {
        Header: './src/components/starlight/Header.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
      },
      // Show "Last updated" on each page footer
      lastUpdated: true,
      // Add "Edit this page" links using your repo
      editLink: {
        baseUrl: 'https://github.com/karais89/astro/edit/main/',
      },
      // Enable on-page table of contents in the sidebar
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      // Use Expressive Code for syntax highlighting and code UI (copy button)
      expressiveCode: {},
      // Sidebar: hide Blog group; access Blog via top navbar only
      sidebar: [
        {
          label: 'TIL',
          items: getSortedDocSlugs('til').map((slug) => ({ slug })),
        },
        {
          label: '코딩테스트',
          items: getSortedDocSlugs('coding-test').map((slug) => ({ slug })),
        },
      ],
    }),
  ],
  base: '/astro/', // Set to repo name if deploying to GitHub Pages
});

// Build sidebar items by reading docs directory and sorting by slug (desc).
// Assumes files are named with a leading `YYYY-MM-DD-...` for correct lexicographic date ordering.
function getSortedDocSlugs(sectionDir) {
  const root = path.resolve(process.cwd(), 'src', 'content', 'docs', sectionDir);
  const slugs = [];
  if (!fs.existsSync(root)) return slugs;
  const walk = (dir, rel = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith('.')) continue;
      const full = path.join(dir, e.name);
      const nextRel = rel ? path.join(rel, e.name) : e.name;
      if (e.isDirectory()) {
        walk(full, nextRel);
      } else if (e.isFile()) {
        const ext = path.extname(e.name).toLowerCase();
        if (ext !== '.md' && ext !== '.mdx') continue;
        const nameNoExt = nextRel.slice(0, -ext.length);
        if (nameNoExt.toLowerCase() === 'index') continue;
        const slug = `${sectionDir}/${nameNoExt}`.replace(/\\/g, '/');
        slugs.push(slug);
      }
    }
  };
  walk(root);
  // Sort desc (latest first) relying on YYYY-MM-DD- prefix
  slugs.sort((a, b) => b.localeCompare(a));
  return slugs;
}
