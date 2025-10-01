// Type checking disabled for this config to allow flexible JS helpers
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkRelated from './src/remark/remark-related.js';
import fs from 'node:fs';
import path from 'node:path';

// https://astro.build/config
// Sidebar helpers: recent N, year groups, draft exclusion
function getDocsMeta(sectionDir) {
  const root = path.resolve(process.cwd(), 'src', 'content', 'docs', sectionDir);
  const items = [];
  if (!fs.existsSync(root)) return items;
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
        // Skip section index files
        if (nextRel.toLowerCase().startsWith('index.')) continue;
        const nameNoExt = nextRel.slice(0, -ext.length);
        const slug = `${sectionDir}/${nameNoExt}`.replace(/\\/g, '/');
        // Parse year from filename prefix YYYY-MM-DD-
        const m = nameNoExt.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})-/);
        const year = m ? m[1] : '기타';
        // Rough draft detection from frontmatter header
        try {
          const head = fs.readFileSync(full, 'utf8').slice(0, 1000);
          const isDraft = /\bdraft:\s*true\b/.test(head);
          if (isDraft) continue;
        } catch {}
        items.push({ slug, year });
      }
    }
  };
  walk(root);
  // Latest first relying on YYYY-MM-DD- prefix lexicographic order
  items.sort((a, b) => b.slug.localeCompare(a.slug));
  return items;
}

function buildSection(sectionDir, label, opts = { recent: 5, icon: '' }) {
  const meta = getDocsMeta(sectionDir);
  const total = meta.length;
  const recent = meta.slice(0, opts.recent);
  const rest = meta.slice(opts.recent);
  const groupsByYear = rest.reduce((acc, it) => {
    (acc[it.year] ||= []).push(it);
    return acc;
  }, {});
  const yearGroups = Object.entries(groupsByYear)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, items]) => ({
      label: `📅 ${year}`,
      collapsed: true,
      badge: { text: String(items.length) },
      items: items.map((it) => ({ slug: it.slug })),
    }));
  const section = {
    label: `${opts.icon || ''} ${label}`.trim(),
    collapsed: true,
    badge: { text: String(total) },
    items: [
      { label: `🔥 최근 ${opts.recent}개`, items: recent.map((it) => ({ slug: it.slug })) },
    ],
  };
  if (yearGroups.length > 0) {
    section.items.push({ label: '📚 더 보기', collapsed: true, items: yearGroups });
  }
  return section;
}

export default defineConfig({
  markdown: {
    remarkPlugins: [[remarkRelated, { base: '/astro/' }]],
  },
  integrations: [
    starlight({
      title: 'Dev Archive',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/karais89/astro' }],
      components: {
        Header: './src/components/starlight/Header.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
      },
      customCss: ['./src/styles/related.css'],
      // Show "Last updated" on each page footer
      lastUpdated: true,
      // Add "Edit this page" links using your repo
      editLink: { baseUrl: 'https://github.com/karais89/astro/edit/main/' },
      // Enable on-page table of contents in the sidebar
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      // Use Expressive Code for syntax highlighting and code UI (copy button)
      expressiveCode: {},
      // Sidebar: recent N + expandable year groups
      sidebar: [
        buildSection('til', 'TIL', { recent: 5, icon: '📝' }),
        buildSection('coding-test', '코딩테스트', { recent: 5, icon: '🧠' }),
      ],
    }),
  ],
  site: 'https://karais89.github.io', // 실제 배포 주소로 변경
  base: '/astro/', // Set to repo name if deploying to GitHub Pages
});
