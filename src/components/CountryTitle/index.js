import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import Placeholder from '../Placeholder';
import Text from '../Text';

function CountryTitle({ flag, name }) {
  const [isLoadingFlag, setIsLoadingFlag] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.flagContainer}>
        {isLoadingFlag && <Placeholder />}

        <Image
          source={{ uri: flag }}
          onLoadStart={() => setIsLoadingFlag(true)}
          onLoadEnd={() => setIsLoadingFlag(false)}
          style={styles.flagImage}
        />
      </View>

      <Text style={iOSUIKit.title3}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  flagContainer: {
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6
  },
  flagImage: {
    width: 40,
    height: 25,
    borderRadius: 3
  }
});

export default CountryTitle;
