import {View, Text, FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';

import { Event } from '../interfaces/Event';
import { defaultStyles } from '../constants/Styles';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    events: Event[];
    sportCategoryId: string;
}

const EventsList = ({events, sportCategoryId} : Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        console.log('Reload listings: ', events);
        setLoading(true);

        // load from be

        setLoading(false);
    }, [sportCategoryId]);

    const renderRow: ListRenderItem<Event> = ({item}) => (
        <Link href={'/events/${item.id}'} asChild>
            <TouchableOpacity>
                <View style={styles.event}>
                    <Image source={require('../assets/images/default-event-icon.png')} style={styles.image} />
                    <TouchableOpacity style={{position: 'absolute', right: 30, top: 30}}>
                        <Ionicons name="heart-outline" size={24} color="black" />
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16, fontFamily: 'SpaceMono'}}>{item.title}</Text>
                    </View>

                    <Text style={{fontFamily: 'SpaceMono'}}>{item.userId}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={defaultStyles.container}>
            <FlatList
                data={loading ? [] : events}
                renderItem={renderRow}
                // keyExtractor={(item) => item.id}
                ref={listRef}
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
    }
})

export default EventsList;