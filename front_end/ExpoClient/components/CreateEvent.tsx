import React, { useEffect, useState, useRef } from 'react';
import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const [date, setDate] = useState(new Date());
  const [sportId, setSportId] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [locationSet, setLocationSet] = useState(false);
  const defaultLocation = { latitude: 0, longitude: 0 };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markerLocation, setMarkerLocation] = useState(userLocation || defaultLocation);

  const handleCreatePress = () => {
    onCreate({
      title,
      description,
      date,
      sportId,
      longitude: markerLocation.longitude,
      latitude: markerLocation.latitude,
      userId,
    });
    onClose();
  };

  const handleLocationPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerLocation({
      latitude,
      longitude,
    });
    setLocationSet(true);
  };


  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} animationIn="zoomIn" animationOut="zoomOut">
      <View style={styles.container}>
        <Text style={styles.title}>Create Event</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="times" size={20} color="#FFF" />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
        <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        <Text style={styles.dateTime}>{selectedDate.toLocaleDateString()} {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} </Text>
        {showDatePicker && (
          <DateTimePicker 
            value={date}
            mode="date" 
            onChange={(_event, selectedDate) => {
              const currentDate = selectedDate || date;
              setDate(currentDate);
              setSelectedDate(currentDate);
              setShowDatePicker(false);
              setShowTimePicker(true);
            }} 
          />
        )}
        {showTimePicker && (
          <DateTimePicker 
            value={time} 
            mode="time"
            onChange={(_event, selectedTime) => {
              const currentTime = selectedTime || time;
              setTime(currentTime);
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
          <MapView style={styles.map} onPress={handleLocationPress} region={userLocation}>
            {markerLocation && <Marker coordinate={markerLocation} />}
          </MapView>
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