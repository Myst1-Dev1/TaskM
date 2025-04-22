import { Alert, Modal, Text, TextInput, View } from 'react-native'

import { Button } from "@/components/button";
import { IconPlus, IconX } from "@tabler/icons-react-native";
import { useState } from 'react';

import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';

import { s } from './styles';
import { Input } from '@/components/input';
import { colors, fontFamily } from '@/styles/theme';

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { modalSchema } from '@/services/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useThemeMode } from '@/hooks/useThemeMode';

import * as Notifications from 'expo-notifications';

export function OpenModal() {
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const { theme } = useThemeMode();

     const { control, reset, handleSubmit, formState: { errors } } = useForm({
        resolver:zodResolver(modalSchema)
    })

    const queryClient = useQueryClient();

    async function scheduleTaskNotification(task: {
        title: string;
        date: string;
      }) {
        const [day, month, year] = task.date.split('/').map(Number);
        const taskDate = new Date(year, month - 1, day, 9, 0);
      
        if (taskDate > new Date()) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: '📌 Tarefa de hoje!',
              body: `A tarefa "${task.title}" está marcada para hoje às 09:00.`,
              sound: true,
            },
            trigger: taskDate as unknown as Notifications.NotificationTriggerInput,
          });
      
          console.log('🔔 Notificação agendada para:', taskDate);
        } else {
          console.log('⚠️ Data já passou ou é agora — notificação não agendada.');
        }
      }

      const { mutate: createTask, isPending } = useMutation({
        mutationFn: async (data: any) => {
          const user = auth.currentUser;
      
          if (!user) {
            console.warn('Usuário não está logado.');
            return;
          }
      
          const { taskTitle, taskDescription, taskType, taskDate } = data;
      
          const docRef = await addDoc(collection(db, 'tasks'), {
            title: taskTitle,
            description: taskDescription,
            type: taskType,
            status: false,
            createdAt: taskDate,
            done: false,
            userId: user.uid,
          });
      
          await scheduleTaskNotification({
            title: taskTitle,
            date: taskDate,
          });
      
          return docRef;
        },
        onSuccess: () => {
          Alert.alert('Tarefa', 'Criada com sucesso!');
          queryClient.invalidateQueries({ queryKey: ['tasks'] });
          setIsVisibleModal(false);
          reset();
        },
        onError: (error: any) => {
          console.error('Erro ao criar tarefa:', error);
        }
      });

    return (
        <>
            <Button onPress={() => setIsVisibleModal(true)} style={{position:'absolute', right:10, bottom:20, width:40, height:40, borderRadius:50}}>
                <Button.Icon icon={IconPlus}/>
            </Button>
            <Modal style={{flex:1}} visible={isVisibleModal} transparent animationType="fade">
                <View style={[s.container, { backgroundColor:theme.background }]}>
                    <Text style={[s.title, { color:theme.text }]}>Criar tarefa</Text>
                    <View style={s.form}>
                        <Controller 
                            name='taskTitle'
                            control={control}
                            render={({field:{value, onChange}}) => <Input style={{color:theme.text}} placeholder='Nome da tarefa' value={value} onChangeText={onChange} />}
                        />
                        {errors.taskTitle && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.taskTitle.message}</Text>}

                        <Controller 
                            name='taskType'
                            control={control}
                            render={({field:{value, onChange}}) => <Input style={{color:theme.text}} placeholder='Tipo de tarefa' value={value} onChangeText={onChange} />}
                        />
                        {errors.taskType && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.taskType.message}</Text>}

                        <Controller 
                            name='taskDate'
                            control={control}
                            render={({field:{value, onChange}}) => 
                                <Input
                                    style={{color:theme.text}}
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
                            render={({field:{value, onChange}}) => <TextInput style={[s.textArea, {color:theme.text}]} multiline placeholder='Descrição da tarefa' value={value} onChangeText={onChange} placeholderTextColor={colors.gray[400]} />}
                        />
                        {errors.taskDescription && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.taskDescription.message}</Text>}
                        
                        <Button isLoading={isPending} onPress={handleSubmit((data) => createTask(data))}>
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