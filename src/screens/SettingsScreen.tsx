import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAppTheme } from '@/hooks/useAppTheme';

export function SettingsScreen() {
  const { colors } = useAppTheme();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.heading, { color: colors.text }]}>Appearance</Text>
      <ThemeToggle />

      <Text style={[styles.heading, { color: colors.text }]}>About</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>RNMovie</Text>
        <Text style={[styles.body, { color: colors.muted }]}>
          A React Native portfolio app for browsing TMDB movies, searching with filters, and
          saving a local favorites list and watchlist.
        </Text>
        <Text style={[styles.body, { color: colors.muted }]}>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </Text>
        <Pressable onPress={() => Linking.openURL('https://www.themoviedb.org')}>
          <Text style={[styles.link, { color: colors.primary }]}>themoviedb.org</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  heading: {
    marginBottom: 10,
    marginTop: 8,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
  },
  link: {
    fontSize: 14,
    fontWeight: '700',
  },
});
