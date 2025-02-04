import { defineCollection, z } from 'astro:content'

let blog = defineCollection({
  schema: z.object({
    date: z
      .string()
      .or(z.date())
      .transform(val => new Date(val)),
    description: z.string(),
    title: z.string(),
  }),
  type: 'content',
})

let projects = defineCollection({
  schema: z.object({
    links: z.object({
      website: z.optional(z.string()),
      github: z.optional(z.string()),
      vscode: z.optional(z.string()),
      npm: z.optional(z.string()),
    }),
    badges: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
      }),
    ),
    description: z.string(),
    title: z.string(),
    type: z.string(),
    id: z.string(),
  }),
  type: 'content',
})

let travelMap = defineCollection({
  schema: z.object({
    originName: z.string(),
    code: z.string(),
  }),
  type: 'data',
})

let anime = defineCollection({
  schema: z.object({
    genres: z.array(
      z.union([
        z.literal('psychological'),
        z.literal('slice-of-life'),
        z.literal('supernatural'),
        z.literal('adventure'),
        z.literal('thriller'),
        z.literal('fantasy'),
        z.literal('mystery'),
        z.literal('romance'),
        z.literal('comedy'),
        z.literal('action'),
        z.literal('sci-fi'),
        z.literal('horror'),
        z.literal('drama'),
        z.literal('mecha'),
        z.literal('music'),
        z.literal('ecchi'),
      ]),
    ),
    originName: z.string(),
    duration: z.number(),
    episodes: z.number(),
    score: z.number(),
    year: z.number(),
    id: z.string(),
  }),
  type: 'data',
})

export let collections = {
  'travel-map': travelMap,
  projects,
  anime,
  blog,
}
