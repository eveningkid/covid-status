import React from 'react';
import { StyleSheet, View } from 'react-native';
import Count from '../Count';

function CountryCounts({ confirmed, deaths, recovered }) {
  return (
    <View style={styles.container}>
      <Count title="confirmed" count={confirmed} />
      <Count title="recovered" count={recovered} />
      <Count title="deaths" count={deaths} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row'
  }
});

export default CountryCounts;
