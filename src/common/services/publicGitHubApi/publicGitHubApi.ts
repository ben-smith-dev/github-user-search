import axios from 'axios';
import {
  PublicGitHubUser,
  RateLimit,
  publicGitHubUserSchema,
  rateLimitSchema,
} from './schema';
import { GitHubResponseHeaders, PublicGitHubApiResult } from './interfaces';

const githubRestEndpoint = 'https://api.github.com';

export const getUser = async (
  username: string
): Promise<PublicGitHubApiResult<PublicGitHubUser>> => {
  const userUrl = githubRestEndpoint + `/users/${username}`;
  const { headers, data } = await axios.get<PublicGitHubUser>(userUrl);

  const rateLimit = getRateLimit(headers as GitHubResponseHeaders);

  // Throw if data does not match defined GitHub user schema.
  publicGitHubUserSchema.parse(data);

  return {
    data,
    rateLimit,
  };
};

export const getRateLimit = (
  responseHeaders: GitHubResponseHeaders
): RateLimit => {
  const rateLimit: RateLimit = {
    // Convert rate limit to UNIX date from using seconds to using milliseconds.
    reset: Number(responseHeaders['x-ratelimit-reset']) * 1000,
    used: Number(responseHeaders['x-ratelimit-used']),
    remaining: Number(responseHeaders['x-ratelimit-remaining']),
    limit: Number(responseHeaders['x-ratelimit-limit']),
  };

  // Throw if rate limit headers do not match defined rate limit schema.
  rateLimitSchema.parse(rateLimit);

  return rateLimit;
};
