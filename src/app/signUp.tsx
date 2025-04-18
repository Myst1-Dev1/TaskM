import { Image, Text, View, ScrollView } from "react-native";
import { colors, fontFamily } from "@/styles/theme";
import { IconLock, IconUser } from "@tabler/icons-react-native";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { router } from "expo-router";

export default function SignUp() {
    return (
        <>
             <ScrollView 
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <Image source={require('@/assets/Mobile login-bro.png')} style={{width:'100%', height:250, objectFit:'cover'}} />
                <Text style={{marginTop:40, fontSize:22, fontFamily:fontFamily.bold, textAlign:'center'}}>Crie sua conta e comece a gerenciar suas tarefas</Text>
                <View style={{marginTop:30, flexDirection:'column', gap:30}}>
                    <Input icon={IconUser} placeholder="Username" />
                    <Input icon={IconLock} placeholder="Senha" />
                    <Input icon={IconLock} placeholder="Confirme a Senha" />
                    <Button style={{borderRadius:6}}>
                        <Button.Title>Entrar</Button.Title>
                    </Button>
                    <View style={{
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#D3D3D3' }} />
                        <Text style={{
                            marginHorizontal: 12,
                            fontSize: 14,
                            fontFamily: fontFamily.light,
                            color: '#333',
                        }}>
                            ou continuar com
                        </Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#D3D3D3' }} />
                    </View>
                    <View style={{flexDirection:'row', gap:20, justifyContent:'center', alignItems:'center', marginTop:30,}}>
                        <Image source={require('@/assets/google-logo.png')} style={{width:40, height:40, objectFit:'cover'}} />
                        <Image source={require('@/assets/apple-logo.png')} style={{width:40, height:40, objectFit:'cover'}} />
                        <Image source={require('@/assets/facebook-logo.png')} style={{width:40, height:40, objectFit:'cover'}} />
                    </View>
                    <Text style={{textAlign:'center', fontFamily:fontFamily.regular}}>Já possui uma conta? <Text onPress={() => router.navigate('/signIn')} style={{fontFamily:fontFamily.bold, color:colors.green[600]}}>Entrar</Text></Text>
                </View>
            </ScrollView>
        </>
    )
}