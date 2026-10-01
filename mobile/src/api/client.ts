import { supabase } from "../lib/supabase";

const API_URL = process.env.EXPO_PUBLIC_API_URL!;

async function authedFetch(path: string, options: RequestInit = {}) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const apiClient = {
  get: (path: string) => authedFetch(path, { method: "GET" }),
  post: (path: string, body: unknown) =>
    authedFetch(path, { method: "POST", body: JSON.stringify(body) }),
  patch: (path: string, body: unknown) =>
    authedFetch(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path: string) => authedFetch(path, { method: "DELETE" })
};
