import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import LocationsScreen from './src/screens/LocationsScreen';

export default function App() {
  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <LocationsScreen />
      </SafeAreaProvider>
    </AppearanceProvider>
  );
}
