import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export async function fetchCountryCode() {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }

  const location = await Location.getCurrentPositionAsync({});

  const geo = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  });

  return geo[0].isoCountryCode;
}
