import * as Location from 'expo-location';
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