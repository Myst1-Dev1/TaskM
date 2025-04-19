import { StyleSheet } from "react-native";
import { fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        marginTop:30,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
    },
    title: {
        fontSize:24,
        fontFamily:fontFamily.bold,
        textAlign:'center'
    },
    form: {
        flexDirection:'column',
        gap:30,
        marginTop:30
    }
})