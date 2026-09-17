import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMovieFeed, movieKeys } from '@/api/movies';
import { getErrorMessage } from '@/api/tmdb';
import type { HomeFeed } from '@/types/movie';
import { uniqueMovies } from '@/utils/format';

export function useMovies(feed: HomeFeed) {
  const query = useInfiniteQuery({
    queryKey: movieKeys.feed(feed),
    queryFn: ({ pageParam }) => fetchMovieFeed(feed, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages && lastPage.page < 500
        ? lastPage.page + 1
        : undefined,
  });

  const movies = uniqueMovies(query.data?.pages.flatMap((page) => page.results) ?? []);

  return {
    ...query,
    movies,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
}
