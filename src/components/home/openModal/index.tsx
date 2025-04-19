import { Modal, Text, View } from 'react-native'

import { Button } from "@/components/button";
import { IconPlus, IconX } from "@tabler/icons-react-native";
import { useState } from 'react';

import { s } from './styles';
import { Input } from '@/components/input';

export function OpenModal() {
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [date, setDate] = useState('');

    return (
        <>
            <Button onPress={() => setIsVisibleModal(true)} style={{position:'absolute', right:4, bottom:20, width:40, height:40, borderRadius:50}}>
                <Button.Icon icon={IconPlus}/>
            </Button>
            <Modal style={{flex:1}} visible={isVisibleModal}>
                <View style={s.container}>
                    <Text style={s.title}>Criar tarefa</Text>
                    <View style={s.form}>
                        <Input placeholder='Nome da tarefa' />
                        <Input placeholder='Descrição da tarefa' />
                        <Input placeholder='Tipo de tarefa' />
                        <Input
                            value={date}
                            onChangeText={setDate}
                            placeholder='Data de criação da tarefa' mask={{
                                type: 'datetime',
                                options: { format: 'DD/MM/YYYY' }
                            }} 
                        />
                        <Button>
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