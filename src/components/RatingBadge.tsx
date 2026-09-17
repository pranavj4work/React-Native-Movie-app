import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { formatRating } from '@/utils/format';

type RatingBadgeProps = {
  value: number;
  compact?: boolean;
};

export function RatingBadge({ value, compact = false }: RatingBadgeProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.badge,
        compact ? styles.compact : null,
        { backgroundColor: colors.surface },
      ]}
    >
      <Text style={[styles.star, { color: colors.rating }]}>★</Text>
      <Text style={[styles.value, { color: colors.text }]}>{formatRating(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  compact: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  star: {
    fontSize: 12,
  },
  value: {
    fontSize: 12,
    fontWeight: '700',
  },
});
