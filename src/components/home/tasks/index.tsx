import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

import { s } from "./style";
import { TasksType } from "@/@types/tasks";
import { IconCheck, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react-native";

import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useThemeMode } from "@/hooks/useThemeMode";
import { colors } from "@/styles/theme";
import { Button } from "@/components/button";
import { Modal } from "../modal";
import { useState } from "react";

interface TasksProps {
    tasks: TasksType[] | any
}

export function Tasks({ tasks }:TasksProps) {
    const queryClient = useQueryClient();
    const { theme } = useThemeMode();

    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const { mutate: toggleTaskStatus } = useMutation({
        mutationFn: async ({ taskId, currentStatus }: { taskId: string; currentStatus: boolean }) => {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, {
                status: !currentStatus,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (error) => {
            console.error('Erro ao atualizar status:', error);
        }
    });

    const { mutate: deleteTask } = useMutation({
        mutationFn: async ({taskId} : {taskId:string;}) => {
            try {
                await deleteDoc(doc(db, 'tasks', taskId));
                Alert.alert('Tarefa', 'deletada com sucesso');
              } catch (error) {
                console.error('Erro ao deletar tarefa:', error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (error) => {
            console.error('Erro ao atualizar status:', error);
        }
    });

    return (
        <>
            <View style={{ flex:1, paddingHorizontal: 20, paddingBottom: 50 }}>
                <FlatList
                    data={tasks}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                    renderItem={({ item }) => (
                    <View style={[s.container, { backgroundColor:theme.card }]}>
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            {item.status === true ? 
                                <TouchableOpacity style={s.taskCompleted}><IconCheck size={30} color={'#fff'} /></TouchableOpacity> 
                                : 
                                <TouchableOpacity style={s.check} onPress={() => toggleTaskStatus({ taskId: item.id, currentStatus: item.status })} />
                            }
                            <Text style={[s.title, { color:theme.text }]}>{item.title}</Text>
                        </View>
                        <Text style={[s.description, { color:theme.text }]}>{item.description}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={s.type}>{item.type}</Text>
                            <Text style={[s.date, { color:theme.text }]}>
                                {item.createdAt}
                            </Text>
                        </View>
                        <View style={s.actionsContainer}>
                            <TouchableOpacity 
                                onPress={() => {
                                    setSelectedTask(item);
                                    setIsVisibleModal(true);
                                }}
                                style={s.iconAction}>
                                <IconPencil size={20} color={'#fff'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteTask({ taskId: item.id })} style={[s.iconAction, {backgroundColor:colors.red[600]}]}>
                                <IconTrash size={20} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    )}
                    ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 40, color: '#aaa' }}>
                        Nenhuma tarefa encontrada.
                    </Text>
                    }
                />
            </View>

            <Button onPress={() => setIsVisibleModal(true)} style={{position:'absolute', right:10, bottom:20, width:40, height:40, borderRadius:50}}>
                <Button.Icon icon={IconPlus}/>
            </Button>
            <Modal isVisibleModal={isVisibleModal} setIsVisibleModal={setIsVisibleModal} selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
        </>
    )
}