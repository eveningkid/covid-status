import React from 'react';
import { StyleSheet, View } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import Text from '../Text';

function Count({ title, count }) {
  return (
    <View style={styles.container}>
      <Text style={[iOSUIKit.title3Emphasized, styles.figure]}>{count}</Text>
      <Text style={[iOSUIKit.footnote, styles.footnote]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  figure: {
    opacity: 0.8
  },
  footnote: {
    opacity: 0.5
  }
});

export default Count;
