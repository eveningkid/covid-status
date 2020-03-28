import React from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useColorScheme } from 'react-native-appearance';
import { DarkTheme } from '@react-navigation/native';
import { isDark } from '../../helpers/color';

function Modal(props, ref) {
  const scheme = useColorScheme();

  return (
    <Modalize
      ref={ref}
      handlePosition="inside"
      handleStyle={[isDark(scheme) && styles.handleDark]}
      modalStyle={[isDark(scheme) && styles.containerDark]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: DarkTheme.colors.card
  },
  handleDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
});

export default React.forwardRef(Modal);
