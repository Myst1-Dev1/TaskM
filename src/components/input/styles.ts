import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DAD5D5',
      },
      icon: {
        marginRight: 12,
      },      
    input: {
        flex: 1,
        height: '100%',
        paddingVertical: 0,
      }      
})