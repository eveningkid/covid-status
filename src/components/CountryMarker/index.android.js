import React from 'react';
import { Marker } from 'react-native-maps';
import { colorsForNumber } from '../../helpers/color';

function CountryMarker({ location, onPress }) {
  return (
    <Marker
      key={location.countryCode}
      coordinate={location.coordinates}
      onPress={() => onPress(location.countryCode)}
      pinColor={colorsForNumber(location.counts.confirmed).background}
    />
  );
}

export default React.memo(CountryMarker, (prevProps, nextProps) => {
  return prevProps.countryCode !== nextProps.countryCode;
});
