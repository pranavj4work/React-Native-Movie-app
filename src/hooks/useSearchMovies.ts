import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchDiscoverMovies, fetchSearchMovies, movieKeys } from '@/api/movies';
import { getErrorMessage } from '@/api/tmdb';
import { useDebounce } from '@/hooks/useDebounce';
import type { SearchFilters } from '@/types/movie';
import { uniqueMovies } from '@/utils/format';

export function useSearchMovies(filters: SearchFilters) {
  const debouncedQuery = useDebounce(filters.query.trim(), 300);
  const hasQuery = debouncedQuery.length > 0;
  const hasFilters =
    filters.genreId != null || filters.year != null || filters.minRating != null;
  const enabled = hasQuery || hasFilters;

  const queryFilters = {
    ...filters,
    query: debouncedQuery,
  };

  const query = useInfiniteQuery({
    queryKey: movieKeys.search(queryFilters),
    enabled,
    placeholderData: keepPreviousData,
    queryFn: ({ pageParam }) => {
      if (hasQuery) {
        return fetchSearchMovies(debouncedQuery, pageParam, filters.year);
      }
      return fetchDiscoverMovies(queryFilters, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages && lastPage.page < 500
        ? lastPage.page + 1
        : undefined,
  });

  const movies = useMemo(() => {
    const raw = uniqueMovies(query.data?.pages.flatMap((page) => page.results) ?? []);
    if (!hasQuery) {
      return raw;
    }
    return raw.filter((movie) => {
      if (filters.genreId && !movie.genre_ids.includes(filters.genreId)) {
        return false;
      }
      if (filters.minRating && movie.vote_average < filters.minRating) {
        return false;
      }
      return true;
    });
  }, [filters.genreId, filters.minRating, hasQuery, query.data]);

  return {
    ...query,
    movies,
    enabled,
    debouncedQuery,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
}
