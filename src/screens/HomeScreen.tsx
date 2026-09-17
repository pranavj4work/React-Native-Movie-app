import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MovieList } from '@/components/MovieList';
import { ScreenState } from '@/components/ScreenState';
import { SegmentedControl } from '@/components/SegmentedControl';
import { useMovies } from '@/hooks/useMovies';
import type { HomeFeed, Movie } from '@/types/movie';
import type { TabScreenProps } from '@/types/navigation';

const FEED_OPTIONS: { label: string; value: HomeFeed }[] = [
  { label: 'Trending', value: 'trending' },
  { label: 'Popular', value: 'popular' },
];

export function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  const [feed, setFeed] = useState<HomeFeed>('trending');
  const {
    movies,
    isPending,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    errorMessage,
  } = useMovies(feed);

  const onMoviePress = useCallback(
    (movie: Movie) => {
      navigation.navigate('MovieDetail', { movieId: movie.id });
    },
    [navigation],
  );

  const showInitial = isPending && movies.length === 0;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <SegmentedControl options={FEED_OPTIONS} value={feed} onChange={setFeed} />
      </View>
      <ScreenState
        loading={showInitial}
        error={movies.length === 0 ? errorMessage : null}
        onRetry={() => void refetch()}
        empty={!showInitial && !errorMessage && movies.length === 0}
        emptyTitle="No movies yet"
        emptyMessage="Pull to refresh or try the other feed."
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
    paddingBottom: 12,
  },
});
