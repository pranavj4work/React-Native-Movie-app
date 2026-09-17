import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { profileUrl } from '@/api/tmdb';
import { PosterImage } from '@/components/PosterImage';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { CastMember } from '@/types/movie';

type CastListProps = {
  cast: CastMember[];
};

function CastCard({ member }: { member: CastMember }) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.card}>
      <PosterImage
        uri={profileUrl(member.profile_path)}
        style={styles.avatar}
        iconSize={22}
      />
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
        {member.name}
      </Text>
      <Text style={[styles.character, { color: colors.muted }]} numberOfLines={2}>
        {member.character}
      </Text>
    </View>
  );
}

export function CastList({ cast }: CastListProps) {
  const topCast = cast.slice(0, 12);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {topCast.map((member) => (
        <CastCard key={member.id} member={member} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingRight: 8,
    gap: 12,
  },
  card: {
    width: 96,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
  },
  name: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '700',
  },
  character: {
    marginTop: 2,
    fontSize: 12,
  },
});
