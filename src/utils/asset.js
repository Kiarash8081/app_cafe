export const BASE = import.meta.env.BASE_URL || '/';

export function asset(path) {
  return `${BASE}${String(path).replace(/^\//, '')}`;
}

export function siteUrl() {
  if (typeof window === 'undefined') return 'https://kiarash8081.github.io/app_cafe/';
  return `${window.location.origin}${BASE}`;
}
