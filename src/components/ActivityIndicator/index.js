import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  Platform
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { isDark } from '../../helpers/color';

function ActivityIndicator(props) {
  const scheme = useColorScheme();

  if (isDark(scheme)) {
    return <RNActivityIndicator color="white" />;
  }

  return Platform.select({
    android: <RNActivityIndicator color="black" />,
    ios: <RNActivityIndicator />
  });
}

export default ActivityIndicator;
