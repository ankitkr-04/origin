/**
 * Fetches JSON from `input`, returning `null` on network failure or a
 * non-2xx response. Callers decide what a `null` result means (fallback
 * value, rethrow, etc).
 */
export async function safeFetchJson<T>(
  input: string,
  init?: RequestInit,
): Promise<T | null> {
  const response = await fetch(input, init).catch(() => null);

  if (!response?.ok) {
    return null;
  }

  return (await response.json()) as T;
}