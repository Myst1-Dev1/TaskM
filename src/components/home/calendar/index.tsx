import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

import { s } from "./styles";

import { useState } from "react";

const days = [
  { label: "Dom", date: 12 },
  { label: "Seg", date: 13, dot: true },
  { label: "Ter", date: 14, dot: true },
  { label: "Qua", date: 15, selected: true },
  { label: "Qui", date: 16 },
  { label: "Sex", date: 17 },
  { label: "Sab", date: 18 },
];

export function Calendar() {
    const [selectedDate, setSelectedDate] = useState(15);

    return (
        <>
            <View style={s.container}>
                <FlatList
                data={days}
                keyExtractor={item => item.date.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isSelected = item.date === selectedDate;
                    return (
                    <TouchableOpacity
                        onPress={() => setSelectedDate(item.date)}
                        style={{ alignItems: "center", marginHorizontal: 10 }}
                    >
                        <Text style={{ color: "#999", fontSize: 13 }}>{item.label}</Text>
                        <Text
                        style={[s.months, isSelected ? s.isSelected : s.dontSelected]}
                        >
                        {item.date}
                        </Text>
                        {item.dot && (
                        <View style={s.dot} />
                        )}
                    </TouchableOpacity>
                    );
                }}
                />
            </View>
        </>
    )
}