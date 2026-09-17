import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails, movieKeys } from '@/api/movies';
import { getErrorMessage } from '@/api/tmdb';

export function useMovieDetails(movieId: number) {
  const query = useQuery({
    queryKey: movieKeys.detail(movieId),
    queryFn: () => fetchMovieDetails(movieId),
    enabled: Number.isFinite(movieId) && movieId > 0,
  });

  return {
    ...query,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
}
