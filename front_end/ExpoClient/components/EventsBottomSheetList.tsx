import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Event } from '../interfaces/Event';
import EventsList from './EventsList';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';

interface Props {
    events: Event[];
}

const EventsBottomSheetList = ({ events }: Props) => {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '100%'], []);
    const [refresh, setRefresh] = useState<number>(0);

    const onShowMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={1}
            style={styles.sheetContainer}
            handleIndicatorStyle={{ backgroundColor: Colors.grey }}
            enablePanDownToClose={false}>
            <View style={styles.contentContainer}>
                <EventsList events={events} refresh={refresh} />
                <View style={styles.absoluteView}>
                    <TouchableOpacity onPress={onShowMap} style={styles.btn}>
                        <Text style={{ color: '#fff' }}>Map</Text>
                        <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    absoluteView: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 14,
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        marginHorizontal: 'auto',
        alignItems: 'center',
    },
    sheetContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
});

export default EventsBottomSheetList;
