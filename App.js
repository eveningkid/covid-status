import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import * as Sentry from 'sentry-expo';
import { SENTRY_DSN } from 'react-native-dotenv';
import LocationsScreen from './src/screens/LocationsScreen';

Sentry.init({
  dsn: SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: true
});

export default function App() {
  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <LocationsScreen />
      </SafeAreaProvider>
    </AppearanceProvider>
  );
}
