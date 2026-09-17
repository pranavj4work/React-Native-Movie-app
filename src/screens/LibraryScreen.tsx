import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MovieList } from '@/components/MovieList';
import { ScreenState } from '@/components/ScreenState';
import { SegmentedControl } from '@/components/SegmentedControl';
import { useLibraryStore } from '@/store/libraryStore';
import type { SavedMovie } from '@/types/movie';
import type { TabScreenProps } from '@/types/navigation';

type LibraryTab = 'favorites' | 'watchlist';

const LIBRARY_OPTIONS: { label: string; value: LibraryTab }[] = [
  { label: 'Favorites', value: 'favorites' },
  { label: 'Watchlist', value: 'watchlist' },
];

export function LibraryScreen({ navigation }: TabScreenProps<'Library'>) {
  const [tab, setTab] = useState<LibraryTab>('favorites');
  const favorites = useLibraryStore((state) => state.favorites);
  const watchlist = useLibraryStore((state) => state.watchlist);
  const movies = tab === 'favorites' ? favorites : watchlist;

  const onMoviePress = useCallback(
    (movie: SavedMovie) => {
      navigation.navigate('MovieDetail', { movieId: movie.id });
    },
    [navigation],
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <SegmentedControl options={LIBRARY_OPTIONS} value={tab} onChange={setTab} />
      </View>
      <ScreenState
        empty={movies.length === 0}
        emptyIcon={tab === 'favorites' ? 'heart-outline' : 'bookmark-outline'}
        emptyTitle={tab === 'favorites' ? 'No favorites yet' : 'Watchlist is empty'}
        emptyMessage={
          tab === 'favorites'
            ? 'Open a movie and tap Favorite to save it here.'
            : 'Save titles you want to watch later from the detail screen.'
        }
      >
        <MovieList movies={movies} onMoviePress={(movie) => onMoviePress(movie)} />
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
