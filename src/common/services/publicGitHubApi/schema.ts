import { z } from 'zod';

// full response schema: https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-users
export const publicGitHubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string(),
  html_url: z.string(),
  name: z.nullable(z.string()),
  bio: z.nullable(z.string()),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
});

export const rateLimitSchema = z.object({
  limit: z.number(),
  remaining: z.number(),
  reset: z.number(),
  used: z.number(),
});

export type PublicGitHubUser = z.infer<typeof publicGitHubUserSchema>;
export type RateLimit = z.infer<typeof rateLimitSchema>;
