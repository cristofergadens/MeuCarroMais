import { Theme } from '../contexts/ThemeContext';

export const colors = {
  light: {
    primary: '#3ba4d8',
    background: '#ffffff',
    surface: '#fefefe',
    text: '#000000',
    textSecondary: '#555555',
    textMuted: '#777777',
    border: '#e0e0e0',
    card: '#fefefe',
    success: '#4CAF50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196F3',
  },
  dark: {
    primary: '#64b5f6',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    textMuted: '#888888',
    border: '#333333',
    card: '#2d2d2d',
    success: '#81c784',
    error: '#e57373',
    warning: '#ffb74d',
    info: '#64b5f6',
  },
};

export const getThemeColors = (theme: Theme) => colors[theme];

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

export const typography = {
  h1: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold' as const,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
  },
  small: {
    fontSize: 12,
  },
}; 