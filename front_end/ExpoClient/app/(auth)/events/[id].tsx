import { View, Text, StyleSheet, Dimensions, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Animated from 'react-native-reanimated'
import Colors from '../../../constants/Colors';
import { getEventById } from '../../../service/api/EventService';
import { Event } from '../../../interfaces/Event';

const EventPage = () => {
    const [event, setEvent] = useState<Event | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log('Event id: ', id);

    useEffect(() => {
        if (id) {
            getEventById(id)
                .then((event) => {
                    console.log('Event useEffect: ', event);
                    setEvent(event);
                })
                .catch((error) => {
                    console.error('Error fetching event: ', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Event not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.ScrollView style={{ height: 100 }}>
                <Animated.Image source={require('../../../assets/images/default-event-icon.png')} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{event.title} aaaa</Text>
                    <Text style={styles.location}>
                        {event.latitude} · {event.longitude}
                    </Text>
                    {/* <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
            {listing.bathrooms} bathrooms
          </Text> */}
                    {/* <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews} reviews
            </Text>
          </View> */}
                    <View style={styles.divider} />

                    <View style={styles.hostView}>
                        {/* <Image source={{ uri: listing.host_picture_url }} style={styles.host} /> */}

                        <View>
                            {/* <Text style={{ fontWeight: '500', fontSize: 16 }}>Initiated by {event.createdBy.username}</Text> */}
                            {/* <Text>Host since {listing.host_since}</Text> */}
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.description}>{event.description}</Text>
                </View>
            </Animated.ScrollView>
        </View>
    )
};

const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        height: IMG_HEIGHT,
        width,
    },
    infoContainer: {
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'SpaceMono',
    },
    location: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: 'SpaceMono',
    },
    rooms: {
        fontSize: 16,
        color: Colors.grey,
        marginVertical: 4,
        fontFamily: 'SpaceMono',
    },
    ratings: {
        fontSize: 16,
        fontFamily: 'SpaceMono',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.grey,
        marginVertical: 16,
    },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },
    hostView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    description: {
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'SpaceMono',
    }
})

export default EventPage;