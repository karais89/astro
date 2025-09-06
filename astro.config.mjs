// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
					social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
				components: {
					Header: './src/components/starlight/Header.astro',
				},
            // Show "Last updated" on each page footer
            lastUpdated: true,
            // Add "Edit this page" links using your repo
            editLink: {
              baseUrl: 'https://github.com/Lonpeach/astro/edit/main/',
            },
			// Enable on-page table of contents in the sidebar
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
			// Use Expressive Code for syntax highlighting and code UI (copy button)
			expressiveCode: {},
			sidebar: [
				{
					label: 'Intro',
					items: [{ label: '소개', slug: 'index' }],
				},
				{
					label: 'TIL',
					autogenerate: { directory: 'til' },
				},
				{
					label: '코딩테스트',
					autogenerate: { directory: 'coding-test' },
				},
				{
					label: '블로그',
					autogenerate: { directory: 'blog' },
				},
			],
		}),
	],
	base: '/astro/',   // Set to repo name if deploying to GitHub Pages
});
