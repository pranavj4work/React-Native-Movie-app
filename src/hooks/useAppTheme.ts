import { useTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { getAppTheme, type AppTheme, type ColorScheme } from '@/theme';

export function useResolvedScheme(): ColorScheme {
  const preference = useThemeStore((state) => state.preference);
  const system = useColorScheme();
  if (preference === 'system') {
    return system === 'light' ? 'light' : 'dark';
  }
  return preference;
}

export function useResolvedTheme(): AppTheme {
  return getAppTheme(useResolvedScheme());
}

export function useAppTheme(): AppTheme {
  return useTheme() as AppTheme;
}
