import { StyleSheet } from "react-native";
import { colors } from '@/styles/theme';

export const s = StyleSheet.create({
    container: {
      marginTop: 30,
      borderRadius: 12,
      // backgroundColor: colors.gray[100],
      padding: 12,
      flexDirection: 'column',
      gap: 12,
    },
    skeleton: {
      // backgroundColor: colors.gray[300],
      borderRadius: 6,
    },
    checkSkeleton: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: colors.gray[400],
        borderRadius: 50,
      },
    titleSkeleton: {
      width: '60%',
      height: 20,
    },
    descriptionSkeleton: {
      width: '80%',
      height: 14,
    },
    typeSkeleton: {
      width: 50,
      height: 18,
    },
    dateSkeleton: {
      width: '40%',
      height: 12,
    },
});
  