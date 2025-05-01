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
import { ThemeProvider } from '@/hooks/useThemeMode';
import { auth } from '@/services/firebase';
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Karla_300Light,
        Karla_400Regular,
        Karla_500Medium,
        Karla_600SemiBold,
        Karla_700Bold
    });

    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (!user) {
            router.replace("/signIn");
          } else {
            router.replace("/home");
            setIsAuthChecked(true);
          }
        });
      
        return unsubscribe;
      }, []);      

      if(!fontsLoaded && !isAuthChecked) return <Loading />;

    return (
        <>
            <ThemeProvider>
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
            </ThemeProvider>

        </>
    )
}