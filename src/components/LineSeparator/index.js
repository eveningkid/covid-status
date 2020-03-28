import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';
import { isDark } from '../../helpers/color';

function LineSeparator() {
  const scheme = useColorScheme();

  return (
    <View style={[styles.container, isDark(scheme) && styles.containerDark]} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    margin: 10,
    marginRight: 0
  },
  containerDark: {
    backgroundColor: DarkTheme.colors.border
  }
});

export default LineSeparator;
