import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Link} from "expo-router"


const Index = () => {
  return (
    <View>
      Page
        {/* <Link href={"/(modals)/login"}> Login </Link> */}
        {/* <Link href={"/(modals)/Booking"}> Booking </Link>
        <Link href={"/event/1337"}> Event details </Link> */}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
});
