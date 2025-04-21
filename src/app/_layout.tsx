import { Stack } from 'expo-router';
import { GestureHandlerRootView} from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";

import { 
    useFonts,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold,
    Karla_300Light,
 } from '@expo-google-fonts/karla';
import { Loading } from '@/components/loading';
import { queryClient } from '@/services/queryClient';

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Karla_300Light,
        Karla_400Regular,
        Karla_500Medium,
        Karla_600SemiBold,
        Karla_700Bold
    });

    if(!fontsLoaded) return <Loading />;

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Stack 
                    screenOptions={{ 
                        headerShown: false, 
                        contentStyle: { backgroundColor: "#fff" } 
                    }} 
                    />
                </GestureHandlerRootView>
            </QueryClientProvider>

        </>
    )
}