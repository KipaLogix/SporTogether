import * as Location from 'expo-location';
import axios from 'axios';
export const getPermissionAndLocation = async () : Promise<Location.LocationObject | null> => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return null;
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    console.log('Got permission forLocation:', currentLocation);
    return currentLocation;
  };

export const getAddressFromCoordinates = async (lat: number, lon: number): Promise<string> => {
  const apiKey = 'AIzaSyCQVA4Uv73J_una8_UGUR54VeNZS0j4sYA';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log('Input: ', lat, lon);
    if (response.data.status === 'OK') {
      console.log('Address response: ', response.data.results[0].formatted_address);
      const address = response.data.results[0].formatted_address;
      return address;
    } else {
      throw new Error('Error fetching address: ' + response.data.status + ' ' + response.data.error_message ?? '');
    }
  } catch (error) {
    throw new Error('Error fetching address: ' + error);
  }
};