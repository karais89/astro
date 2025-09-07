import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: ({}) =>
				z.object({
					// Blog/TIL metadata 확장
					date: z.union([z.string(), z.date()]).optional(),
					updatedAt: z.union([z.string(), z.date()]).optional(),
					draft: z.boolean().optional(),
					tags: z.array(z.string()).optional(),
					preferBodyH1: z.boolean().optional(),
				}),
		}),
	}),
};

