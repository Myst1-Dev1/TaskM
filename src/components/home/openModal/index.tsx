import { Alert, Modal, Text, TextInput, View } from 'react-native'

import { Button } from "@/components/button";
import { IconPlus, IconX } from "@tabler/icons-react-native";
import { useState } from 'react';

import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';

import { s } from './styles';
import { Input } from '@/components/input';
import { colors, fontFamily } from '@/styles/theme';
import { router } from 'expo-router';

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { modalSchema } from '@/services/zod';

export function OpenModal() {
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);

     const { control, reset, handleSubmit, formState: { errors } } = useForm({
        resolver:zodResolver(modalSchema)
    })

    async function handleCreateTask(data:any) {
        const user = auth.currentUser;
      
        if (!user) {
          console.warn('Usuário não está logado.');
          return;
        }
      
        try {
          setLoading(true);

          const { taskTitle, taskDescription, taskType, taskDate } = data;

          await addDoc(collection(db, 'tasks'), {
            title: taskTitle,
            description:taskDescription,
            type:taskType,
            status:false,
            createdAt: taskDate,
            done: false,
            userId: user.uid,
          });
      
          Alert.alert('Tarefa','criada com sucesso!');
          router.back();
          reset();
          
        } catch (error) {
          console.error('Erro ao criar tarefa:', error);
        } finally {
            setLoading(false);
        }
      }

    return (
        <>
            <Button onPress={() => setIsVisibleModal(true)} style={{position:'absolute', right:4, bottom:20, width:40, height:40, borderRadius:50}}>
                <Button.Icon icon={IconPlus}/>
            </Button>
            <Modal style={{flex:1}} visible={isVisibleModal}>
                <View style={s.container}>
                    <Text style={s.title}>Criar tarefa</Text>
                    <View style={s.form}>
                        <Controller 
                            name='taskTitle'
                            control={control}
                            render={({field:{value, onChange}}) => <Input placeholder='Nome da tarefa' value={value} onChangeText={onChange} />}
                        />
                        {errors.taskTitle && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.taskTitle.message}</Text>}

                        <Controller 
                            name='taskType'
                            control={control}
                            render={({field:{value, onChange}}) => <Input placeholder='Tipo de tarefa' value={value} onChangeText={onChange} />}
                        />
                        {errors.taskType && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.taskType.message}</Text>}

                        <Controller 
                            name='taskDate'
                            control={control}
                            render={({field:{value, onChange}}) => 
                                <Input
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder='Data de criação ou execução' mask={{
                                        type: 'datetime',
                                        options: { format: 'DD/MM/YYYY' }
                                    }} 
                                />
                            }
                        />
                        {errors.taskDate && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.taskDate.message}</Text>}

                        <Controller 
                            name='taskDescription'
                            control={control}
                            render={({field:{value, onChange}}) => <TextInput style={s.textArea} multiline placeholder='Descrição da tarefa' value={value} onChangeText={onChange} placeholderTextColor={colors.gray[400]} />}
                        />
                        {errors.taskDescription && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.taskDescription.message}</Text>}
                        
                        <Button isLoading={loading} onPress={handleSubmit(handleCreateTask)}>
                            <Button.Title>Enviar</Button.Title>
                        </Button>
                    </View>
                </View>
                <Button onPress={() => setIsVisibleModal(false)} style={{position:'absolute', right:20, top:12, width:40, height:40, borderRadius:50}}>
                    <Button.Icon icon={IconX}/>
                </Button>
            </Modal>
        </>
    )
}