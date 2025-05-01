import { Button } from "@/components/button";
import { useThemeMode } from "@/hooks/useThemeMode";
import { Alert, Modal as ModalContent, Text, TextInput, View } from 'react-native'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';

import { s } from './styles';
import { Input } from '@/components/input';
import { colors, fontFamily } from '@/styles/theme';

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { modalSchema } from '@/services/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IconX } from "@tabler/icons-react-native";
import { useEffect } from "react";
import { TasksType } from "@/@types/tasks";

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface ModalProps {
    isVisibleModal:boolean;
    setIsVisibleModal:any;
    selectedTask?:any;
    setSelectedTask?:any;
}

export function Modal({ isVisibleModal, setIsVisibleModal, selectedTask, setSelectedTask }: ModalProps) {
    const { theme } = useThemeMode();

     const { control, reset, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver:zodResolver(modalSchema)
    })

    const queryClient = useQueryClient();

    // async function scheduleTaskNotification(task: {
    //   title: string;
    //   date: string;
    //   time: string;
    // }) {
    //   const [day, month, year] = task.date.split('/').map(Number);
    //   const [hour, minute] = task.time.split(':').map(Number); // ← CORREÇÃO AQUI
    //   const taskDate = new Date(year, month - 1, day, hour, minute);
    
    //   if (taskDate > new Date()) {
    //     await Notifications.scheduleNotificationAsync({
    //       content: {
    //         title: '📌 Tarefa de hoje!',
    //         body: `A tarefa "${task.title}" está marcada para hoje às ${task.time}.`,
    //         sound: true,
    //       },
    //       trigger: {
    //         date: taskDate,
    //         channelId: 'taskm-default', // <- cria esse canal antes se quiser mais controle
    //       },
    //     });        
    
    //     console.log('Agendado para:', taskDate.toLocaleString());
    //   } else {
    //     console.log('⚠️ Data já passou ou é agora — notificação não agendada.');
    //   }
    // }  

    async function scheduleTaskNotification(task: {
      title: string;
      date: string;
      time: string;
    }) {
      const [day, month, year] = task.date.split('/').map(Number);
      const [hour, minute] = task.time.split(':').map(Number);
    
      const taskDate = new Date(year, month - 1, day, hour, minute);
    
      if (taskDate > new Date()) {
        // Cria canal se necessário (recomenda-se fazer isso globalmente, mas aqui também funciona)
        const existingChannels = await Notifications.getNotificationChannelsAsync();
        const hasChannel = existingChannels.some((ch) => ch.id === 'taskm-default');
    
        if (!hasChannel) {
          await Notifications.setNotificationChannelAsync('taskm-default', {
            name: 'Tarefas',
            importance: 4, // HIGH
            sound: 'default',
          });
        }
    
        // Agenda notificação
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '📌 Tarefa de hoje!',
            body: `A tarefa "${task.title}" está marcada para hoje às ${task.time}.`,
            sound: true,
          },
          trigger: taskDate as unknown as Notifications.NotificationTriggerInput, // ← aqui está a chave
        });
    
        console.log('🔔 Notificação agendada para:', taskDate.toLocaleString());
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
    
        const { taskTitle, taskDescription, taskType, taskDate, taskTime } = data;
    
        const docRef = await addDoc(collection(db, 'tasks'), {
          title: taskTitle,
          description: taskDescription,
          type: taskType,
          status: false,
          createdAt: taskDate,
          timeOfDay: taskTime,
          done: false,
          userId: user.uid,
        });
    
        await scheduleTaskNotification({
          title: taskTitle,
          date: taskDate,
          time: taskTime
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

    const { mutate: updateTask, isPending: isUpdating } = useMutation({
            mutationFn: async ({
              taskId,
              updates,
            }: {
              taskId: string;
              updates: Partial<TasksType>;
            }) => {
              try {
                const taskRef = doc(db, 'tasks', taskId);
                await updateDoc(taskRef, updates);
                console.log('✅ Tarefa atualizada com sucesso');
              } catch (error) {
                console.error('Erro ao atualizar tarefa:', error);
              }
            },
            onSuccess: () => {
              Alert.alert('Tarefa', 'Atualizada com sucesso!');
              queryClient.invalidateQueries({ queryKey: ['tasks'] });
              setIsVisibleModal(false);
              reset();
              setSelectedTask(null);
            },
            onError: (error) => {
              console.error('Erro ao atualizar tarefa:', error);
            },
    });

    useEffect(() => {
        if (selectedTask) {
          setValue('taskTitle', selectedTask.title);
          setValue('taskDescription', selectedTask.description);
          setValue('taskType', selectedTask.type);
          setValue('taskDate', selectedTask.createdAt);
          setValue('taskTime', selectedTask.timeOfDay);
        }
      }, [selectedTask]);
      
    async function onSubmit(data:any) {
        if (selectedTask?.status === true) {
            Alert.alert('Tarefa concluída', 'Tarefas concluídas não podem ser editadas.');
            setIsVisibleModal(false);
            return;
        }

        if (selectedTask) {
            updateTask({
              taskId: selectedTask.id,
              updates: {
                title: data.taskTitle,
                description: data.taskDescription,
                type: data.taskType,
                createdAt: data.taskDate,
                timeOfDay: data.taskTime,
              },
            });

            await scheduleTaskNotification({
              title: data.taskTitle,
              date: data.taskDate,
              time: data.taskTime
            });
          } else {
            createTask(data);
          }
    }

    return (
        <>
            <ModalContent style={{flex:1}} visible={isVisibleModal} transparent animationType="fade">
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
                            name='taskTime'
                            control={control}
                            render={({field:{value, onChange}}) => 
                                <Input
                                    style={{color:theme.text}}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder='Horário da tarefa (ex: 09:00)' mask={{
                                        type: 'datetime',
                                        options: { format: 'HH:mm' }
                                    }} 
                                />
                            }
                        />
                        {errors.taskTime && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.taskTime.message}</Text>}

                        <Controller 
                            name='taskDescription'
                            control={control}
                            render={({field:{value, onChange}}) => <TextInput style={[s.textArea, {color:theme.text}]} multiline placeholder='Descrição da tarefa' value={value} onChangeText={onChange} placeholderTextColor={colors.gray[400]} />}
                        />
                        {errors.taskDescription && <Text style={{color:colors.red[600], textAlign:'center', fontFamily:fontFamily.bold}}>{errors.taskDescription.message}</Text>}
                        
                        <Button isLoading={isPending || isUpdating} onPress={handleSubmit(onSubmit)}>
                            <Button.Title>{selectedTask ? 'Atualizar' : 'Criar'}</Button.Title>
                        </Button>
                    </View>
                </View>
                <Button onPress={() => (setIsVisibleModal(false))} style={{position:'absolute', right:20, top:12, width:40, height:40, borderRadius:50}}>
                    <Button.Icon icon={IconX}/>
                </Button>
            </ModalContent>
        </>
    )
}