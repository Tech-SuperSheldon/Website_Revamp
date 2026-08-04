const DEFAULT_API_BASE_URL = 'http://api.supersheldon.com';

export function getApiBaseUrl(env = process.env) {
  return env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL;
}

export { DEFAULT_API_BASE_URL };
export default getApiBaseUrl;
