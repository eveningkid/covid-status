import React from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import CountryMarker from '../CountryMarker';

function Map({ locations, setCurrentCountryCode }) {
  const { width, height } = Dimensions.get('window');

  return (
    <MapView style={{ width, height }}>
      {locations.length > 0 &&
        locations.map(location => (
          <CountryMarker
            key={location.countryCode}
            onPress={setCurrentCountryCode}
            location={location}
          />
        ))}
    </MapView>
  );
}

export default Map;
