import { View, Text, ListRenderItem } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from "expo-router";

interface Props {
    listings: any[];
    category: string;
}

const Listings = ({ listings: items, category }: Props) => {

    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        console.log(category);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [category]);

    const renderRow: ListRenderItem<any> = ({ item }) => (
        <Link href={`/listing/${item.id}`} >
            <View>
                <Text>GO THERE</Text>
            </View>
        </Link>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View>
                <FlatList
                    renderItem={renderRow}
                    ref={listRef}
                    data={loading ? [] : items}
                />

            </View>
        </GestureHandlerRootView>
    );
};

export default Listings;