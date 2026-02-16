import { z } from 'zod';

export const articleDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  body: z.string(),
  tagList: z.array(z.string()).optional()
})
export type ArticleData = z.infer<typeof articleDataSchema>

export const ArticleRequestSchema = z.object({
  article: articleDataSchema,
})
export type ArticleRequest = z.infer<typeof ArticleRequestSchema>

export const articleResponseSchema = z.object({
  article: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    body: z.string(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    author: z.object({
      username: z.string(),
      bio: z.string(),
      image: z.string(),
      following: z.boolean(),
    }),
    tagList: z.array(z.string()),
    favorited: z.boolean(),
    favoritesCount: z.number()
  })
});
export type ArticleResponse = z.infer<typeof articleResponseSchema>
