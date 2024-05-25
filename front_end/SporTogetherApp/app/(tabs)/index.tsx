import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Link} from "expo-router"


const Page = () => {
  return (
    <View>
        <Link href={"/(modals)/login"}> Login </Link>
        <Link href={"/(modals)/booking"}> Booking </Link>
        <Link href={"/event/1337"}> Event details </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
});
