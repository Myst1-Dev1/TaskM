import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        marginTop:30,
        borderRadius:12,
        backgroundColor:colors.gray[100],
        padding:12,
        flexDirection:'column',
        gap:12
    },
    check: {
        width:40,
        height:40,
        borderWidth:1,
        borderColor:colors.gray[400],
        borderRadius:50
    },
    title: {
        fontSize:16,
        fontFamily:fontFamily.bold
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
        alignSelf: 'flex-start', // <- opcional, se estiver dentro de View com `alignItems: 'stretch'`
      },
    date: {
        fontSize:10,
        fontFamily:fontFamily.regular,
        color:colors.gray[600]
    }
})