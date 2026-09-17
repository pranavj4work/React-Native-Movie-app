import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

type ScreenStateProps = {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  empty?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  emptyIcon?: keyof typeof Ionicons.glyphMap;
  children?: ReactNode;
};

export function MovieGridSkeleton() {
  const { colors } = useAppTheme();

  return (
    <View style={styles.skeletonGrid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View
          key={index}
          style={[styles.skeletonCard, { backgroundColor: colors.skeleton }]}
        />
      ))}
    </View>
  );
}

export function ScreenState({
  loading = false,
  error,
  onRetry,
  empty = false,
  emptyTitle = 'Nothing here yet',
  emptyMessage = 'Try a different search or come back later.',
  emptyIcon = 'film-outline',
  children,
}: ScreenStateProps) {
  const { colors } = useAppTheme();

  if (loading) {
    return (
      <View style={styles.center}>
        <MovieGridSkeleton />
        <ActivityIndicator color={colors.primary} style={styles.spinner} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={40} color={colors.muted} />
        <Text style={[styles.title, { color: colors.text }]}>Couldn’t load movies</Text>
        <Text style={[styles.message, { color: colors.muted }]}>{error}</Text>
        {onRetry ? (
          <Pressable
            onPress={onRetry}
            style={[styles.retry, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.retryLabel, { color: colors.chipActiveText }]}>Retry</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  if (empty) {
    return (
      <View style={styles.center}>
        <Ionicons name={emptyIcon} size={40} color={colors.muted} />
        <Text style={[styles.title, { color: colors.text }]}>{emptyTitle}</Text>
        <Text style={[styles.message, { color: colors.muted }]}>{emptyMessage}</Text>
      </View>
    );
  }

  return <View style={styles.fill}>{children}</View>;
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 32,
    gap: 10,
  },
  spinner: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  retry: {
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  retryLabel: {
    fontWeight: '700',
  },
  skeletonGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 4,
  },
  skeletonCard: {
    width: '47%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
});
