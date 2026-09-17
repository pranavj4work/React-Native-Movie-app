import { Pressable, StyleSheet, Text, View } from 'react-native';
import { posterUrl } from '@/api/tmdb';
import { RatingBadge } from '@/components/RatingBadge';
import { PosterImage } from '@/components/PosterImage';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { Movie, SavedMovie } from '@/types/movie';
import { yearFromDate } from '@/utils/format';

type MovieCardProps = {
  movie: Movie | SavedMovie;
  onPress: () => void;
};

export function MovieCard({ movie, onPress }: MovieCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${movie.title}, rating ${movie.vote_average}`}
    >
      <PosterImage uri={posterUrl(movie.poster_path)} style={styles.poster} />
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
        {movie.title}
      </Text>
      <View style={styles.meta}>
        <Text style={[styles.year, { color: colors.muted }]}>
          {yearFromDate(movie.release_date)}
        </Text>
        <RatingBadge value={movie.vote_average} compact />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  pressed: {
    opacity: 0.82,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  meta: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  year: {
    fontSize: 12,
    fontWeight: '600',
  },
});
