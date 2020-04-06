import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { isDark } from '../../helpers/color';

function StatusBar({ forceLightContent }) {
  const scheme = useColorScheme();

  return (
    <RNStatusBar
      animated
      barStyle={
        isDark(scheme) || forceLightContent ? 'light-content' : 'dark-content'
      }
    />
  );
}

export default StatusBar;
