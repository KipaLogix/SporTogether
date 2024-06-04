import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Keyboard, Alert } from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker, Region } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Sport } from '../interfaces/Sport';

interface Props {
  isVisible: boolean, 
  onClose: () => void, 
  onCreate: Function, 
  sports: Sport[], 
  userId: string | undefined,
  userLocation: any,
}

const CreateEvent = ({ isVisible, onClose, onCreate, sports, userId, userLocation }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [sportId, setSportId] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [locationSet, setLocationSet] = useState(false);
  const defaultLocation = { latitude: 0, longitude: 0 };
  const [markerLocation, setMarkerLocation] = useState(userLocation || defaultLocation);
  const [showMap, setShowMap] = useState(true);

  const handleCreatePress = () => {
    if (!title || !description || !date || !sportId || !locationSet) {
      Alert.alert(
        "Incomplete Fields", 
        "Please fill in all fields and set a location!", 
        [
          {
            text: "OK", 
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
      return;
    }
    onCreate({
      title,
      description,
      date,
      sportId,
      longitude: markerLocation.longitude,
      latitude: markerLocation.latitude,
      userId,
    });
    setTitle('');
    setDescription('');
    setDate(null);
    setSportId('');
    setMarkerLocation(userLocation);
    setLocationSet(false);
    onClose();
  };

  const closeWindow = () => {
    setTitle('');
    setDescription('');
    setDate(null);
    setSportId('');
    setMarkerLocation(userLocation);
    setLocationSet(false);
    onClose();
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setShowMap(false));
  
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setShowMap(true));
  
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLocationPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerLocation({
      latitude,
      longitude,
    });
    setLocationSet(true);
  };


  return (
    <Modal isVisible={isVisible} onBackdropPress={closeWindow} animationIn="zoomIn" animationOut="zoomOut">
      <View style={styles.container}>
        <Text style={styles.title}>Create Event</Text>
        <TouchableOpacity style={styles.closeButton} onPress={closeWindow}>
          <Icon name="times" size={20} color="#FFF" />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
        <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
        <Text style={styles.dateTime} onPress={() => setShowDatePicker(true)} >
          {date !== null
            ? `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}` 
            : 'Select Date & Time'}
        </Text>
        {showDatePicker && (
          <DateTimePicker 
            value={date || new Date()}
            mode="date"
            minimumDate={new Date()}
            maximumDate={new Date(Date.now() + 14*24*60*60*1000)}
            onChange={(event, selected) => {
              if (event.type === 'dismissed') {
                setShowDatePicker(false);
                return;
              }
              const currentDate = selected || date;
              setDate(currentDate);
              setShowDatePicker(false);
              setShowTimePicker(true);
            }} 
          />
        )}
        {showTimePicker && (
          <DateTimePicker 
            value={date || new Date()} 
            mode="time"
            onChange={(event, selectedTime) => {
              if (event.type === 'dismissed') {
                setShowTimePicker(false);
                setShowDatePicker(false);
                return;
              }
              const currentTime = selectedTime || date!;
              const currentHour = currentTime.getHours();
              const currentMinutes = currentTime.getMinutes();

              const isToday = date!.getDate() === new Date().getDate() &&
              date!.getMonth() === new Date().getMonth() &&
              date!.getFullYear() === new Date().getFullYear();

              if (isToday && (currentHour < new Date().getHours() || (currentHour === new Date().getHours() && currentMinutes < new Date().getMinutes()))) {
                Alert.alert(
                  "Invalid Time", 
                  "Please select a time in the future!", 
                  [
                    {
                      text: "OK", 
                    },
                  ],
                  { cancelable: false }
                );
                setShowTimePicker(false);
                setShowDatePicker(false);
                setDate(null);
                return;
              }

              setDate(currentTime);
              setShowTimePicker(false);
            }} 
          />
        )}
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={(_value, index) => {
            if (index > 0) {
              setSportId(sports[index - 1].id);
            }
          }}
          items={sports.map((sport) => ({ label: sport.sport, value: sport.id }))}
          placeholder={{ label: "Select a sport...", value: null}}
        />
        {userLocation ? (
          showMap && (
            <MapView style={styles.map} onPress={handleLocationPress} region={userLocation}>
              {markerLocation && <Marker coordinate={markerLocation} />}
            </MapView>
          )
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        {locationSet && <Text style={styles.locationSet}>Location set ✔️</Text>}
        <Button title="Create Event" onPress={handleCreatePress} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    alignSelf: 'center',
    width: '100%',
    maxHeight: '100%', 
  },
  map: {
    height: 200,
    marginBottom: 10,
  },
  locationSet: {
    backgroundColor: 'lightgreen',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  comboBox: {
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff4d4d',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateTime: {
    backgroundColor: '#ffffff', 
    borderColor: '#add8e6', 
    borderWidth: 2,
    borderRadius: 10,
    padding: 10, 
    color: '#4682b4', 
    fontSize: 18, 
    fontWeight: '500', 
    textAlign: 'center', 
    marginBottom: 10,
    marginTop: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  placeholder: {
    color: '#808080',
  },
  viewContainer: {
    marginBottom: 10,
    backgroundColor: '#d3d3d3',
  },
});

export default CreateEvent;