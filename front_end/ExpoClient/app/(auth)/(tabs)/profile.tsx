import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Button } from 'react-native-paper';
// import { addProfileImage, getProfileImage } from '../../../service/api/UserService';

const Profile = () => {
  const { authState, onLogout } = useAuth();
  const [selectedImage, setSelectedImage] = useState<{ localUri: string } | null>(null);



  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TouchableOpacity style={styles.avatarContainer}>

          <Text style={styles.avatar}></Text>
        </TouchableOpacity>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{authState!.user!.username}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>{authState!.user!.email}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Button>Older Events</Button>
      </TouchableOpacity>
      <TouchableOpacity>
        <Button>Edit Profile</Button>
      </TouchableOpacity>
      <TouchableOpacity>
        <Button>Settings</Button>
      </TouchableOpacity>
      <TouchableOpacity>
        <Button onPress={onLogout}>Logout</Button>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>KipaLogix</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F3',
  },
  body: {
    marginTop: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  nameContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666666',
  },
});

export default Profile;