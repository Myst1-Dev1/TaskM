import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        marginTop: -20,
        paddingHorizontal: 20,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30
    },
    months: {
        fontSize: 16,
        padding: 8,
        borderRadius: 20,
        minWidth: 36,
        textAlign: "center"
    },
    isSelected: {
        fontFamily:fontFamily.bold,
        color:colors.green[500],
        backgroundColor: '#E7FBEF'
    },
    dontSelected: {
        fontFamily:fontFamily.regular,
        color:'#333',
        backgroundColor: 'transparent'
    },
    dot: {
        width: 6, 
        height: 6, 
        borderRadius: 3, 
        backgroundColor: colors.green[500], 
        marginTop: 4 
    }
})