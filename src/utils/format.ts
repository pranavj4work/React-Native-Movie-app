import type { Movie, SavedMovie } from '@/types/movie';

export function yearFromDate(date?: string): string {
  if (!date || date.length < 4) {
    return 'TBA';
  }
  return date.slice(0, 4);
}

export function formatRating(value: number): string {
  if (!value) {
    return 'N/A';
  }
  return value.toFixed(1);
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes) {
    return '—';
  }
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (!hours) {
    return `${remaining}m`;
  }
  return `${hours}h ${remaining}m`;
}

export function uniqueMovies<T extends { id: number }>(movies: T[]): T[] {
  const seen = new Set<number>();
  return movies.filter((movie) => {
    if (seen.has(movie.id)) {
      return false;
    }
    seen.add(movie.id);
    return true;
  });
}

type SaveableMovie = Pick<
  Movie,
  'id' | 'title' | 'poster_path' | 'backdrop_path' | 'release_date' | 'vote_average' | 'overview'
> & {
  genre_ids?: number[];
  genres?: { id: number }[];
};

export function toSavedMovie(movie: SaveableMovie): SavedMovie {
  const genreIds = movie.genre_ids?.length
    ? movie.genre_ids
    : movie.genres?.map((genre) => genre.id) ?? [];

  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    overview: movie.overview,
    genre_ids: genreIds,
  };
}

export const YEAR_OPTIONS = Array.from({ length: 16 }, (_, index) => {
  return new Date().getFullYear() - index;
});

export const RATING_OPTIONS = [5, 6, 7, 8] as const;
