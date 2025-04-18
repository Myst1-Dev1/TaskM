import { Text, Image, View } from "react-native";

import { colors, fontFamily } from "@/styles/theme";
import { Button } from "@/components/button";
import { router } from "expo-router";

export default function Index() {
    return (
        <>
            <View style={{flex:1, flexDirection:'column', gap:12, paddingHorizontal:20}}>
                <Image source={require('@/assets/Task-bro.png')} style={{width:'100%', height:250, objectFit:'cover'}} />
                <View style={{flex:1, flexDirection:'column', gap:12, marginTop:40}}>
                    <Text style={{fontFamily:fontFamily.bold, fontSize:22, textAlign:'center'}}>Um gerenciador de tarefas em que você pode confiar !</Text>
                    <Text style={{fontFamily:fontFamily.regular, fontSize:16, color:colors.gray[600], textAlign:'center'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</Text>
                </View>
                <Button onPress={() => router.navigate('/signIn')} style={{marginBottom:30, borderRadius:6}}>
                    <Button.Title>Começar</Button.Title>
                </Button>
            </View>
        </>
    )
}