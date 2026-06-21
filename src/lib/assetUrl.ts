/** Raw `/public` paths — no prefix; use with `<video>`, `<img>`, etc. */
export function assetUrl(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}
