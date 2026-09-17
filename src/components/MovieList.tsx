import type { ReactElement } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  type ListRenderItem,
} from 'react-native';
import { MovieCard } from '@/components/MovieCard';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { Movie, SavedMovie } from '@/types/movie';

type MovieItem = Movie | SavedMovie;

type MovieListProps = {
  movies: MovieItem[];
  onMoviePress: (movie: MovieItem) => void;
  onEndReached?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  isFetchingNextPage?: boolean;
  ListHeaderComponent?: ReactElement | null;
  ListEmptyComponent?: ReactElement | null;
};

export function MovieList({
  movies,
  onMoviePress,
  onEndReached,
  refreshing = false,
  onRefresh,
  isFetchingNextPage = false,
  ListHeaderComponent,
  ListEmptyComponent,
}: MovieListProps) {
  const { colors } = useAppTheme();

  const renderItem: ListRenderItem<MovieItem> = ({ item }) => (
    <View style={styles.item}>
      <MovieCard movie={item} onPress={() => onMoviePress(item)} />
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      data={movies}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={styles.footer} color={colors.primary} />
        ) : null
      }
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  row: {
    gap: 12,
    marginBottom: 16,
  },
  item: {
    flex: 1,
  },
  footer: {
    marginVertical: 16,
  },
});
