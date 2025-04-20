import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { s } from "./style";
import { TasksType } from "@/app/home";
import { IconCheck } from "@tabler/icons-react-native";

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

interface TasksProps {
    tasks: TasksType[]
}

export function Tasks({ tasks }:TasksProps) {

    async function toggleTaskStatus(taskId: string, currentStatus: boolean) {
        try {
          const taskRef = doc(db, 'tasks', taskId);
          await updateDoc(taskRef, {
            status: !currentStatus,
          });
          console.log('Status atualizado com sucesso!');
        } catch (error) {
          console.error('Erro ao atualizar status:', error);
        }
    }

    return (
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
            <FlatList
                data={tasks}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                renderItem={({ item }) => (
                <View style={s.container}>
                    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                        {item.status === true ? 
                            <TouchableOpacity style={s.taskCompleted}><IconCheck size={30} color={'#fff'} /></TouchableOpacity> 
                            : 
                            <TouchableOpacity style={s.check} onPress={() => toggleTaskStatus(item.id, item.status)} />
                        }
                        <Text style={s.title}>{item.title}</Text>
                    </View>
                    <Text style={s.description}>{item.description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={s.type}>{item.type}</Text>
                        <Text style={s.date}>
                            {item.createdAt}
                        </Text>
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
    )
}