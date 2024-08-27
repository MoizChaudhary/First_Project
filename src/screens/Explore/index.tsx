import React, {useState, useEffect} from 'react';
import {StyleSheet, View, PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';

const Explore = () => {
  const [region, setRegion] = useState({
    latitude: 33.729741,
    longitude: 73.036915,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [marker, setMarker] = useState({
    latitude: 33.729741,
    longitude: 73.036915,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setMarker({
            latitude,
            longitude,
          });
        },
        error => console.log(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };

    requestLocationPermission();
  }, []);

  const handleLocationSelect = (details: any) => {
    const {lat, lng} = details.geometry.location;
    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setMarker({
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search your Location Here"
        onPress={(data, details = null) => {
          console.log('----dshsgdhs', data);
          if (details) {
            handleLocationSelect(details);
          }
        }}
        fetchDetails={true}
        minLength={3}
        query={{
          key: 'AIzaSyCrgWi6FMfhXLWHtgvpz4epm0CMANJRt_Q', // Replace with your actual API key
          language: 'en',
        }}
        styles={{
          container: {
            position: 'absolute',
            top: 50,
            width: '90%',
            zIndex: 1,
            alignSelf: 'center',
          },
          textInputContainer: {
            backgroundColor: 'white',
            borderRadius: 5,
            height: 50,
            marginHorizontal: 10,
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {
            backgroundColor: 'white',
            marginHorizontal: 10,
            borderRadius: 5,
            zIndex: 1,
          },
        }}
      />
      <MapView
        style={styles.map}
        region={region}
        showsCompass={true}
        showsUserLocation={true}
        onRegionChangeComplete={setRegion}>
        <Marker coordinate={marker} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Explore;
