import { QueryClient, QueryFunction } from "@tanstack/react-query";

/**
 * Throws an error if the response is not ok.
 * @param {Response} res - The fetch response to check
 * @throws {Error} If response status is not ok
 */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Makes an API request with the specified method, URL, and optional data.
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} url - The API endpoint URL
 * @param {unknown} [data] - Optional data to send in the request body
 * @returns {Promise<Response>} The fetch response
 */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";

/**
 * Creates a query function for React Query with configurable 401 handling.
 * @template T - The expected return type of the query
 * @param {Object} options - Configuration options
 * @param {UnauthorizedBehavior} options.on401 - Behavior when encountering 401 status
 * @returns {QueryFunction<T>} A query function for React Query
 */
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

/**
 * Configured React Query client with default options for the application.
 * Includes settings for queries and mutations with error handling.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
