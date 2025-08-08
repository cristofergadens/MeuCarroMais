import React, { useEffect } from 'react';
import AppNavigator from './src/navigation';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import StatusBar from './src/components/StatusBar';
import { initializeFirebase } from './src/services/firebase';

export default function App() {
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <StatusBar />
        <AppNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
