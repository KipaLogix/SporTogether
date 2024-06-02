import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import MapView, { Marker } from 'react-native-maps';
import { Event } from '../interfaces/Event';
import { useRouter } from 'expo-router';

interface Props {
    events: Event[];
    location: any;
}
const EventsMap = ({ events, location }: Props) => {
    const router = useRouter();


    const onMarkerSelected = (event: Event) => {
        // TODO: Implement navigation to event details
        // router.push('/event/${event.id}'); // used to navigate to event details 
    };
    return (
        <MapView style={{ position: 'absolute', top: 21, left: 0, right: 0, bottom: 64 }}
            showsMyLocationButton={true}
            showsUserLocation={true}
            region={location}
        >
            {events.map((item: Event) => (
                <Marker
                    key={item.id}
                    onPress={() => onMarkerSelected(item)}
                    coordinate={{
                        latitude: item.latitude ? item.latitude : 0,
                        longitude: item.longitude ? item.longitude : 0
                    }
                    }>
                    <View style={styles.marker}>
                        <Text style={styles.markerText}>
                            {item.title}
                        </Text>
                    </View>
                </Marker>
            ))}
        </MapView>
    );
}
const styles = StyleSheet.create({
    marker: {
        backgroundColor: '#000',
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