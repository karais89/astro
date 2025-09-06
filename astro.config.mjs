// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
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
