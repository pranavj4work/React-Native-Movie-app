import { useCallback, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { FilterBar } from '@/components/FilterBar';
import { MovieList } from '@/components/MovieList';
import { ScreenState } from '@/components/ScreenState';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useGenres } from '@/hooks/useGenres';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import type { Movie, SearchFilters } from '@/types/movie';
import type { TabScreenProps } from '@/types/navigation';

const INITIAL_FILTERS: SearchFilters = {
  query: '',
  genreId: null,
  year: null,
  minRating: null,
  sortBy: 'popularity.desc',
};

export function SearchScreen({ navigation }: TabScreenProps<'Search'>) {
  const { colors } = useAppTheme();
  const [filters, setFilters] = useState<SearchFilters>(INITIAL_FILTERS);
  const { data: genres = [] } = useGenres();
  const {
    movies,
    enabled,
    isPending,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    errorMessage,
    debouncedQuery,
  } = useSearchMovies(filters);

  const onMoviePress = useCallback(
    (movie: Movie) => {
      navigation.navigate('MovieDetail', { movieId: movie.id });
    },
    [navigation],
  );

  const showIdle = !enabled;
  const showInitial = enabled && isPending && movies.length === 0;
  const showEmpty =
    enabled && !showInitial && !errorMessage && movies.length === 0 && !isFetchingNextPage;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TextInput
          value={filters.query}
          onChangeText={(query) => setFilters((current) => ({ ...current, query }))}
          placeholder="Search movies"
          placeholderTextColor={colors.muted}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          clearButtonMode="while-editing"
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
        />
        <FilterBar
          filters={filters}
          genres={genres}
          onChange={setFilters}
          showSort={!debouncedQuery}
        />
      </View>

      {showIdle ? (
        <ScreenState
          empty
          emptyIcon="search-outline"
          emptyTitle="Find a movie"
          emptyMessage="Type a title or pick a genre, year, or rating to browse TMDB."
        />
      ) : (
        <ScreenState
          loading={showInitial}
          error={movies.length === 0 ? errorMessage : null}
          onRetry={() => void refetch()}
          empty={showEmpty}
          emptyTitle="No results"
          emptyMessage="Try another title or loosen the filters."
        >
          <MovieList
            movies={movies}
            onMoviePress={(movie) => onMoviePress(movie as Movie)}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                void fetchNextPage();
              }
            }}
            isFetchingNextPage={isFetchingNextPage}
            refreshing={isRefetching && !isPending}
            onRefresh={() => void refetch()}
          />
        </ScreenState>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 12,
  },
});
