// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Define your collection(s)
const blog = defineCollection({
  loader: glob({ pattern: "**.{md,mdx}", base: "./src/data/post" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      image: image(),
      // author: z.string(),
      // relaciones
      author: reference("author"),
      tags: z.array(z.string()),
      isDraft: z.boolean().default(false),
    }),
});

const author = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/data/author" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
    }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog, author };
