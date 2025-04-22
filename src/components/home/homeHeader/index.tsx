import { Image, Text, View } from "react-native";

import { s } from "./style";
import { IconBell, IconLogout, IconMoon, IconSun } from "@tabler/icons-react-native";
import { auth } from "@/services/firebase";
import { router } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { useThemeMode } from "@/hooks/useThemeMode";

export function HomeHeader() {
    const { username, isFetching } = useUser();
    const { toggleTheme, mode } = useThemeMode();

    async function handleSignOut() {
        await auth.signOut();

        router.navigate('/signIn');
    }

    return (
        <>
            <View style={s.container}>
                <View style={s.userBox}>
                    <Image source={require('@/assets/profileUserIcon.png')} style={s.image}/>
                    <Text style={s.username}>{isFetching ? 'Carregando...' : username}</Text>
                </View>
                <View style={s.iconsBox}>
                    {/* <IconBell size={25} color={'#fff'} /> */}
                    {mode === 'dark' ? (
                        <IconSun onPress={toggleTheme} size={25} color={'#fff'} />
                    ) : (
                        <IconMoon onPress={toggleTheme} size={25} color={'#fff'} />
                    )}
                    <IconLogout onPress={handleSignOut} size={25} color={'#fff'} />
                </View>
            </View>
        </>
    )
}