import { Image, Text, View } from "react-native";

import { s } from "./style";
import { IconBell, IconMoon } from "@tabler/icons-react-native";

export function HomeHeader() {
    return (
        <>
            <View style={s.container}>
                <View style={s.userBox}>
                    <Image source={require('@/assets/imageUser.png')} style={s.image}/>
                    <Text style={s.username}>John Doe</Text>
                </View>
                <View style={s.iconsBox}>
                    <IconBell size={25} color={'#fff'} />
                    <IconMoon size={25} color={'#fff'} />
                </View>
            </View>
        </>
    )
}