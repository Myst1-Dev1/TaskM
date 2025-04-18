import { Text, TouchableOpacity, View } from "react-native";

import { s } from "./style";

export function Tasks() {
    return (
        <View style={{paddingHorizontal:20}}>
            <View style={s.container}>
                <View style={{flexDirection:'row', gap:12, alignItems:'center'}}>
                    <TouchableOpacity style={s.check} />
                    <Text style={s.title}>Primeiro projeto em Angular</Text>
                </View>
                <Text style={s.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis ducimus sint quidem quia consequuntur ab corporis ipsam omnis iure error eos, autem debitis quas voluptates at. Voluptates atque assumenda dolorum!</Text>
                <View style={{flexDirection:'row', gap:12, justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={s.type}>Pessoal</Text>
                    <Text style={s.date}>18 de Abril</Text>
                </View>
            </View>
        </View>
    )
}