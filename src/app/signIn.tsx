import { Alert, Image, Text, View } from "react-native";
import { colors, fontFamily } from "@/styles/theme";
import { IconLock, IconMail } from "@tabler/icons-react-native";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { router } from "expo-router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/services/firebase';

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/services/zod";

export default function SignIn() {
    const [loading, setLoading] = useState(false);

    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        resolver:zodResolver(signInSchema)
    })

    async function handleLogin(data:any) {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, data.email, data.password)
            router.navigate('/home');
            reset();
        } catch (error) {
            Alert.alert('Error', 'Falha ao fazer login.');
        } finally { 
            setLoading(false);
        }
    }

    return (
        <>
            <View style={{paddingHorizontal:20}}>
                <Image source={require('@/assets/Mobile login-bro.png')} style={{width:'100%', height:250, objectFit:'cover'}} />
                <Text style={{marginTop:40, fontSize:22, fontFamily:fontFamily.bold, textAlign:'center'}}>Bem vindo de volta</Text>
                <View style={{marginTop:30, flexDirection:'column', gap:30}}>
                    <Controller 
                        control={control}
                        name="email"
                        render={({field:{value, onChange}}) => <Input icon={IconMail} placeholder="Email" value={value} onChangeText={onChange} />}
                    />
                    {errors.email && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.email.message}</Text>}
                     <Controller 
                        control={control}
                        name="password"
                        render={({field:{value, onChange}}) => <Input icon={IconLock} placeholder="Senha" secureTextEntry value={value} onChangeText={onChange} />}
                    />
                    {errors.password && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.password.message}</Text>}
                    <Button isLoading={loading} onPress={handleSubmit(handleLogin)} style={{borderRadius:6}}>
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
                    <Text style={{textAlign:'center', fontFamily:fontFamily.regular}}>Não possui uma conta? <Text onPress={() => router.navigate('/signUp')} style={{fontFamily:fontFamily.bold, color:colors.green[600]}}>Cadastro</Text></Text>
                </View>
            </View>
        </>
    )
}