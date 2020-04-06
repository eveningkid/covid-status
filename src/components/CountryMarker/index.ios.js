import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { colorsForNumber } from '../../helpers/color';

function CountryMarker({ location, onPress }) {
  return (
    <Marker
      key={location.countryCode}
      coordinate={location.coordinates}
      onPress={() => onPress(location.countryCode)}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colorsForNumber(location.counts.confirmed)
              .background,
            borderColor: colorsForNumber(location.counts.confirmed).border,
            width: Math.min(Math.max(20, location.counts.confirmed / 2), 40),
            height: Math.min(Math.max(20, location.counts.confirmed / 2), 40)
          }
        ]}
      />
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 100,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default React.memo(CountryMarker, (prevProps, nextProps) => {
  return prevProps.countryCode !== nextProps.countryCode;
});
