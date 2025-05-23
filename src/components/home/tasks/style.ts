import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        marginTop:30,
        borderRadius:12,
        padding:12,
        width:'100%',
        flexDirection:'column',
        gap:12,
        position:'relative'
    },
    check: {
        width:40,
        height:40,
        borderWidth:1,
        borderColor:colors.gray[400],
        borderRadius:50
    },
    taskCompleted: {
        width:40,
        height:40,
        backgroundColor:colors.green[500],
        borderRadius:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        fontSize:16,
        fontFamily:fontFamily.bold,
        maxWidth:275
    },
    description: {
        fontSize:12,
        fontFamily:fontFamily.regular,
        color:colors.gray[600]
    },
    type: {
        paddingHorizontal: 6,
        paddingVertical:4,
        textAlign: 'center',
        backgroundColor: colors.green[300],
        borderRadius: 6,
        color:'#fff',
        alignSelf: 'flex-start', // <- opcional, se estiver dentro de View com `alignItems: 'stretch'`
      },
    date: {
        fontSize:10,
        fontFamily:fontFamily.regular,
        color:colors.gray[600]
    },
    actionsContainer:{
        marginTop:30,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    iconAction: {
        backgroundColor:colors.green[500],
        padding:8,
        borderRadius:8,
        width: 30,
        height:30,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
})