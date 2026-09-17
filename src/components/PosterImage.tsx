import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, View, type ImageStyle, type StyleProp } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

type PosterImageProps = {
  uri: string | null;
  style?: StyleProp<ImageStyle>;
  iconSize?: number;
};

export function PosterImage({ uri, style, iconSize = 32 }: PosterImageProps) {
  const { colors } = useAppTheme();

  if (!uri) {
    return (
      <View style={[styles.fallback, { backgroundColor: colors.surface }, style]}>
        <Ionicons name="film-outline" size={iconSize} color={colors.muted} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={[styles.image, style]}
      contentFit="cover"
      transition={200}
      accessibilityIgnoresInvertColors
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    backgroundColor: '#2A2A2C',
  },
  fallback: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
