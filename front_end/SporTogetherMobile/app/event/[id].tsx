import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const Page = () => {
    const {id} = useLocalSearchParams<{id: string}>();
    console.log('id', id)
  return (
    <View style={styles.container}>
      <Text>Event details</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {}
});
