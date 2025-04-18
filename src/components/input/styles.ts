import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        paddingHorizontal:12, 
        flexDirection:'row', 
        alignItems:'center', 
        gap:12, width:'100%', 
        height: 50, 
        borderRadius:12, 
        borderWidth:1, 
        borderColor:'#DAD5D5'
    }, 
    input: {
        width:'100%', 
        outline:'none'
    }
})