// A simple in-memory cache with Time-to-Live (TTL) support.
// In a real-world application, you might use a more sophisticated solution like Redis or a dedicated library.

interface CacheItem<T> {
  value: T;
  expiry: number;
}

const cache = new Map<string, CacheItem<any>>();

/**
 * Sets a value in the cache with an optional TTL.
 * @param key The cache key.
 * @param value The value to store.
 * @param ttl Time-to-Live in milliseconds. Defaults to 5 minutes.
 */
export function setCache<T>(key: string, value: T, ttl: number = 5 * 60 * 1000): void {
  const expiry = Date.now() + ttl;
  cache.set(key, { value, expiry });
}

/**
 * Gets a value from the cache. Returns null if the key doesn't exist or has expired.
 * @param key The cache key.
 * @returns The cached value or null.
 */
export function getCache<T>(key: string): T | null {
  const item = cache.get(key);
  if (!item) {
    return null;
  }

  // Check for expiry
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }

  return item.value as T;
}

/**
 * Deletes a value from the cache.
 * @param key The cache key.
 */
export function deleteCache(key: string): void {
  cache.delete(key);
}

/**
 * Clears the entire cache.
 */
export function clearCache(): void {
  cache.clear();
}
