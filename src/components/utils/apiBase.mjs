const DEFAULT_API_BASE_URL = 'https://api.supersheldon.com';
// const DEFAULT_API_BASE_URL = 'https://ominous-chainsaw-r4gg7vpp6wx93p5ww-5000.app.github.dev/';

export function getApiBaseUrl(env = process.env) {
  return env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL;
}

export { DEFAULT_API_BASE_URL };
export default getApiBaseUrl;
