// A simple, centralized API client using fetch.

interface ApiClientOptions extends RequestInit {
  data?: object;
}

class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function apiClient<T>(
  endpoint: string,
  { data, headers: customHeaders, ...customConfig }: ApiClientOptions = {}
): Promise<T> {
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : 'text/plain',
      ...customHeaders,
    },
    ...customConfig,
  };

  try {
    const response = await fetch(`/api/${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new ApiError(
        responseData.message || `Request failed with status ${response.status}`,
        response.status,
        responseData
      );
    }

    return responseData as T;
  } catch (error) {
    console.error('API Client Error:', error);
    // Re-throw the error so it can be caught by callers (e.g., React Query)
    throw error;
  }
}

// Export methods for different HTTP verbs for convenience
export const api = {
  get: <T>(endpoint: string, config?: ApiClientOptions) => apiClient<T>(endpoint, { ...config, method: 'GET' }),
  post: <T>(endpoint: string, data: object, config?: ApiClientOptions) => apiClient<T>(endpoint, { ...config, method: 'POST', data }),
  put: <T>(endpoint: string, data: object, config?: ApiClientOptions) => apiClient<T>(endpoint, { ...config, method: 'PUT', data }),
  delete: <T>(endpoint: string, config?: ApiClientOptions) => apiClient<T>(endpoint, { ...config, method: 'DELETE' }),
};
