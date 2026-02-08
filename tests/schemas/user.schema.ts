import { z } from 'zod';

export const userRegistrationDataSchema = z.object({
  email: z.string(),
  password: z.string(),
  username: z.string(),
})
export type UserRegistrationData = z.infer<typeof userRegistrationDataSchema>

export const userRegistrationRequestSchema = z.object({
  user: userRegistrationDataSchema,
})
export type UserRegistrationRequest = z.infer<typeof userRegistrationRequestSchema>

export const UserResponseSchema = z.object({
  user: z.object({
    username: z.string(),
    email: z.email(),
    bio: z.string(),
    image: z.url().or(z.literal('')),
    token: z.jwt()
  }).optional(),
  errors: z.record(z.string(), z.string()).optional()
});
export type UserResponse = z.infer<typeof UserResponseSchema>
