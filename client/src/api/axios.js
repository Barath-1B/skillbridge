import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Endpoints where a 401 is a real answer, not an expired access token.
const NO_REFRESH_URLS = ['/auth/refresh', '/auth/login', '/auth/register'];

// Single-flight: concurrent 401s share one refresh request instead of
// stampeding /auth/refresh (rotation would 401 every call but the first).
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config, response } = error;
    if (
      !response ||
      response.status !== 401 ||
      !config ||
      config._retry ||
      NO_REFRESH_URLS.some((url) => config.url?.includes(url))
    ) {
      return Promise.reject(error);
    }

    if (!refreshPromise) {
      refreshPromise = api.post('/auth/refresh').finally(() => {
        refreshPromise = null;
      });
    }

    return refreshPromise.then(
      () => api({ ...config, _retry: true }),
      // Refresh failed (no/expired refresh token) — surface the original 401.
      () => Promise.reject(error)
    );
  }
);

export default api;
