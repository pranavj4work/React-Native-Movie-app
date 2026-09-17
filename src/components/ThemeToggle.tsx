import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useThemeStore } from '@/store/themeStore';
import type { ThemePreference } from '@/theme';

const OPTIONS: { label: string; value: ThemePreference; hint: string }[] = [
  { label: 'System', value: 'system', hint: 'Match device setting' },
  { label: 'Light', value: 'light', hint: 'Always use light theme' },
  { label: 'Dark', value: 'dark', hint: 'Always use dark theme' },
];

export function ThemeToggle() {
  const { colors } = useAppTheme();
  const preference = useThemeStore((state) => state.preference);
  const setPreference = useThemeStore((state) => state.setPreference);

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {OPTIONS.map((option, index) => {
        const selected = preference === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => setPreference(option.value)}
            style={[
              styles.row,
              index < OPTIONS.length - 1 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View>
              <Text style={[styles.label, { color: colors.text }]}>{option.label}</Text>
              <Text style={[styles.hint, { color: colors.muted }]}>{option.hint}</Text>
            </View>
            <View
              style={[
                styles.radio,
                { borderColor: selected ? colors.primary : colors.muted },
              ]}
            >
              {selected ? (
                <View style={[styles.radioDot, { backgroundColor: colors.primary }]} />
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  row: {
    minHeight: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  hint: {
    marginTop: 2,
    fontSize: 13,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
