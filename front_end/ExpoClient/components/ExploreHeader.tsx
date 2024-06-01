import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as Haptics from 'expo-haptics';
import { getSports } from '../service/api/SportService';
import { Sport } from '../interfaces/Sport';
import { on } from 'events';

interface Props {
    onSportChanged: (category: string) => void;
    sports: Sport[];
}

const ExploreHeader = ({ onSportChanged, sports }: Props) => {
    // const [sports, setSports] = useState<Sport[]>([]);
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState<string>('');

    const GetIcon = (sport: Sport, index: string) => {
        const icon_splited = sport.icon.split("/")
        const icon_provider = icon_splited[0]
        const icon_name = icon_splited[1]
        return (
            <>
                {icon_provider === 'FontAwesome5' && <FontAwesome5 name={icon_name as any} size={20} color={activeIndex === index ? '#000' : Colors.grey} />}
                {icon_provider === 'FontAwesome6' && <FontAwesome6 name={icon_name as any} size={20} color={activeIndex === index ? '#000' : Colors.grey} />}
                {icon_provider === 'Ionicons' && <Ionicons name={icon_name as any} size={20} color={activeIndex === index ? '#000' : Colors.grey} />}
                {icon_provider === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={icon_name as any} size={20} color={activeIndex === index ? '#000' : Colors.grey} />}
                {icon_provider === 'MaterialIcons' && <MaterialIcons name={icon_name as any} size={20} color={activeIndex === index ? '#000' : Colors.grey} />}
                <Text style={styles.categoryText}>{sport.sport}</Text>
            </>
        );

    }


    const selectCategory = (index: string) => {
        if (activeIndex === index) {
            setActiveIndex('');
            onSportChanged('');
        } else {
            setActiveIndex(index);
            onSportChanged(sports.find((sport) => sport.id === index)!.id);
        }

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', height: 100 }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Text style={styles.title}>EXPLORE</Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {sports.map((sport, index) => (
                        <TouchableOpacity key={sport.id}
                            onPress={() => selectCategory(sport.id)}
                            style={activeIndex == sport.id ? styles.categoriesBtnActive : styles.categoriesBtn}
                            ref={(el) => itemsRef.current[index] = el}
                        >
                            {GetIcon(sport, sport.id)}

                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 121,
    },
    actionRow: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        paddingTop: 38,
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        paddingTop: 10,
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 30,
    },
    category: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    categoryText: {
        paddingTop: 4,
        fontSize: 12,
        color: '#5E5E5E',
    },
    categoryTextActive: {
        paddingTop: 4,
        fontSize: 14,
        color: '#FF385C',
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
