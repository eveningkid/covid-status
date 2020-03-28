import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function LoadingOverlay(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFCC00',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  }
});

export default LoadingOverlay;
