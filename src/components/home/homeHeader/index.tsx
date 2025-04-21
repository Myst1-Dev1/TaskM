import { Alert, Image, Text, View } from "react-native";

import { s } from "./style";
import { IconBell, IconLogout, IconMoon } from "@tabler/icons-react-native";
import { auth } from "@/services/firebase";
import { router } from "expo-router";

interface HomeHeaderProps {
    username:string;
}

export function HomeHeader({ username }:HomeHeaderProps) {

    async function handleSignOut() {
        await auth.signOut();

        router.navigate('/signIn');
    }

    return (
        <>
            <View style={s.container}>
                <View style={s.userBox}>
                    <Image source={require('@/assets/profileUserIcon.png')} style={s.image}/>
                    <Text style={s.username}>{username}</Text>
                </View>
                <View style={s.iconsBox}>
                    <IconBell size={25} color={'#fff'} />
                    <IconMoon size={25} color={'#fff'} />
                    <IconLogout onPress={handleSignOut} size={25} color={'#fff'} />
                </View>
            </View>
        </>
    )
}