import { Alert, Modal, Text, TextInput, View } from 'react-native'

import { Button } from "@/components/button";
import { IconPlus, IconX } from "@tabler/icons-react-native";
import { useState } from 'react';

import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';

import { s } from './styles';
import { Input } from '@/components/input';
import { colors } from '@/styles/theme';
import { router } from 'expo-router';

export function OpenModal() {
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleCreateTask() {
        const user = auth.currentUser;
      
        if (!user) {
          console.warn('Usuário não está logado.');
          return;
        }
      
        try {
          setLoading(true);

          await addDoc(collection(db, 'tasks'), {
            title: name,
            description,
            type,
            status:false,
            createdAt: date,
            done: false,
            userId: user.uid,
          });
      
          Alert.alert('Tarefa','criada com sucesso!');
          router.back();
          
          setName('');
          setDescription('');
          setType('');
          setDate('');
          
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
                        <Input placeholder='Nome da tarefa' value={name} onChangeText={setName} />
                        <Input placeholder='Tipo de tarefa' value={type} onChangeText={setType} />
                        <Input
                            value={date}
                            onChangeText={setDate}
                            placeholder='Data de criação ou execução' mask={{
                                type: 'datetime',
                                options: { format: 'DD/MM/YYYY' }
                            }} 
                        />
                        <TextInput style={s.textArea} multiline placeholder='Descrição da tarefa' value={description} onChangeText={setDescription}  placeholderTextColor={colors.gray[400]} />
                        <Button isLoading={loading} onPress={handleCreateTask}>
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