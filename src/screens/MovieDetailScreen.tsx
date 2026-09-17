import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { backdropUrl, posterUrl } from '@/api/tmdb';
import { CastList } from '@/components/CastList';
import { PosterImage } from '@/components/PosterImage';
import { RatingBadge } from '@/components/RatingBadge';
import { ScreenState } from '@/components/ScreenState';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { useLibraryStore } from '@/store/libraryStore';
import type { RootStackScreenProps } from '@/types/navigation';
import { formatRuntime, yearFromDate } from '@/utils/format';

export function MovieDetailScreen({ navigation, route }: RootStackScreenProps<'MovieDetail'>) {
  const { movieId } = route.params;
  const { colors } = useAppTheme();
  const { data, isPending, errorMessage, refetch } = useMovieDetails(movieId);
  const isFavorite = useLibraryStore((state) => state.isFavorite(movieId));
  const isOnWatchlist = useLibraryStore((state) => state.isOnWatchlist(movieId));
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);
  const toggleWatchlist = useLibraryStore((state) => state.toggleWatchlist);

  useLayoutEffect(() => {
    navigation.setOptions({ title: data?.title ?? 'Details' });
  }, [data?.title, navigation]);

  return (
    <ScreenState
      loading={isPending && !data}
      error={!data ? errorMessage : null}
      onRetry={() => void refetch()}
    >
      {data ? (
        <ScrollView contentContainerStyle={styles.content}>
          <View>
            <PosterImage uri={backdropUrl(data.backdrop_path)} style={styles.backdrop} />
            <View style={[styles.hero, { backgroundColor: colors.background }]}>
              <PosterImage uri={posterUrl(data.poster_path, 'w500')} style={styles.poster} />
              <View style={styles.heroCopy}>
                <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
                {data.tagline ? (
                  <Text style={[styles.tagline, { color: colors.muted }]}>{data.tagline}</Text>
                ) : null}
                <Text style={[styles.meta, { color: colors.muted }]}>
                  {yearFromDate(data.release_date)} · {formatRuntime(data.runtime)}
                </Text>
                <Text style={[styles.genres, { color: colors.muted }]}>
                  {data.genres.map((genre) => genre.name).join(' · ') || 'Uncategorized'}
                </Text>
                <RatingBadge value={data.vote_average} />
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable
              onPress={() => toggleFavorite(data)}
              style={[styles.action, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={isFavorite ? colors.primary : colors.text}
              />
              <Text style={[styles.actionLabel, { color: colors.text }]}>
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => toggleWatchlist(data)}
              style={[styles.action, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Ionicons
                name={isOnWatchlist ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={isOnWatchlist ? colors.primary : colors.text}
              />
              <Text style={[styles.actionLabel, { color: colors.text }]}>
                {isOnWatchlist ? 'In watchlist' : 'Watchlist'}
              </Text>
            </Pressable>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
          <Text style={[styles.overview, { color: colors.muted }]}>
            {data.overview || 'No overview available for this title.'}
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Cast</Text>
          {data.credits?.cast?.length ? (
            <CastList cast={data.credits.cast} />
          ) : (
            <Text style={[styles.overview, { color: colors.muted }]}>
              Cast information isn’t available.
            </Text>
          )}
        </ScrollView>
      ) : null}
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  backdrop: {
    width: '100%',
    height: 210,
  },
  hero: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 16,
    marginTop: -48,
  },
  poster: {
    width: 118,
    height: 176,
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroCopy: {
    flex: 1,
    paddingTop: 56,
    gap: 6,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  tagline: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  meta: {
    fontSize: 13,
    fontWeight: '600',
  },
  genres: {
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  action: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '800',
  },
  overview: {
    paddingHorizontal: 16,
    fontSize: 15,
    lineHeight: 22,
  },
});
