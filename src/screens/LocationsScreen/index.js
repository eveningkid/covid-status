import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ActivityIndicator from '../../components/ActivityIndicator';
import Map from '../../components/Map';
import CountryCounts from '../../components/CountryCounts';
import CountryTitle from '../../components/CountryTitle';
import Chart from '../../components/Chart';
import StatusBar from '../../components/StatusBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import Modal from '../../components/Modal';
import API from '../../helpers/api';
import { fetchCountryCode } from '../../helpers/location';
import { useSafeArea } from 'react-native-safe-area-context';

function LocationsScreen(props) {
  const [locations, setLocations] = useState([]);
  const [currentCountryCode, setCurrentCountryCode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(Date.now());
  const modalRef = useRef(null);
  const insets = useSafeArea();

  function onToggleModal() {
    // NOTE: Trick that doesn't block the UI thread when
    // toggling the modal
    setTimeout(() => setIsModalOpen(!isModalOpen), 150);
  }

  function updateLocations() {
    return API.fetchLocations()
      .then(setLocations)
      .finally(() => setLastUpdatedTime(Date.now()));
  }

  useEffect(() => {
    fetchCountryCode().then(setCurrentCountryCode);
    updateLocations();
  }, []);

  const selectedLocation =
    currentCountryCode &&
    locations.find(location => location.countryCode === currentCountryCode);

  return (
    <View style={styles.container}>
      <StatusBar forceLightContent={isModalOpen} />

      {locations.length === 0 && <LoadingOverlay />}

      <Map
        locations={locations}
        setCurrentCountryCode={setCurrentCountryCode}
      />

      <Modal
        ref={modalRef}
        alwaysOpen={120 + insets.top}
        onPositionChange={onToggleModal}
      >
        {locations.length > 0 && currentCountryCode ? (
          <View style={styles.modalContainer}>
            <CountryTitle
              flag={selectedLocation.flag}
              name={selectedLocation.country}
            />

            <CountryCounts
              confirmed={selectedLocation.counts.confirmed}
              recovered={selectedLocation.counts.recovered}
              deaths={selectedLocation.counts.deaths}
            />

            <Chart
              country={selectedLocation.country}
              today={selectedLocation.today}
              criticalCases={selectedLocation.counts.critical}
              statsPerMillion={selectedLocation.statsPerMillion}
              updatedAt={lastUpdatedTime}
            />
          </View>
        ) : (
          <View style={styles.modalContainerLoading}>
            <ActivityIndicator />
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingVertical: 30
  },
  modalContainerLoading: {
    flex: 1,
    padding: 20,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LocationsScreen;
