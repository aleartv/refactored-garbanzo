import { z } from 'zod';

export const LoginRequestSchema = z.object({
  user: z.object({
    email: z.string(),
    password: z.string(),
  })
})
export type LoginRequest = z.infer<typeof LoginRequestSchema>

export const LoginResponseSchema = z.object({
  user: z.object({
    username: z.string(),
    email: z.email(),
    bio: z.string(),
    image: z.url().or(z.literal('')),
    token: z.jwt()
  }).optional(),
  errors: z.object({
    login: z.string()
  }).optional()
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>

