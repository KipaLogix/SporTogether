import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const categories = [
    { name: 'Football', icon: 'soccer' },
    { name: 'Basketball', icon: 'basketball' },
    { name: 'Baseball', icon: 'baseball-bat' },
    { name: 'Tennis', icon: 'tennis-ball' },
    { name: 'Volleyball', icon: 'volleyball' },
    { name: 'PingPong', icon: 'table-tennis' },
    { name: 'Badminton', icon: 'badminton' },
    { name: 'Bowling', icon: 'bowling' },
    { name: 'Billiards', icon: 'billiards' },
];

interface Props {
    onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    const selectCategory = (index: number) => {
        setActiveIndex(index);
        onCategoryChanged(categories[index].name);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <View style={styles.actionRow}>
                        <Text style={styles.title}>EXPLORE</Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={styles.scrollViewContent}
                    >
                        {categories.map((category, index) => (
                            <TouchableOpacity key={index}
                                onPress={() => selectCategory(index)}
                                style={activeIndex == index ? styles.categoriesBtnActive : styles.categoriesBtn}
                                ref={(el) => itemsRef.current[index] = el}
                            >
                                <MaterialCommunityIcons size={25} name={category.icon as any}
                                    color={activeIndex == index ? '#000' : Colors.grey}
                                // style={activeIndex == index ? styles.categoryTextActive : styles.categoryText}
                                />
                                <Text style={styles.categoryText}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 100,
    },
    actionRow: {
        flexDirection: 'row',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 22,
    },
    category: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    categoryText: {
        fontSize: 12,
        color: '#5E5E5E',
    },
    categoryTextActive: {
        fontSize: 14,
        color: '#FF 385C',
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
});

export default ExploreHeader;
