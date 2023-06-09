import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { RateLimit } from './schema';

export interface PublicGitHubApiResult<T> {
  data: T;
  rateLimit: RateLimit;
}

interface RateLimitHeaders {
  'x-ratelimit-limit': string;
  'x-ratelimit-remaining': string;
  'x-ratelimit-reset': string;
  'x-ratelimit-resource': string;
  'x-ratelimit-used': string;
}

export type GitHubResponseHeaders = RawAxiosResponseHeaders &
  AxiosResponseHeaders &
  RateLimitHeaders;
