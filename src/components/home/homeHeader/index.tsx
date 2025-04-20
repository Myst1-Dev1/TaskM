import { Image, Text, View } from "react-native";

import { s } from "./style";
import { IconBell, IconMoon } from "@tabler/icons-react-native";

interface HomeHeaderProps {
    username:string;
}

export function HomeHeader({ username }:HomeHeaderProps) {

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
                </View>
            </View>
        </>
    )
}