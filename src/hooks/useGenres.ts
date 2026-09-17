import { useQuery } from '@tanstack/react-query';
import { fetchGenres, movieKeys } from '@/api/movies';

export function useGenres() {
  return useQuery({
    queryKey: movieKeys.genres,
    queryFn: fetchGenres,
    staleTime: 24 * 60 * 60 * 1000,
  });
}
