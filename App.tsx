import React from 'react';
import AppNavigator from './src/navigation';
import { ThemeProvider } from './src/contexts/ThemeContext';
import StatusBar from './src/components/StatusBar';

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar />
      <AppNavigator />
    </ThemeProvider>
  );
}
