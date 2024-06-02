import { View, Text, FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';

import { Event } from '../interfaces/Event';
import { defaultStyles } from '../constants/Styles';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface Props {
    events: Event[];
}

const EventsList = ({ events }: Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<BottomSheetFlatListMethods>(null);

    const renderRow: ListRenderItem<Event> = ({ item }) => {
        const formattedDate = format(new Date(item.date), 'PPpp');
        return (
            <Link href={`/events/${item.id}`} asChild>
                <TouchableOpacity>
                    <Animated.View style={styles.event} entering={FadeInRight} exiting={FadeOutLeft}>
                        <Image source={require('../assets/images/default-event-icon.png')} style={styles.image} />
                        <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
                            <Ionicons name="heart-outline" size={24} color="black" />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ fontSize: 16, fontFamily: 'SpaceMono' }}>{item.title}</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'SpaceMono' }}>{item.Sport!.sport}</Text>
                        </View>

                        <Text style={{ fontFamily: 'SpaceMono' }}>intiated by {item.createdBy!.username}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'SpaceMono' }}>{formattedDate}</Text>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Link>
        )
    };

    return (
        <View style={defaultStyles.container}>
            <BottomSheetFlatList
                data={loading ? [] : events}
                renderItem={renderRow}
                ref={listRef}
                ListHeaderComponent={<Text style={styles.info}>{events.length} events</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    event: {
        padding: 16,
        gap: 10,
        marginVertical: 16,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        backgroundColor: 'gray',
    },
    info: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 4,
    },
})

export default EventsList;