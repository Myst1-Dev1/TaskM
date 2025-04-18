import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        width:'100%', 
        height:50, 
        maxHeight:50, 
        backgroundColor:colors.green[500], 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
    },
    title: {
        fontSize:22,
        fontFamily:fontFamily.bold,
        color:'#fff',
    }
})