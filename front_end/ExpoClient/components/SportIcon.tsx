import { Sport } from "../interfaces/Sport"
import { FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text } from "react-native";

export const SportIcon = (sport: Sport, color: string, size: number = 20, withText: boolean = true) => {
    const icon_splited = sport.icon.split("/");
    const icon_provider = icon_splited[0];
    const icon_name = icon_splited[1];
    return (
        <>
            {icon_provider === 'FontAwesome5' && <FontAwesome5 name={icon_name as any} size={size} color={color} />}
            {icon_provider === 'FontAwesome6' && <FontAwesome6 name={icon_name as any} size={size} color={color} />}
            {icon_provider === 'Ionicons' && <Ionicons name={icon_name as any} size={size} color={color} />}
            {icon_provider === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={icon_name as any} size={size} color={color} />}
            {icon_provider === 'MaterialIcons' && <MaterialIcons name={icon_name as any} size={size} color={color} />}
            {withText && <Text style={styles.categoryText}>{sport.sport}</Text>}
        </>
    );
};

const styles = StyleSheet.create({
    categoryText: {
        paddingTop: 4,
        fontSize: 12,
        color: '#5E5E5E',
    },
});