import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  Theme,
} from '@react-navigation/native';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ColorScheme = 'light' | 'dark';

export type AppColors = Theme['colors'] & {
  muted: string;
  surface: string;
  chip: string;
  chipText: string;
  chipActive: string;
  chipActiveText: string;
  rating: string;
  overlay: string;
  skeleton: string;
};

export type AppTheme = Theme & {
  colors: AppColors;
};

export const lightTheme: AppTheme = {
  ...NavigationLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    primary: '#C45C26',
    background: '#F4F0EA',
    card: '#FFFCF7',
    text: '#1C1916',
    border: '#E4DCD0',
    notification: '#C45C26',
    muted: '#6F675E',
    surface: '#EFE8DC',
    chip: '#EFE8DC',
    chipText: '#3F3A34',
    chipActive: '#C45C26',
    chipActiveText: '#FFFFFF',
    rating: '#C9A227',
    overlay: 'rgba(18, 14, 10, 0.55)',
    skeleton: '#E4DCD0',
  },
};

export const darkTheme: AppTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: '#E08A4A',
    background: '#121212',
    card: '#1C1C1E',
    text: '#F4F1EA',
    border: '#2C2C2E',
    notification: '#E08A4A',
    muted: '#A39B91',
    surface: '#242426',
    chip: '#2A2A2C',
    chipText: '#E7E1D6',
    chipActive: '#E08A4A',
    chipActiveText: '#1A120C',
    rating: '#E8C547',
    overlay: 'rgba(0, 0, 0, 0.55)',
    skeleton: '#2A2A2C',
  },
};

export function getAppTheme(scheme: ColorScheme): AppTheme {
  return scheme === 'dark' ? darkTheme : lightTheme;
}
