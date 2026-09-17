import { tmdb } from '@/api/tmdb';
import type {
  Genre,
  HomeFeed,
  Movie,
  MovieDetails,
  PaginatedResponse,
  SearchFilters,
} from '@/types/movie';

const LANGUAGE = 'en-US';

export const movieKeys = {
  all: ['movies'] as const,
  feed: (feed: HomeFeed) => [...movieKeys.all, 'feed', feed] as const,
  search: (filters: Omit<SearchFilters, 'query'> & { query: string }) =>
    [...movieKeys.all, 'search', filters] as const,
  detail: (id: number) => [...movieKeys.all, 'detail', id] as const,
  genres: ['genres'] as const,
};

export async function fetchMovieFeed(
  feed: HomeFeed,
  page: number,
): Promise<PaginatedResponse<Movie>> {
  const path = feed === 'trending' ? '/trending/movie/day' : '/movie/popular';
  const { data } = await tmdb.get<PaginatedResponse<Movie>>(path, {
    params: { language: LANGUAGE, page },
  });
  return data;
}

export async function fetchSearchMovies(
  query: string,
  page: number,
  year: number | null,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await tmdb.get<PaginatedResponse<Movie>>('/search/movie', {
    params: {
      language: LANGUAGE,
      query,
      page,
      include_adult: false,
      ...(year ? { year } : {}),
    },
  });
  return data;
}

export async function fetchDiscoverMovies(
  filters: SearchFilters,
  page: number,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await tmdb.get<PaginatedResponse<Movie>>('/discover/movie', {
    params: {
      language: LANGUAGE,
      page,
      include_adult: false,
      sort_by: filters.sortBy,
      ...(filters.genreId ? { with_genres: filters.genreId } : {}),
      ...(filters.year ? { primary_release_year: filters.year } : {}),
      ...(filters.minRating ? { 'vote_average.gte': filters.minRating } : {}),
      ...(filters.sortBy === 'vote_average.desc' ? { 'vote_count.gte': 80 } : {}),
    },
  });
  return data;
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const { data } = await tmdb.get<MovieDetails>(`/movie/${id}`, {
    params: {
      language: LANGUAGE,
      append_to_response: 'credits',
    },
  });
  return data;
}

export async function fetchGenres(): Promise<Genre[]> {
  const { data } = await tmdb.get<{ genres: Genre[] }>('/genre/movie/list', {
    params: { language: LANGUAGE },
  });
  return data.genres;
}
