import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { DarkTheme } from '@react-navigation/native';
import { isDark } from '../../helpers/color';

function Text({ style: currentStyles, importantStyle, ...props }) {
  const scheme = useColorScheme();
  const style = [];

  if (currentStyles) {
    if (Array.isArray(currentStyles)) {
      style.push(...currentStyles);
    } else {
      style.push(currentStyles);
    }
  }

  if (isDark(scheme)) {
    // NOTE: Should come last as it should overrides any other styling
    style.push(styles.containerDark);
  }

  if (importantStyle) {
    style.push(importantStyle);
  }

  return <RNText style={style} {...props} />;
}

const styles = StyleSheet.create({
  containerDark: {
    color: DarkTheme.colors.text
  }
});

export default Text;
