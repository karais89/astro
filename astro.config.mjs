// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/karais89/astro' }],
      components: {
        Header: './src/components/starlight/Header.astro',
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
          autogenerate: { directory: 'til' },
        },
        {
          label: '코딩테스트',
          autogenerate: { directory: 'coding-test' },
        },
      ],
    }),
  ],
  base: '/astro/', // Set to repo name if deploying to GitHub Pages
});

