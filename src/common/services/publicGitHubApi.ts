import axios, { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

const githubRestEndpoint = 'https://api.github.com';

export interface PublicGitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  received_events_url: string;
  type: string;
  score: number;
  following_url: string;
  gists_url: string;
  starred_url: string;
  events_url: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface RateLimit {
  limit: number;
  used: number;
  remaining: number;
  reset: number;
}

export interface PublicGitHubApiResult<T> {
  data?: T;
  rateLimit: RateLimit;
}

interface RateLimitHeaders {
  'x-ratelimit-limit': number;
  'x-ratelimit-remaining': number;
  'x-ratelimit-reset': number;
  'x-ratelimit-resource': string;
  'x-ratelimit-used': number;
}

export type GitHubResponseHeaders = RawAxiosResponseHeaders &
  AxiosResponseHeaders &
  RateLimitHeaders;

export const getUser = async (
  username: string
): Promise<PublicGitHubApiResult<PublicGitHubUser>> => {
  const userUrl = githubRestEndpoint + `/users/${username}`;
  const { headers, data } = await axios.get<PublicGitHubUser>(userUrl);

  const rateLimit = getRateLimit(headers as GitHubResponseHeaders);

  return {
    data,
    rateLimit,
  };
};

const getRateLimit = (responseHeaders: GitHubResponseHeaders): RateLimit => {
  return {
    // Convert rate limit to UNIX date from using seconds to using milliseconds.
    reset: responseHeaders['x-ratelimit-reset'] * 1000,
    used: responseHeaders['x-ratelimit-used'],
    remaining: responseHeaders['x-ratelimit-remaining'],
    limit: responseHeaders['x-ratelimit-limit'],
  };
};
