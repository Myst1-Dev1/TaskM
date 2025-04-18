import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        width:'100%',
        height:140,
        backgroundColor:colors.green[500],
        paddingHorizontal:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    userBox: {
        flexDirection:'row',
        alignItems:'center',
        gap:12
    },
    username: {
        fontSize:18,
        fontFamily:fontFamily.bold,
        color:'#fff'
    },
    image: {
        width:60,
        height:60,
        borderRadius:50,
        objectFit:'cover'
    },
    iconsBox: {
        flexDirection:'row',
        alignItems:'center',
        gap:12
    },
})