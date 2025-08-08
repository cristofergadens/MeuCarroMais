import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';

export default function StatusBar() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <RNStatusBar
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      backgroundColor={colors.card}
      animated={true}
    />
  );
} 