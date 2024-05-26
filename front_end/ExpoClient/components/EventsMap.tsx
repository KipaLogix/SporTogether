import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import MapView, { Marker } from 'react-native-maps';
import { Event } from '../interfaces/Event';
import { useRouter } from 'expo-router';

interface Props {
    events: Event[];
    location: any;
}
const EventsMap = ({events, location} : Props) => {
    const router = useRouter();

    
    const onMarkerSelected = (event: Event) => {
        // TODO: Implement navigation to event details
        // router.push('/event/${event.id}'); // used to navigate to event details 
    };
    return (
        <View style={styles.container}>
            <MapView style={StyleSheet.absoluteFillObject}
                showsMyLocationButton={true}
                showsUserLocation={true}
                region={location}
                >
                    {events.map((item: Event) => (
                        <Marker 
                        key = {item.id}
                        onPress={() => onMarkerSelected(item)}
                        coordinate={{
                            latitude: item.latitude? item.latitude : 0,
                            longitude: item.longitude? item.longitude : 0
                        }
                        }>
                            <View style={styles.marker}>
                                <Text style={styles.markerText}>
                                    {/* {item.sport.} */}
                                </Text>
                            </View>
                        </Marker>
                    ))}
                </MapView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    marker: {
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 12,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerText: {
        color: 'white',
        fontSize: 10,
    }
});
export default EventsMap;