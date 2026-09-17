import axios from 'axios';

const TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

export const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  },
});

export function hasTmdbToken(): boolean {
  return Boolean(TOKEN && TOKEN !== 'your_tmdb_read_access_token_here');
}

export function posterUrl(
  path: string | null,
  size: 'w185' | 'w342' | 'w500' | 'w780' = 'w342',
): string | null {
  if (!path) {
    return null;
  }
  return `${IMAGE_BASE}/${size}${path}`;
}

export function backdropUrl(path: string | null): string | null {
  if (!path) {
    return null;
  }
  return `${IMAGE_BASE}/w780${path}`;
}

export function profileUrl(path: string | null): string | null {
  if (!path) {
    return null;
  }
  return `${IMAGE_BASE}/w185${path}`;
}

export function getErrorMessage(error: unknown): string {
  if (!hasTmdbToken()) {
    return 'Add your TMDB access token to a .env file as EXPO_PUBLIC_TMDB_ACCESS_TOKEN, then restart Expo.';
  }

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'No internet connection. Check your network and try again.';
    }
    if (error.response.status === 401 || error.response.status === 403) {
      return 'TMDB token is missing or invalid. Update EXPO_PUBLIC_TMDB_ACCESS_TOKEN and restart Expo.';
    }
    const apiMessage = (error.response.data as { status_message?: string } | undefined)
      ?.status_message;
    return apiMessage ?? 'Something went wrong. Please try again.';
  }

  return 'Something went wrong. Please try again.';
}
