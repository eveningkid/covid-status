import React from 'react';
import { ActivityIndicator as RNActivityIndicator } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { isDark } from '../../helpers/color';

function ActivityIndicator(props) {
  const scheme = useColorScheme();

  if (isDark(scheme)) {
    return <RNActivityIndicator color="white" />;
  }

  return <RNActivityIndicator />;
}

export default ActivityIndicator;
