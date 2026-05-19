// Reads the backend API base URL from the runtime environment variable injected
// by Railway (window.__env.API_URL), then falls back to the API_URL property on
// the global window object, and finally to localhost for local development.
declare global {
  interface Window {
    __env?: { API_URL?: string };
  }
}

const runtimeUrl =
  (typeof window !== 'undefined' && window.__env?.API_URL) ||
  (typeof window !== 'undefined' && (window as any).API_URL);

export const API_BASE_URL: string = runtimeUrl
  ? runtimeUrl.replace(/\/$/, '') + '/api'
  : 'https://localhost:7057/api';
