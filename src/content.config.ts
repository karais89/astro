import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: ({}) =>
				z.object({
					// Blog/TIL 메타데이터 보존을 위한 필드 확장
					date: z.union([z.string(), z.date()]).optional(),
					createdAt: z.union([z.string(), z.date()]).optional(),
					tags: z.array(z.string()).optional(),
				}),
		}),
	}),
};
