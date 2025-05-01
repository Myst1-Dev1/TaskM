import { Image, Text, View, ScrollView, Alert } from "react-native";
import { colors, fontFamily } from "@/styles/theme";
import { IconLock, IconMail, IconUser } from "@tabler/icons-react-native";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { router } from "expo-router";

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';
import { useState } from "react";

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/services/zod";

export default function SignUp() {
    const [loading, setLoading] = useState(false);

    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        resolver:zodResolver(signUpSchema)
    })

    async function handleSignUp(data:any) {
        try {
            setLoading(true);

            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const { uid } = userCredential.user;
            const { username, email } = data;

            await setDoc(doc(db, 'users', uid), {
                username,
                email,
                createdAt: new Date(),
            });

            Alert.alert('Sucesso', 'Conta criada.');

            router.navigate('/signIn');
            reset();
        } catch (error: any) {
            console.error(error);
            Alert.alert('Erro ao criar conta', error.message);
        }finally {
            setLoading(false);
        }
    }

    return (
        <>
             <ScrollView 
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <Image source={require('@/assets/Mobile login-bro.png')} style={{width:'100%', height:250, objectFit:'cover'}} />
                <Text style={{marginTop:40, fontSize:22, fontFamily:fontFamily.bold, textAlign:'center'}}>Crie sua conta e comece a gerenciar suas tarefas</Text>
                <View style={{marginTop:30, flexDirection:'column', gap:30}}>
                    <Controller 
                        name="username"
                        control={control}
                        render={({field:{value, onChange}}) => <Input icon={IconUser} placeholder="Nome de usuário" value={value} onChangeText={onChange} />}
                    />
                    {errors.username && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.username.message}</Text>}
                    
                    <Controller 
                        name="email"
                        control={control}
                        render={({field:{value, onChange}}) => <Input icon={IconMail} placeholder="Email" value={value} onChangeText={onChange} />}
                    />
                    {errors.email && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.email.message}</Text>}

                    <Controller 
                        name="password"
                        control={control}
                        render={({field:{value, onChange}}) => <Input secureTextEntry icon={IconLock} placeholder="Senha" value={value} onChangeText={onChange} />}
                    />
                    {errors.password && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.password.message}</Text>}

                    <Controller 
                        name="confirmPassword"
                        control={control}
                        render={({field:{value, onChange}}) => <Input secureTextEntry icon={IconLock} placeholder="Confirme a senha" value={value} onChangeText={onChange} />}
                    />
                    {errors.confirmPassword && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.confirmPassword.message}</Text>}

                    <Button isLoading={loading} onPress={handleSubmit(handleSignUp)} style={{borderRadius:6}}>
                        <Button.Title>Cadastrar</Button.Title>
                    </Button>
                    {/* <View style={{
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
                    </View> */}
                    {/* <View style={{flexDirection:'row', gap:20, justifyContent:'center', alignItems:'center', marginTop:30,}}>
                        <Image source={require('@/assets/google-logo.png')} style={{width:40, height:40, objectFit:'cover'}} />
                        <Image source={require('@/assets/apple-logo.png')} style={{width:40, height:40, objectFit:'cover'}} />
                        <Image source={require('@/assets/facebook-logo.png')} style={{width:40, height:40, objectFit:'cover'}} />
                    </View> */}
                    <Text style={{textAlign:'center', fontFamily:fontFamily.regular}}>Já possui uma conta? <Text onPress={() => router.navigate('/signIn')} style={{fontFamily:fontFamily.bold, color:colors.green[600]}}>Entrar</Text></Text>
                </View>
            </ScrollView>
        </>
    )
}